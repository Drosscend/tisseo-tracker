"use server";

import { getLineDetails } from "@/lib/tisseo/get-line-details";

export async function getLineData(lineId: string) {
  console.log("Récupération des détails de la ligne:", lineId);
  try {
    return await getLineDetails(lineId);
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de la ligne:", error);
    return null;
  }
}
