// js/src/state/dataState.js

let cards = [];

export function setCards(newCards) {
  cards = newCards;
}

export function getCards() {
  return cards;
}

