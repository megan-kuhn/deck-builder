// js/src/components/cardListContainer.js

import { getCardList } from '../data/cardList.js';
import { createCardElement } from './card.js';

export function renderCardList(limit = 100) { 
  const container = document.getElementById('card-list-container');
  if (!container) return;

  const cards = getCardList();
  container.innerHTML = '';

  if (cards.length === 0) {
    container.textContent = 'No cards added to list';
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
