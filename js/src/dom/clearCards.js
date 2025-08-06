// src/dom/clearCards.js

export function clearCards(containerId = "card-container") {
  const container = document.getElementById(containerId);
  if (container) container.innerHTML = '';
}
