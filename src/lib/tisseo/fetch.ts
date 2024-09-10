import type { ApiResponse } from "@/types/tisseo.type";
import { revalidateTag, unstable_cache } from "next/cache";

// Simple hash function (unchanged)
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

interface CacheOptions {
  revalidate?: number | false;
  tags?: string[];
  dynamicRevalidation?: boolean;
}

type FetchOptions = Pick<RequestInit, "method" | "headers" | "body">;

const MS_TO_SEC = 1000;
const DEFAULT_REVALIDATE = 60;
const MIN_REVALIDATE = 1;

function getTimeUntilExpiration(expirationDate: string): number {
  const expDate = new Date(expirationDate);
  const now = new Date();
  return Math.max(0, expDate.getTime() - now.getTime());
}

function getRevalidateTime(time: number | false | undefined): number | false {
  if (time === false) return false;
  return Math.max(MIN_REVALIDATE, time ?? DEFAULT_REVALIDATE);
}

async function fetchData<T>(url: string, init: FetchOptions): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  return (await response.json()) as Promise<T>;
}

export async function cachedFetch<T extends ApiResponse>(url: string, init: FetchOptions = {}, cacheOptions: CacheOptions = {}): Promise<T> {
  const revalidateTime = getRevalidateTime(cacheOptions.revalidate);
  const urlHash = simpleHash(url);
  const cacheTag = `cache-${urlHash}`;

  const fetchAndProcessData = async () => {
    const data = await fetchData<T>(url, init);
    // console.log(url);

    if (data.expirationDate && cacheOptions.dynamicRevalidation !== false) {
      const timeUntilExpiration = getTimeUntilExpiration(data.expirationDate);
      const newRevalidateSeconds = Math.max(MIN_REVALIDATE, Math.ceil(timeUntilExpiration / MS_TO_SEC));

      if (newRevalidateSeconds <= 1) {
        // console.log("Data expired, revalidation needed");
        return { data, needsRevalidation: true };
      } else if (newRevalidateSeconds !== revalidateTime) {
        // console.log(`Cache revalidation time updated to ${newRevalidateSeconds} seconds`);
        return { data, newRevalidateTime: newRevalidateSeconds };
      }
    } else if (!data.expirationDate) {
      console.warn("No expiration date provided in the API response for URL:", url);
    }

    return { data };
  };

  // If revalidateTime is 1 or less, don't cache and fetch immediately
  if (revalidateTime === false || revalidateTime <= 1) {
    const { data } = await fetchAndProcessData();
    revalidateTag(cacheTag);
    return data;
  }

  const cachedFetchData = unstable_cache(fetchAndProcessData, [url, JSON.stringify(init)], {
    revalidate: revalidateTime,
    tags: [...(cacheOptions.tags || []), cacheTag],
  });

  try {
    const result = await cachedFetchData();

    if (result.needsRevalidation) {
      revalidateTag(cacheTag);
      return (await fetchAndProcessData()).data;
    }

    if (result.newRevalidateTime) {
      await unstable_cache(async () => result.data, [url, JSON.stringify(init)], {
        revalidate: result.newRevalidateTime,
        tags: [...(cacheOptions.tags || []), cacheTag],
      })();
    }

    return result.data;
  } catch (error) {
    console.error("Error in cachedFetch:", error);
    throw error;
  }
}
