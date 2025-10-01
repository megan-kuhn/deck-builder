// js/src/events/addToDeckHandler.js

import { addCardToDeck } from '../../deck/events/deckEvents.js';

export function attachAddToDeckHandler(button, cardData) {
  button.addEventListener('click', () => addCardToDeck(cardData));
}
 