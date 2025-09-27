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

// Removes the active class from all decks
export function removeActiveDeck() {
  const previous = document.querySelector('.deck-element.active');
  if (previous) previous.classList.remove('active');
}

// Marks a deck as active in the DOM
export function setActiveDeckElement(deckId) {
  removeActiveDeck();
  const newActive = document.querySelector(`.deck-element[data-deck-id="${deckId}"]`);
  if (newActive) newActive.classList.add('active');
}

// Renders the cards for the current active deck
export function renderActiveDeck() {
  const active = getActiveDeck();
  if (!active) return;

  // Make sure the correct element is marked active
  setActiveDeckElement(active.id);

  const activeContainer = document.querySelector(`.deck-element.active .deck-container`);
  if (!activeContainer) return;

  renderDeck(activeContainer, active.cards);
}
