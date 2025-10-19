// js/features/deck/handlers/newDeckHandler.js
// This module handles what happens after a new deck name is submitted.
// No DOM manipulation or modal logic here — just business logic + state.

import { isLoggedIn } from '../../state/userState.js';
import { createDeck } from '../data/deckList.js';
import { createDeckElement } from '../ui/newDeck.js';
import { renderActiveDeck } from '../ui/activeDeck.js';
import { addCardToDeckData } from '../data/deck.js';

export function handleNewDeckName(deckName, cardToAdd = null) {
  const cleanName = deckName.trim();
  if (!cleanName) return;

  if (!isLoggedIn()) console.warn('User not logged in');

  const newDeck = createDeck(cleanName);

  // Add the card if provided
  if (cardToAdd) addCardToDeckData(newDeck, cardToAdd);

  const container = document.getElementById('deck-section');
  if (!container) return;

  const deckEl = createDeckElement(newDeck);
  container.appendChild(deckEl);

  renderActiveDeck();

  return newDeck;
}
