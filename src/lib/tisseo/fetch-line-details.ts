import type { Departures, Line, Lines, PhysicalStop, StopPoints, StopSchedules } from "@/types/tisseo.type";

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
  if (!API_KEY) {
    throw new Error("API key is missing");
  }

  try {
    // Fetch line details including messages and geometry
    const lineParams = new URLSearchParams({
      key: API_KEY,
      lineId,
      displayMessages: "1",
      displayGeometry: "1",
      displayTerminus: "1",
    });

    const lineUrl = `${BASE_URL}/lines.json?${lineParams.toString()}`;
    const lineResponse = await fetch(lineUrl);

    if (!lineResponse.ok) {
      throw new Error(`Error fetching line details: ${lineResponse.statusText}`);
    }

    const lineData: Lines = await lineResponse.json();
    const line = lineData.lines.line[0];

    // Fetch stop points for the line
    const stopPointsParams = new URLSearchParams({
      key: API_KEY,
      lineId,
      displayCoordXY: "1",
      displayDestinations: "1",
    });

    const stopPointsUrl = `${BASE_URL}/stop_points.json?${stopPointsParams.toString()}`;
    const stopPointsResponse = await fetch(stopPointsUrl);

    if (!stopPointsResponse.ok) {
      throw new Error(`Error fetching stop points: ${stopPointsResponse.statusText}`);
    }

    const stopPointsData: StopPoints = await stopPointsResponse.json();
    const stopPoints = stopPointsData.physicalStops.physicalStop;

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
