"use server";

import { getLineDetails } from "@/lib/tisseo/get-line-details";

export async function getLineData(lineId: string) {
  try {
    return await getLineDetails(lineId);
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de la ligne:", error);
    return null;
  }
}
