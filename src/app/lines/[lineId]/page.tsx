import { TisseoIcon } from "@/components/tisseo/icon";
import { LineMessages } from "@/components/tisseo/line-messages";
import { LineStops } from "@/components/tisseo/line-stops";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchLineDetails } from "@/lib/tisseo/fetch-line-details";
import { fetchLines } from "@/lib/tisseo/fetch-lines";

export async function generateStaticParams() {
  const lines = await fetchLines();

  return lines.map((line) => ({
    lineId: encodeURIComponent(line.id),
  }));
}

export default async function LineDetail({ params }: { params: { lineId: string } }) {
  const lineId = decodeURIComponent(params.lineId);
  const data = await fetchLineDetails(lineId);

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-2">
      <h1 className="flex text-3xl font-semibold">
        <TisseoIcon mode={data.line.transportMode.name} color={data.line.bgXmlColor} className="size-8" />
        <span className="ml-2">
          Ligne {data.line.shortName} - {data.line.name}
        </span>
      </h1>

      <Tabs defaultValue="messages" className="w-full">
        <TabsList>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="stops">Arrêts et Horaires</TabsTrigger>
          <TabsTrigger value="test">test</TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          <LineMessages line={data.line} stopPointsWithSchedules={data.stopPointsWithSchedules} />
        </TabsContent>

        <TabsContent value="stops">
          <LineStops line={data.line} stopPointsWithSchedules={data.stopPointsWithSchedules} />
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
