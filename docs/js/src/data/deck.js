// js/src/data/deck.js

let decks = [];
let activeDeckId = null;

// --- Deck Array Management ---

export function createDeck(name) {
  const newDeck = { id: crypto.randomUUID(), name, cards: [] };
  decks.push(newDeck);
  setActiveDeck(newDeck.id);
  return newDeck;
}

export function getDeck(id) {
  return decks.find(d => d.id === id);
}

export function getAllDecks() {
  return decks;
}

export function getActiveDeck() {
  return getDeck(activeDeckId);
}

export function setActiveDeck(id) {
  activeDeckId = id;
}

// --- Single Deck Operations ---

export function addCardToDeck(deck, card) {
  if (!deck) return;
  const existing = deck.cards.find(c => c.id === card.id);
  if (existing) existing.quantity++;
  else deck.cards.push({ ...card, quantity: 1 });
}

export function removeCardFromDeck(deck, cardId) {
  if (!deck) return;
  deck.cards = deck.cards.filter(c => c.id !== cardId);
}

// --- Convenience functions for active deck ---

export function addCard(card) {
  addCardToDeck(getActiveDeck(), card);
}

export function removeCard(cardId) {
  removeCardFromDeck(getActiveDeck(), cardId);
}
