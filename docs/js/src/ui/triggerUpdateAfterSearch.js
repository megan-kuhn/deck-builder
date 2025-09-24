// js/src/ui/triggerUpdateAfterSearch.js

import { displaySearchResults } from '../dom/displaySearchResults.js';
import { clearSearchResults } from '../dom/clearSearchResults.js';
import { getCurrentPageSlice } from '../state/selectors.js';
import { updateLoadMoreButtonVisibility } from './updateLoadMoreButton.js';

export function triggerUpdateAfterSearch() {
  clearSearchResults();
  displaySearchResults(getCurrentPageSlice());
  updateLoadMoreButtonVisibility();
}
