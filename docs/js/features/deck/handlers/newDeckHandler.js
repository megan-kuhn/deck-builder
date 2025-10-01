// js/s../handlers/newDeckHandler.js
// This module handles what happens after a new deck name is submitted.
// No DOM manipulation or modal logic here — just business logic + state.

import { isLoggedIn } from '../../state/userState.js';
import { createDeck } from '../data/deck.js';
import { createDeckElement, renderActiveDeck } from '../ui/activeDeck.js';

export function handleNewDeckName(deckName) {
  const cleanName = deckName.trim();
  if (!cleanName) return;

  if (!isLoggedIn()) console.warn('User not logged in');

  const newDeck = createDeck(cleanName);

  const container = document.getElementById('deck-section');
  if (!container) return;

  const deckEl = createDeckElement(newDeck);
  container.appendChild(deckEl);

  renderActiveDeck();
}
