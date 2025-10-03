// js/features/deck/ui/newDeckModal.js

import { setupModal } from "../../shared/ui/modal.js";
import { safeOverlayAttach } from '../../shared/utils/safeOverlay.js';
import { handleNewDeckName } from '../handlers/newDeckHandler.js';

let openModalFn, closeModalFn;

export function initNewDeckModal() {
  const modal = document.getElementById("new-deck-modal");
  const newDeckBtn = document.getElementById("new-deck-button");

  // Only run if the modal and button exist
  if (!modal || !newDeckBtn) return;

  const modalControls = setupModal({
    modalId: "new-deck-modal",
    closeButtonId: "new-deck-modal-close-button",
  });

  if (!modalControls) return;
  openModalFn = modalControls.openModal;
  closeModalFn = modalControls.closeModal;

  const form = document.getElementById("new-deck-form");
  const input = document.getElementById("deck-name-input");
  const error = document.getElementById("deck-name-error");

  modal.addEventListener("shown.bs.modal", () => {
    safeOverlayAttach(input);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = input.value.trim();
    if (!name) {
      error.textContent = "Please enter a deck name.";
      error.style.display = "block";
      input.focus();
      return;
    }

    // Dispatch event and handle it immediately here
    handleNewDeckName(name);

    input.value = "";
    error.style.display = "none";
    closeModalFn();
  });

  // Automatically attach click to open the modal
  newDeckBtn.addEventListener("click", () => {
    if (openModalFn) openModalFn();
  });
}
