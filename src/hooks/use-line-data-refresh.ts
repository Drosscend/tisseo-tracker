import useSWR from "swr";
import { useCallback, useEffect, useState } from "react";
import { getLineData } from "@/components/tisseo/line-details/get-line-data.action";
import type { LineDetails } from "@/lib/tisseo/get-line-details";

const REFRESH_INTERVAL = 60000;

const fetcher = (lineId: string) => getLineData(lineId);

export function useLineDataRefresh(lineId: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(lineId, fetcher, {
    revalidateOnFocus: true,
  });

  const [timeUntilRefresh, setTimeUntilRefresh] = useState(REFRESH_INTERVAL / 1000);
  const [isVisible, setIsVisible] = useState(true);

  const resetTimer = useCallback(() => {
    setTimeUntilRefresh(REFRESH_INTERVAL / 1000);
  }, []);

  const handleManualRefresh = useCallback(() => {
    mutate();
    resetTimer();
  }, [mutate, resetTimer]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isVisible) {
        setTimeUntilRefresh((prev) => {
          if (prev <= 1) {
            mutate();
            return REFRESH_INTERVAL / 1000;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isVisible, mutate]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
      if (!document.hidden) {
        resetTimer();
        mutate();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [mutate, resetTimer]);

  const isRefreshing = isValidating || isLoading;

  return { data, error, isRefreshing, timeUntilRefresh, handleManualRefresh };
}
