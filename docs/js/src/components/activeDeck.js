// js/src/components/activeDeck.js
import { renderDeck } from './deckContainer.js';
import { getActiveDeck } from '../data/deck.js';

let activeDeckEl = null;

export function createActiveDeckElement(deck) {
  const details = document.createElement('details');
  details.id = 'active-deck-toggle';
  details.open = true;

  const summary = document.createElement('summary');
  summary.id = 'active-deck-name';
  summary.textContent = deck.name;

  const container = document.createElement('div');
  container.id = 'active-deck';
  container.classList.add('deck-container');
  container.textContent = 'No cards added yet.';

  details.appendChild(summary);
  details.appendChild(container);

  activeDeckEl = details;

  return details;
}

export function renderActiveDeck() {
  const deck = getActiveDeck();
  if (!deck) return;

  renderDeck();
  const summary = activeDeckEl.querySelector('#active-deck-name');
  if (summary) summary.textContent = deck.name;
}

export function removeActiveDeck() {
  if (activeDeckEl?.parentNode) {
    activeDeckEl.parentNode.removeChild(activeDeckEl);
    activeDeckEl = null;
  }
}
