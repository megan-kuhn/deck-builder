// js/features/card/ui/cardDetailsModal.js

import { setupModal } from "../../shared/ui/modal.js";
import { attachAddToDeckHandler } from '../handlers/addToDeckHandler.js';

let openModalFn;

export function initCardDetailsModal() {
  const modal = document.getElementById("card-details-modal");
  const modalBody = document.getElementById("card-details-body");

  // Bail out early if the modal or body isn’t found
  if (!modal || !modalBody) {
    console.warn("Card details modal not found — skipping initCardDetailsModal.");
    return;
  }

  // Setup the modal and store its open function
  const { openModal } = setupModal({ 
    modalId: "card-details-modal",
    closeButtonId: "card-details-close-button"
  });
  openModalFn = openModal;

  // Event delegation for "View Details" buttons
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".button--detail-view");
    if (!btn) return;

    const cardContainer = btn.closest(".single-card-container");
    if (!cardContainer) return;

    const cardData = btn._cardData; // We'll attach cardData in card.js
    if (!cardData) return;

    // Populate modal with card details
    modalBody.innerHTML = `
      <h3 class="visually-hidden">${cardData.name}</h3>
      <img src="${cardData.image_uris?.normal || ''}" alt="${cardData.name}" class="card-details__image" />
      <p>Type: ${cardData.type_line || 'Unknown'}</p>
      <p>Set: ${cardData.set_name || 'Unknown'}</p>
      <p>Mana cost: ${cardData.mana_cost || 'N/A'}</p>
      <p>Oracle text: ${cardData.oracle_text || ''}</p>
      <button class="button--add-to-deck">Add to Deck</button>
    `;

    const modalAddButton = modalBody.querySelector('.button--add-to-deck');
    attachAddToDeckHandler(modalAddButton, cardData);

    // Open modal
    openModalFn();
    modalBody.focus(); // Focus modal content for accessibility
  });
}

