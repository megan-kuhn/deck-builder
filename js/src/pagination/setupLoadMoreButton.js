// src/pagination/setupLoadMoreButton.js

import { loadMoreButtonClickHandler } from './loadMoreButtonClickHandler.js';

let loadMoreBtn;

export function setupLoadMoreButton() {
  loadMoreBtn = document.createElement("button");
  loadMoreBtn.textContent = "Next Page";
  loadMoreBtn.classList.add("button--nextpage");
  loadMoreBtn.style.display = 'none';
  document.body.appendChild(loadMoreBtn);

  loadMoreBtn.onclick = loadMoreButtonClickHandler;
}

export function getLoadMoreButton() {
  return loadMoreBtn;
}
