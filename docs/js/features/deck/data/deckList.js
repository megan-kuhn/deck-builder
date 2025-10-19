// js/features/deck/data/deckList.js

// In-memory storage for decks
let decks = [];
let activeDeckId = null;

// --- Deck Retrieval ---

export function getDecks() {
  return decks;
}

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