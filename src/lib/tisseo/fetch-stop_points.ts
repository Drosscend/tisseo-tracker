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

  const params = new URLSearchParams({
    key: API_KEY,
    lineId,
    displayCoordXY: displayCoordXY ? "1" : "0",
    displayDestinations: displayDestinations ? "1" : "0",
  });

  const url = `${BASE_URL}/stop_points.json?${params.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching stop points: ${response.statusText}`);
    }

    const data: StopPoints = await response.json();
    return data.physicalStops.physicalStop;
  } catch (error) {
    console.error("Failed to fetch stop points", error);
    throw error;
  }
};
