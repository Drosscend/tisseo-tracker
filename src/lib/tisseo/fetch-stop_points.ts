import type { PhysicalStop, StopPoints } from "@/types/tisseo.type";

const API_KEY = process.env.TISSEO_API_KEY;
const BASE_URL = "https://api.tisseo.fr/v2";

export const fetchStopPoints = async (
  lineId: string,
  displayCoordXY: boolean = false,
  displayDestinations: boolean = false
): Promise<PhysicalStop[]> => {
  if (!API_KEY) {
    throw new Error("API key is missing");
  }

  try {
    // Fetch stop points for the line
    const stopPointsParams = new URLSearchParams({
      key: API_KEY,
      lineId,
      displayCoordXY: displayCoordXY ? "1" : "0",
      displayDestinations: displayDestinations ? "1" : "0",
    });

    const stopPointsUrl = `${BASE_URL}/stop_points.json?${stopPointsParams.toString()}`;
    const stopPointsResponse = await fetch(stopPointsUrl);

    if (!stopPointsResponse.ok) {
      throw new Error(`Error fetching stop points: ${stopPointsResponse.statusText}`);
    }

    const stopPointsData: StopPoints = await stopPointsResponse.json();
    return stopPointsData.physicalStops.physicalStop;
  } catch (error) {
    console.error("Failed to fetch stop points", error);
    throw error;
  }
};
