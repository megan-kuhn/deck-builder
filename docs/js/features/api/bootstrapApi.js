// js/features/api/bootstrap.js
import { fetchCards } from "./fetchCards.js";
import { updateStateFromApiResponse } from "./updateState.js";

// Handles the initial API bootstrap (fetch + state update)
export async function initApi(initialQuery = "game:paper") {
  try {
    const data = await fetchCards(initialQuery);
    const success = updateStateFromApiResponse(data);

    if (!success) {
      console.warn("No data available from API.");
      return null;
    }

    return data; // return it so UI/bootstrap can decide what to do next
  } catch (err) {
    console.error("API init failed:", err);
    return null;
  }
}
