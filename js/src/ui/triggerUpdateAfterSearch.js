// js/src/ui/triggerUpdateAfterSearch.js

import { displayCards } from '../dom/displayCards.js';
import { clearCards } from '../dom/clearCards.js';
import { getCurrentPageSlice } from '../state/selectors.js';
import { updateLoadMoreButtonVisibility } from './updateLoadMoreButton.js';

export function triggerUpdateAfterSearch() {
  clearCards();
  displayCards(getCurrentPageSlice());
  updateLoadMoreButtonVisibility();
}
