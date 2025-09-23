// js/src/components/newDeckModal.js

import { setupModal } from "../ui/modal.js";

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
  const input = document.getElementById("deck-name-input");
  const error = document.getElementById("deck-name-error");

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

    console.log("New deck name submitted:", name);

    // reset & close
    input.value = "";
    error.style.display = "none";
    closeModalFn();
  });
}

export function openNewDeckModal() {
  if (openModalFn) openModalFn();
}
