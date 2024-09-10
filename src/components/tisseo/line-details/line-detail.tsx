"use client";

import { useLineDataRefresh } from "@/hooks/use-line-data-refresh";
import { TisseoIcon } from "@/components/tisseo/icon";
import { LineDetailFallback } from "@/components/tisseo/line-details/line-detail-fallback";
import { LineError } from "@/components/tisseo/line-details/line-error";
import { LineInfos } from "@/components/tisseo/line-details/line-infos";
import { LineStops } from "@/components/tisseo/line-details/line-stops";
import { Messages } from "@/components/tisseo/messages";
import { TisseoMap } from "@/components/tisseo/toulouse-map/tisseo-map";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { LineDetails } from "@/lib/tisseo/get-line-details";

interface LineDetailProps {
  lineId: string;
}

export default function LineDetail({ lineId }: LineDetailProps) {
  const { data, error, isRefreshing, timeUntilRefresh, handleManualRefresh } = useLineDataRefresh(lineId);

  if (error) return <LineError />;
  if (!data) return <LineDetailFallback />;

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-2">
      <div className="flex items-center justify-between">
        <h1 className="flex text-3xl font-semibold">
          <TisseoIcon mode={data.line.transportMode.name} color={data.line.bgXmlColor} className="size-8" />
          <span className="ml-2">
            Ligne {data.line.shortName} - {data.line.name}
          </span>
        </h1>

        <div className="flex flex-col items-end">
          <button onClick={handleManualRefresh} className="cursor-pointer text-sm text-gray-500 transition-colors hover:text-gray-700">
            Prochain rafraîchissement dans : {timeUntilRefresh} secondes
          </button>
          {isRefreshing && <span className="text-xs text-blue-500">Actualisation en cours...</span>}
        </div>
      </div>
      <Tabs defaultValue="infos" className="w-full">
        <TabsList>
          <TabsTrigger value="infos">Infos</TabsTrigger>
          <TabsTrigger value="stops">Arrêts et Horaires</TabsTrigger>
          <TabsTrigger value="map">Carte</TabsTrigger>
        </TabsList>
        <TabsContent value="infos" className="flex flex-col gap-2">
          <LineInfos line={data.line} />
          {data.line.messages?.length > 0 && <Messages messages={data.line.messages} />}
        </TabsContent>
        <TabsContent value="stops">
          <LineStops stopPointsWithSchedules={data.stopPointsWithSchedules} />
        </TabsContent>
        <TabsContent value="map">
          <TisseoMap line={data.line} stopPointsWithSchedules={data.stopPointsWithSchedules} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
