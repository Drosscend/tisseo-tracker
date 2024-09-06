"use client";

import useSWR from "swr";
import { useCallback, useEffect, useState } from "react";
import { TisseoIcon } from "@/components/tisseo/icon";
import { getLineData } from "@/components/tisseo/line-details/get-line-data.action";
import { LineDetailFallback } from "@/components/tisseo/line-details/line-detail-fallback";
import { LineError } from "@/components/tisseo/line-details/line-error";
import { LineInfos } from "@/components/tisseo/line-details/line-infos";
import { LineMessages } from "@/components/tisseo/line-details/line-messages";
import { LineStops } from "@/components/tisseo/line-details/line-stops";
import { ToulouseMap } from "@/components/tisseo/toulouse-map/toulouse-map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { LineDetails } from "@/lib/tisseo/get-line-details";

const REFRESH_INTERVAL = 60000;

interface LineDetailProps {
  initialData: LineDetails;
  lineId: string;
}

const fetcher = (lineId: string) => getLineData(lineId);

export default function LineDetail({ initialData, lineId }: LineDetailProps) {
  const { data, error, isLoading, mutate } = useSWR(lineId, fetcher, {
    refreshInterval: REFRESH_INTERVAL,
    fallbackData: initialData,
  });

  const [timeUntilRefresh, setTimeUntilRefresh] = useState(REFRESH_INTERVAL / 1000);

  const resetTimer = useCallback(() => {
    setTimeUntilRefresh(REFRESH_INTERVAL / 1000);
  }, []);

  const handleManualRefresh = useCallback(() => {
    mutate();
    resetTimer();
  }, [mutate, resetTimer]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeUntilRefresh((prev) => {
        if (prev <= 1) {
          resetTimer();
          return REFRESH_INTERVAL / 1000;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [resetTimer]);

  if (error) return <LineError />;
  if (!data || isLoading) return <LineDetailFallback />;

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-2">
      <div className="flex items-center justify-between">
        <h1 className="flex text-3xl font-semibold">
          <TisseoIcon mode={data.line.transportMode.name} color={data.line.bgXmlColor} className="size-8" />
          <span className="ml-2">
            Ligne {data.line.shortName} - {data.line.name}
          </span>
        </h1>
        <button onClick={handleManualRefresh} className="cursor-pointer text-sm text-gray-500 transition-colors hover:text-gray-700">
          Prochain rafraîchissement dans : {timeUntilRefresh} secondes
        </button>
      </div>
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
