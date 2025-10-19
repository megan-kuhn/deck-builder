// js/features/card/handlers/addToDeckHandler.js

import { addCard } from '../../deck/data/deck.js';
import { getActiveDeck } from '../../deck/data/deckList.js';
import { renderDeck } from '../../deck/ui/deckContainer.js';

export function attachAddToDeckHandler(button, cardData) {
  button.addEventListener('click', () => {
    if (!cardData) return; // safety check

    addCard(cardData);
    console.log(`Added card ${cardData.name} to active deck.`);

    // Re-render the active deck UI
    const activeDeck = getActiveDeck();
    if (!activeDeck) return;

    const container = document.querySelector(`.deck-element.active .deck-container`);
    if (!container) return;

    renderDeck(container, activeDeck.cards);
  });
}
