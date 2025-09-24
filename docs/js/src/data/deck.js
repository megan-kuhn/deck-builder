// js/src/data/deck.js

let deck = [];

export function addCard(card) {
  console.log('added card');
  const existing = deck.find(c => c.id === card.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    deck.push({ ...card, quantity: 1 });
  }
}

export function getDeck() {
  return [...deck]; // Return a copy to avoid mutation
}

export function removeCard(cardId) {
  deck = deck.filter(c => c.id !== cardId);
}
