// js/src/components/newDeckModal.js
import { setupModal } from "../ui/modal.js";
import { safeOverlayAttach } from '../../utils/safeOverlay.js';

let openModalFn, closeModalFn;

export function initNewDeckModal() {
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

  const modal = document.getElementById("new-deck-modal");
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

    document.dispatchEvent(new CustomEvent("deckNameSubmitted", { detail: { name } }));

    input.value = "";
    error.style.display = "none";
    closeModalFn();
  });
}

export function openNewDeckModal() {
  if (openModalFn) openModalFn();
}
