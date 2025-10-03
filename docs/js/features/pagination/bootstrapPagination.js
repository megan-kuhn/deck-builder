// js/features/pagination/bootstrapPagination.js

import {loadMoreButtonClickHandler} from './events/loadMoreButtonClickHandler.js';
import {setupLoadMoreButton} from './ui/setupLoadMoreButton.js';
import {updateLoadMoreButtonVisibility} from './ui/updateLoadMoreButton.js';

// Initializes pagination by setting up the "Load More" button and its event listener
export function initPagination() {
  setupLoadMoreButton();
  const loadMoreBtn = document.getElementById('load-more-button');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMoreButtonClickHandler);
  }
  updateLoadMoreButtonVisibility();
}