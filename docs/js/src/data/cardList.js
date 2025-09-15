// js/src/data/cardList.js

let cardList = [];

export function addCard(card) {
  console.log('added card');
  const existing = cardList.find(c => c.id === card.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cardList.push({ ...card, quantity: 1 });
  }
}

export function getCardList() {
  return [...cardList]; // Return a copy to avoid mutation
}

export function removeCard(cardId) {
  cardList = cardList.filter(c => c.id !== cardId);
}
