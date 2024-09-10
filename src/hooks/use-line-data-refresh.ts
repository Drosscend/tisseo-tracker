import useSWR from "swr";
import { useCallback } from "react";
import { getLineData } from "@/components/tisseo/line-details/get-line-data.action";

const REFRESH_INTERVAL = 60000;

const fetcher = (lineId: string) => getLineData(lineId);

export function useLineDataRefresh(lineId: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(lineId, fetcher, {
    revalidateOnFocus: true,
    refreshInterval: REFRESH_INTERVAL,
  });

  const handleManualRefresh = useCallback(() => {
    mutate();
  }, [mutate]);

  const isRefreshing = isValidating || isLoading;

  return { data, error, isRefreshing, handleManualRefresh };
}
