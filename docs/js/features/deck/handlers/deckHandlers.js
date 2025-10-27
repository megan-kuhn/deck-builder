// js/features/deck/handlers/deckHandlers.js

import { getActiveDeck } from '../data/deckList.js';
import { addCard, removeCard } from '../data/deck.js';
import { renderDeck } from '../ui/deckContainer.js';

export function addCardToDeck(card, quantity = 1) {
  addCard(card, quantity);

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

