// js/src/events/cardListEvents.js

import { addCard } from '../data/cardList.js';
import { renderCardList } from '../components/cardListContainer.js';

export function addCardToList(card) {
  addCard(card);
  renderCardList();
}
