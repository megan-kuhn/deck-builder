// js/src/data/deck.js
let decks = [];
let activeDeckId = null;

export function createDeck(name) {
  const newDeck = { id: crypto.randomUUID(), name, cards: [] };
  decks.push(newDeck);
  setActiveDeck(newDeck.id);
  return newDeck;
}

export function getDeck(id = activeDeckId) {
  const deck = decks.find(d => d.id === id);
  return deck?.cards || [];
}

export function getActiveDeck() {
  const deck = decks.find(d => d.id === activeDeckId);
  console.log("📦 [deck] Active deck:", activeDeckId, deck);
  return deck;
}

export function setActiveDeck(id) {
  activeDeckId = id;
}

export function addCard(card) {
  const active = getActiveDeck();
  if (!active) return;

  const existing = active.cards.find(c => c.id === card.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    active.cards.push({ ...card, quantity: 1 });
  }
}

export function removeCard(cardId) {
  const active = getActiveDeck();
  if (!active) return;

  active.cards = active.cards.filter(c => c.id !== cardId);
}
