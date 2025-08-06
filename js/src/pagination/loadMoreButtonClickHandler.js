// src/pagination/loadMoreButtonClickHandler.js

import { fetchCards } from '../api/index.js';
import { incrementPage } from '../state/pagination.js';
import { getNextPageUrl } from '../state/apiState.js';
import { getCurrentPageSlice, hasMoreLocalCards } from '../state/selectors.js';
import { displayCards } from '../dom/displayCards.js';
import { clearCards } from '../dom/clearCards.js';
import { updateLoadMoreButtonVisibility } from '../ui/index.js';
import { updateStateFromApiResponse } from '../api/updateState.js';

export async function loadMoreButtonClickHandler() {
  if (hasMoreLocalCards()) {
    incrementPage();
    clearCards();
    displayCards(getCurrentPageSlice());
    updateLoadMoreButtonVisibility();
  } else if (getNextPageUrl()) {
    const data = await fetchCards(getNextPageUrl());
    const success = updateStateFromApiResponse(data);

    if (success) {
      clearCards();
      displayCards(getCurrentPageSlice());
    }
    updateLoadMoreButtonVisibility();
  }
}
