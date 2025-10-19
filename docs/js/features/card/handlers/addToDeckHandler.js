import { initAddToDeckModal } from '../../deck/ui/addToDeckModal.js';

// Initialize the modal once
const { openModal } = initAddToDeckModal();

export function attachAddToDeckHandler(button, cardData) {
  button.addEventListener('click', () => {
    if (!cardData) return; // safety check

    // Open the Add-to-Deck modal for this card
    openModal(cardData);
  });
}
