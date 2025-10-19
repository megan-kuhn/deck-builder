// js/features/deck/ui/newDeck.js

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