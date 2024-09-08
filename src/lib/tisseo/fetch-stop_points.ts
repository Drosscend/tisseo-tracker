import type { PhysicalStop, StopPointsResponse } from "@/types/tisseo.type";
import { cachedFetch } from "@/lib/tisseo/fetch";

const API_KEY = process.env.TISSEO_API_KEY;
const BASE_URL = "https://api.tisseo.fr/v2";

export async function fetchStopPoints(
  lineId: string,
  displayCoordXY: boolean = false,
  displayDestinations: boolean = false
): Promise<PhysicalStop[]> {
  if (!API_KEY) {
    throw new Error("API key is missing");
  }

  const params = new URLSearchParams({
    key: API_KEY,
    lineId,
    displayCoordXY: displayCoordXY ? "1" : "0",
    displayDestinations: displayDestinations ? "1" : "0",
  });

  const url = `${BASE_URL}/stop_points.json?${params.toString()}`;

  try {
    const data = await cachedFetch<StopPointsResponse>(
      url,
      {},
      {
        tags: ["stop_points"],
        revalidate: 60,
      }
    );
    return data.physicalStops.physicalStop;
  } catch (error) {
    console.error("Failed to fetch stop points", error);
    throw error;
  }
}
