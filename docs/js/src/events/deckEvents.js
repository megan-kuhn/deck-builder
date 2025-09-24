// js/src/events/deckEvents.js

import { addCard } from '../data/deck.js';
import { renderDeck } from '../components/deckContainer.js';

export function addCardToDeck(card) {
  addCard(card);
  renderDeck();
}
