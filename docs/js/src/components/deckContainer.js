// js/src/components/deckContainer.js
import { createCardElement } from './card.js';

export function renderDeck(container, cards, limit = 100) {
  if (!container) return;

  container.innerHTML = '';

  if (!cards || cards.length === 0) {
    container.textContent = 'No cards added yet.';
    return;
  }

  cards.slice(0, limit).forEach(card => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('single-card-container');

    const cardEl = createCardElement(card);
    const quantity = document.createElement('span');
    quantity.classList.add('card__quantity');
    quantity.textContent = `x${card.quantity}`;

    wrapper.appendChild(cardEl);
    wrapper.appendChild(quantity);
    container.appendChild(wrapper);
  });
}
