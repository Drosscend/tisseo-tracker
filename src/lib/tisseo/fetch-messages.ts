import type { Messages, MessagesResponse } from "@/types/tisseo.type";
import { cachedFetch } from "@/lib/tisseo/fetch";

const API_KEY = process.env.TISSEO_API_KEY;
const BASE_URL = "https://api.tisseo.fr/v2";

export async function fetchMessages(displayImportantOnly: boolean = false): Promise<Messages[]> {
  if (!API_KEY) {
    throw new Error("API key is missing");
  }

  const params = new URLSearchParams({
    key: API_KEY,
    displayImportantOnly: displayImportantOnly ? "true" : "false",
    contentFormat: "html",
  });

  const url = `${BASE_URL}/messages.json?${params.toString()}`;

  try {
    const data = await cachedFetch<MessagesResponse>(
      url,
      {},
      {
        tags: ["messages"],
        revalidate: 60,
      }
    );
    return data.messages;
  } catch (error) {
    console.error("Failed to fetch messages", error);
    throw error;
  }
}
