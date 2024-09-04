import { Line, LineDetails, LinesResponse, StopAreaWithSchedules, StopSchedulesResponse } from "@/types/tisseo.type";

const API_KEY = process.env.TISSEO_API_KEY;
const BASE_URL = "https://api.tisseo.fr/v2";

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

    const lineData: LinesResponse = await lineResponse.json();
    const line = lineData.lines.line[0]; // Assuming the response contains an array with one line

    // Fetch stop schedules for each stop area in the line
    const stopSchedulesParams = new URLSearchParams({
      key: API_KEY,
      lineId,
      timetableByArea: "1",
      displayRealTime: "1",
    });

    const stopSchedulesUrl = `${BASE_URL}/stops_schedules.json?${stopSchedulesParams.toString()}`;
    const stopSchedulesResponse = await fetch(stopSchedulesUrl);

    if (!stopSchedulesResponse.ok) {
      throw new Error(`Error fetching stop schedules: ${stopSchedulesResponse.statusText}`);
    }

    const stopSchedulesData: StopSchedulesResponse = await stopSchedulesResponse.json();
    const schedules = stopSchedulesData.stopAreas;

    return {
      line,
      schedules,
    };
  } catch (error) {
    console.error("Failed to fetch line details", error);
    throw error;
  }
};
