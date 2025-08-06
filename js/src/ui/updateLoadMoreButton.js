// src/ui/updateLoadMoreButton.js

import { getLoadMoreButton } from '../pagination/setupLoadMoreButton.js';
import { getNextPageUrl } from '../state/apiState.js';
import { hasMoreLocalCards } from '../state/selectors.js';

export function updateLoadMoreButtonVisibility() {
  const loadMoreBtn = getLoadMoreButton();
  if (!loadMoreBtn) return;
  if (hasMoreLocalCards() || getNextPageUrl()) {
    loadMoreBtn.style.display = 'inline-block';
  } else {
    loadMoreBtn.style.display = 'none';
  }
}
