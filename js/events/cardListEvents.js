// events/cardListEvents.js

import { addCard } from '../data/cardList.js';
import { renderCardList } from '../components/cardListView.js';

export function addCardToList(card) {
  addCard(card);
  renderCardList();
}
