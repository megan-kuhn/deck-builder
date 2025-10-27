// js/features/deck/data/deck.js

import { getActiveDeck } from './deckList.js';

// --- Single Deck Operations ---

export function addCardToDeckData(deck, card, quantity = 1) {
  if (!deck) return;

  if (!deck.cards) deck.cards = [];

  const existing = deck.cards.find(c => c.id === card.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    deck.cards.push({ ...card, quantity });
  }
}


export function removeCardFromDeckData(deck, cardId) {
  if (!deck) return;
  deck.cards = deck.cards.filter(c => c.id !== cardId);
}

export function updateCardQty(deck, cardId, newQty) {
  if (!deck || !deck.cards) return;

  const existing = deck.cards.find(c => c.id === cardId);
  if (!existing) return;

  if (newQty <= 0) {
    deck.cards = deck.cards.filter(c => c.id !== cardId);
  } else {
    existing.quantity = newQty;
  }
}


// --- Convenience functions for active deck ---

export function addCard(card, quantity = 1) {
  addCardToDeckData(getActiveDeck(), card, quantity);
}

export function removeCard(cardId) {
  removeCardFromDeckData(getActiveDeck(), cardId);
}
