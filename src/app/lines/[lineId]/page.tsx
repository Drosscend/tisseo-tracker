import { TisseoIcon } from "@/components/tisseo/icon";
import { LineError } from "@/components/tisseo/line-error";
import { LineInfos } from "@/components/tisseo/line-infos";
import { LineMessages } from "@/components/tisseo/line-messages";
import { LineStops } from "@/components/tisseo/line-stops";
import { ToulouseMap } from "@/components/tisseo/toulouse-map/toulouse-map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchLines } from "@/lib/tisseo/fetch-lines";
import { getLineDetails } from "@/lib/tisseo/get-line-details";

export async function generateStaticParams() {
  const lines = await fetchLines();

  return lines.map((line) => ({
    lineId: encodeURIComponent(line.id),
  }));
}

async function getLineData(lineId: string) {
  try {
    return await getLineDetails(lineId);
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de la ligne:", error);
    return null;
  }
}

export default async function LineDetail({ params }: { params: { lineId: string } }) {
  const lineId = decodeURIComponent(params.lineId);
  const data = await getLineData(lineId);

  if (!data) {
    return <LineError />;
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-2">
      <h1 className="flex text-3xl font-semibold">
        <TisseoIcon mode={data.line.transportMode.name} color={data.line.bgXmlColor} className="size-8" />
        <span className="ml-2">
          Ligne {data.line.shortName} - {data.line.name}
        </span>
      </h1>

      <Tabs defaultValue="infos" className="w-full">
        <TabsList>
          <TabsTrigger value="infos">Infos</TabsTrigger>
          <TabsTrigger value="stops">Arrêts et Horaires</TabsTrigger>
          <TabsTrigger value="map">Carte</TabsTrigger>
          <TabsTrigger value="test">test</TabsTrigger>
        </TabsList>

        <TabsContent value="infos" className="flex flex-col gap-2">
          <LineInfos line={data.line} />
          <LineMessages line={data.line} />
        </TabsContent>

        <TabsContent value="stops">
          <LineStops stopPointsWithSchedules={data.stopPointsWithSchedules} />
        </TabsContent>

        <TabsContent value="map">
          <ToulouseMap line={data.line} stopPointsWithSchedules={data.stopPointsWithSchedules} />
        </TabsContent>

        <TabsContent value="test">
          <Card>
            <CardHeader>
              <CardTitle>Test</CardTitle>
            </CardHeader>
            <CardContent>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
