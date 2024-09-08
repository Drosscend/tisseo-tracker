import type { Departures, Line, PhysicalStop } from "@/types/tisseo.type";
import { fetchLines } from "@/lib/tisseo/fetch-lines";
import { fetchStopPoints } from "@/lib/tisseo/fetch-stop_points";
import { fetchStopSchedules } from "@/lib/tisseo/fetch-stop_schedules";

export interface LineDetails {
  line: Line;
  stopPointsWithSchedules: StopPointWithSchedules[];
}

export interface StopPointWithSchedules {
  stopPoint: PhysicalStop;
  schedules: Departures;
}

export const getLineDetails = async (lineId: string): Promise<LineDetails> => {
  try {
    // Fetch line details
    const lineData = await fetchLines(lineId, true, false, true);
    const line = lineData[0];

    // Fetch stop points for the line
    const stopPoints = await fetchStopPoints(lineId, true, true);

    // Prepare the stopsList parameter
    const stopsList = stopPoints.map((stop) => `${stop.id}|${lineId}`).join(",");
    // Fetch stop schedules for the line
    const stopSchedulesData = await fetchStopSchedules(stopsList, true, true);

    // Process the received data
    const stopPointsWithSchedules: StopPointWithSchedules[] = stopPoints.map((stopPoint) => {
      const schedules = stopSchedulesData.find((sa) => sa.id === stopPoint.stopArea.id) || { schedules: [] };

      return {
        stopPoint,
        schedules: { stopAreas: [schedules] } as Departures,
      };
    });

    return {
      line,
      stopPointsWithSchedules,
    };
  } catch (error) {
    console.error("Failed to fetch line details", error);
    throw error;
  }
};
