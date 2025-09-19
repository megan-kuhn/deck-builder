// js/src/components/cardDetailsModal.js

import { setupModal } from "../ui/modal.js";
import { attachAddToListHandler } from '../ui/addToListHandler.js';

let openModalFn;

export function initCardDetailsModal() {
  const modalBody = document.getElementById("card-details-body");

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
      <button class="button--add-to-list">Add to List</button>
    `;

    const modalAddButton = modalBody.querySelector('.button--add-to-list');
    attachAddToListHandler(modalAddButton, cardData);

    // Open modal
    openModalFn();
    modalBody.focus(); // Focus modal content for accessibility
  });
}
