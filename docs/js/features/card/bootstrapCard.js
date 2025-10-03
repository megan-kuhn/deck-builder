// js/features/card/bootstrapCard.js
import { initCardDetailsModal } from "./ui/cardDetailsModal.js";

export function initCardFeature() {
  // Initialize the card details modal if it exists on this page
  const cardDetailsModalEl = document.getElementById("card-details-modal");
  if (cardDetailsModalEl) {
    initCardDetailsModal();
  }
}
