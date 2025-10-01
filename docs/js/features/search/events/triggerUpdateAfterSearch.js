// js/features/search/events/triggerUpdateAfterSearch.js

import { displaySearchResults } from '../ui/displaySearchResults.js';
import { clearSearchResults } from '../ui/clearSearchResults.js';
import { getCurrentPageSlice } from '../../state/selectors.js';
import { updateLoadMoreButtonVisibility } from '../../pagination/ui/updateLoadMoreButton.js';

export function triggerUpdateAfterSearch() {
  clearSearchResults();
  displaySearchResults(getCurrentPageSlice());
  updateLoadMoreButtonVisibility();
}

