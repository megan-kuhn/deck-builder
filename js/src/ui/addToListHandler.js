// js/src/events/addToListHandler.js

import { addCardToList } from '../events/cardListEvents.js';

export function attachAddToListHandler(button, cardData) {
  button.addEventListener('click', () => addCardToList(cardData));
}