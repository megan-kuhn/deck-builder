// js/features/pagination/ui/setupLoadMoreButton.js

import { loadMoreButtonClickHandler } from '../events/loadMoreButtonClickHandler.js';

let loadMoreBtn;

export function setupLoadMoreButton() {
  loadMoreBtn = document.createElement("button");
  loadMoreBtn.textContent = "Next Page";
  loadMoreBtn.id = "next-page-button";
  loadMoreBtn.style.display = 'none';

  const paginationContainer = document.getElementById('pagination-container');
  if (paginationContainer) {
    paginationContainer.appendChild(loadMoreBtn);
  }

  loadMoreBtn.onclick = loadMoreButtonClickHandler;
}

export function getLoadMoreButton() {
  return loadMoreBtn;
}

