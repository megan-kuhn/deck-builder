// js/features/deck/data/deck.js

import { getActiveDeck } from './deckList.js';

// --- Single Deck Operations ---

export function addCardToDeckData(deck, card) {
  if (!deck) return;

  // Ensure cards array exists
  if (!deck.cards) deck.cards = [];

  const existing = deck.cards.find(c => c.id === card.id);
  if (existing) existing.quantity++;
  else deck.cards.push({ ...card, quantity: 1 });
}

export function removeCardFromDeckData(deck, cardId) {
  if (!deck) return;
  deck.cards = deck.cards.filter(c => c.id !== cardId);
}

// --- Convenience functions for active deck ---

export function addCard(card) {
  addCardToDeckData(getActiveDeck(), card);
}

export function removeCard(cardId) {
  removeCardFromDeckData(getActiveDeck(), cardId);
}
