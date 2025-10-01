// js/features/deck/events/deckEvents.js

import { addCard, removeCard, getActiveDeck } from '../data/deck.js';
import { renderDeck } from '../ui/deckContainer.js';

export function addCardToDeck(card) {
  addCard(card);
  const activeDeck = getActiveDeck();
  if (!activeDeck) return;

  const container = document.querySelector(`.deck-element.active .deck-container`);
  renderDeck(container, activeDeck.cards);
}

export function removeCardFromDeck(cardId) {
  removeCard(cardId);
  const activeDeck = getActiveDeck();
  if (!activeDeck) return;

  const container = document.querySelector(`.deck-element.active .deck-container`);
  renderDeck(container, activeDeck.cards);
}
