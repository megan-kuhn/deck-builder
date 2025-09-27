// js/src/components/activeDeck.js
import { getActiveDeck } from '../data/deck.js';
import { renderDeck } from './deckContainer.js';

export function createDeckElement(deck) {
  const details = document.createElement('details');
  details.dataset.deckId = deck.id;
  details.classList.add('deck-element');

  const summary = document.createElement('summary');
  summary.textContent = deck.name;
  summary.classList.add('deck-name');

  const container = document.createElement('div');
  container.classList.add('deck-container');
  container.textContent = 'No cards added yet.';

  details.appendChild(summary);
  details.appendChild(container);

  return details;
}

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
