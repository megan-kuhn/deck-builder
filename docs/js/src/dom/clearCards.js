// js/src/dom/clearCards.js

export function clearCards(containerId = "search-results") {
  const container = document.getElementById(containerId);
  if (container) container.innerHTML = '';
}
