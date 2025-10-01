// js/features/search/ui/displaySearchResults.js

import { renderCard } from '../../card/ui/card.js';

export function displaySearchResults(cards, containerId = "search-results") {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(cards)) return;

  container.innerHTML = '';

  cards.forEach(card => {
    const cardEl = renderCard(card);
    container.appendChild(cardEl);
  });
}

