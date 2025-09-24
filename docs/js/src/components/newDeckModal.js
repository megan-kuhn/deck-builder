// js/src/components/newDeckModal.js

import { setupModal } from "../ui/modal.js";
import { safeOverlayAttach } from '../../utils/safeOverlay.js';

let openModalFn, closeModalFn;

export function initNewDeckModal() {
  const modalControls = setupModal({
    modalId: "new-deck-modal",
    closeButtonId: "new-deck-modal-close-button",
    // ❌ no openButtonId passed, we'll open programmatically
  });

  if (!modalControls) return;
  openModalFn = modalControls.openModal;
  closeModalFn = modalControls.closeModal;

  const form = document.getElementById("new-deck-form");
  const input = document.getElementById("deck-name-input"); // <-- move this above
  const error = document.getElementById("deck-name-error");

  // Attach overlay only after modal is fully shown
  const modal = document.getElementById("new-deck-modal");
  modal.addEventListener("shown.bs.modal", () => {
    safeOverlayAttach(input); // now input exists
  });

  // Submit handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = input.value.trim();
    if (!name) {
      error.textContent = "Please enter a deck name.";
      error.style.display = "block";
      input.focus();
      return;
    }

    // Fire a custom event so other code can handle the result
    document.dispatchEvent(
      new CustomEvent("deckNameSubmitted", { detail: { name } })
    );

    // reset & close
    input.value = "";
    error.style.display = "none";
    closeModalFn();
  });
}

export function openNewDeckModal() {
  if (openModalFn) openModalFn();
}
