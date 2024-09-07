import type { Messages, MessagesResponse } from "@/types/tisseo.type";
import { unstable_noStore } from "next/cache";

const API_KEY = process.env.TISSEO_API_KEY;
const BASE_URL = "https://api.tisseo.fr/v2";

export const fetchMessages = async (displayImportantOnly: boolean = false): Promise<Messages[]> => {
  unstable_noStore();
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
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching messages: ${response.statusText}`);
    }

    const data: MessagesResponse = await response.json();
    return data.messages;
  } catch (error) {
    console.error("Failed to fetch messages", error);
    throw error;
  }
};
