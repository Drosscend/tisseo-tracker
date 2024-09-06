import type { Departures, Line, PhysicalStop, StopSchedules } from "@/types/tisseo.type";
import { unstable_noStore } from "next/cache";
import { fetchLines } from "@/lib/tisseo/fetch-lines";
import { fetchStopPoints } from "@/lib/tisseo/fetch-stop_points";

const API_KEY = process.env.TISSEO_API_KEY;
const BASE_URL = "https://api.tisseo.fr/v2";

export interface LineDetails {
  line: Line;
  stopPointsWithSchedules: StopPointWithSchedules[];
}

export interface StopPointWithSchedules {
  stopPoint: PhysicalStop;
  schedules: Departures;
}

export const fetchLineDetails = async (lineId: string): Promise<LineDetails> => {
  unstable_noStore();
  if (!API_KEY) {
    throw new Error("API key is missing");
  }

  try {
    // Fetch line details
    const lineData = await fetchLines(lineId, true, false, true);
    const line = lineData[0];

    // Fetch stop points for the line
    const stopPoints = await fetchStopPoints(lineId, true, true);

    // Fetch schedules for each stop point
    const stopPointsWithSchedules: StopPointWithSchedules[] = [];

    for (const stopPoint of stopPoints) {
      const stopSchedulesParams = new URLSearchParams({
        key: API_KEY,
        stopPointId: stopPoint.id,
        displayRealTime: "1",
        timetableByArea: "1",
        number: "3",
      });

      const stopSchedulesUrl = `${BASE_URL}/stops_schedules.json?${stopSchedulesParams.toString()}`;
      const stopSchedulesResponse = await fetch(stopSchedulesUrl);

      if (!stopSchedulesResponse.ok) {
        throw new Error(`Error fetching schedules for stop point ${stopPoint.id}: ${stopSchedulesResponse.statusText}`);
      }

      const stopSchedulesData: StopSchedules = await stopSchedulesResponse.json();
      const schedules = stopSchedulesData.departures;

      stopPointsWithSchedules.push({
        stopPoint,
        schedules,
      });
    }

    return {
      line,
      stopPointsWithSchedules,
    };
  } catch (error) {
    console.error("Failed to fetch line details", error);
    throw error;
  }
};
