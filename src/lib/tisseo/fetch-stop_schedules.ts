import type { StopArea, StopSchedulesResponse } from "@/types/tisseo.type";
import { unstable_noStore } from "next/cache";

const API_KEY = process.env.TISSEO_API_KEY;
const BASE_URL = "https://api.tisseo.fr/v2";

export const fetchStopSchedules = async (
  stopsList: string,
  displayRealTime: boolean = false,
  timetableByArea: boolean = false,
  number: number = 3
): Promise<StopArea[]> => {
  unstable_noStore();
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
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching schedules: ${response.statusText}`);
    }

    const data: StopSchedulesResponse = await response.json();
    return data.departures.stopAreas;
  } catch (error) {
    console.error("Failed to stop schedules", error);
    throw error;
  }
};
