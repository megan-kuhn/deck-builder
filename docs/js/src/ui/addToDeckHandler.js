// js/src/events/addToDeckHandler.js

import { addCardToDeck } from '../events/deckEvents.js';

export function attachAddToDeckHandler(button, cardData) {
  button.addEventListener('click', () => addCardToDeck(cardData));
}
 