// js/src/dom/displayCards.js

import { renderCard } from '../components/card.js';

export function displayCards(cards, containerId = "card-container-search") {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(cards)) return;

  container.innerHTML = '';

  cards.forEach(card => {
    const cardEl = renderCard(card);
    container.appendChild(cardEl);
  });
}
