import type { StopArea, StopSchedulesResponse } from "@/types/tisseo.type";
import { cachedFetch } from "@/lib/tisseo/fetch";

const API_KEY = process.env.TISSEO_API_KEY;
const BASE_URL = "https://api.tisseo.fr/v2";

export async function fetchStopSchedules(
  stopsList: string,
  displayRealTime: boolean = false,
  timetableByArea: boolean = false,
  number: number = 3
): Promise<StopArea[]> {
  if (!API_KEY) {
    throw new Error("API key is missing");
  }

  const params = new URLSearchParams({
    key: API_KEY,
    stopsList: stopsList,
    displayRealTime: displayRealTime ? "1" : "0",
    timetableByArea: timetableByArea ? "1" : "0",
    number: number.toString(),
  });

  const url = `${BASE_URL}/stops_schedules.json?${params.toString()}`;

  try {
    const data = await cachedFetch<StopSchedulesResponse>(
      url,
      {},
      {
        tags: ["stops_schedules"],
        revalidate: 60,
      }
    );

    return data.departures.stopAreas;
  } catch (error) {
    console.error("Failed to stop schedules", error);
    throw error;
  }
}
