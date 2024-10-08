import type { Line, LinesResponse } from "@/types/tisseo.type";
import { cachedFetch } from "@/lib/tisseo/fetch";

const API_KEY = process.env.TISSEO_API_KEY;
const BASE_URL = "https://api.tisseo.fr/v2";

export async function fetchLines(
  lineId?: string,
  displayMessages: boolean = false,
  displayTerminus: boolean = false,
  displayGeometry: boolean = false
): Promise<Line[]> {
  if (!API_KEY) {
    throw new Error("API key is missing");
  }

  const params = new URLSearchParams({
    key: API_KEY,
    lineId: lineId || "",
    displayMessages: displayMessages ? "1" : "0",
    displayTerminus: displayTerminus ? "1" : "0",
    displayGeometry: displayGeometry ? "1" : "0",
    contentFormat: "html",
  });

  const url = `${BASE_URL}/lines.json?${params.toString()}`;

  try {
    const data = await cachedFetch<LinesResponse>(
      url,
      {},
      {
        tags: ["lines"],
        revalidate: 60,
      }
    );
    return data.lines.line;
  } catch (error) {
    console.error("Failed to fetch lines", error);
    throw error;
  }
}
