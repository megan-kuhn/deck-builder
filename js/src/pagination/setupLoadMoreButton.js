// js/src/pagination/setupLoadMoreButton.js

import { loadMoreButtonClickHandler } from './loadMoreButtonClickHandler.js';

let loadMoreBtn;

export function setupLoadMoreButton() {
  loadMoreBtn = document.createElement("button");
  loadMoreBtn.textContent = "Next Page";
  loadMoreBtn.classList.add("button--next-page");
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
