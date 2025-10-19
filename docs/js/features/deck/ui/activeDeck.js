// js/features/deck/ui/activeDeck.js

import { getActiveDeck } from '../data/deckList.js';
import { renderDeck } from './deckContainer.js';

export function removeActiveDeck() {
  const previous = document.querySelector('.deck-element.active');
  if (previous) previous.classList.remove('active');
}

export function setActiveDeckElement(deckId) {
  removeActiveDeck();
  const element = document.querySelector(`.deck-element[data-deck-id="${deckId}"]`);
  if (element) element.classList.add('active');
}

export function renderActiveDeck() {
  const deck = getActiveDeck();
  if (!deck) return;

  setActiveDeckElement(deck.id);

  const container = document.querySelector(`.deck-element.active .deck-container`);
  if (!container) return;

  renderDeck(container, deck.cards); // renderDeck now takes container + cards
}
