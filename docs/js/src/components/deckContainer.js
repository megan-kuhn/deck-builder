// js/src/components/deckContainer.js

import { getDeck } from '../data/deck.js';
import { createCardElement } from './card.js';

export function renderDeck(limit = 100) { 
  let container = document.getElementById('active-deck');
  if (!container) return;

  const cards = getDeck();
  container.innerHTML = '';

  if (cards.length === 0) {
    container.textContent = 'No cards added yet.';
    return;
  }

  cards.slice(0, limit).forEach(card => {
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('single-card-container');

    const cardEl = createCardElement(card);
    const quantity = document.createElement('span');
    quantity.classList.add('card__quantity');
    quantity.textContent = `x${card.quantity}`;

    cardWrapper.appendChild(cardEl);
    cardWrapper.appendChild(quantity);

    container.appendChild(cardWrapper);
  });
}
