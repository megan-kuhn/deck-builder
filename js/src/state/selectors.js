// js/src/state/selectors.js

import { getCards } from './dataState.js';
import { getCurrentPage, getPageSize } from './pagination.js';

export function getCurrentPageSlice() {
  const start = (getCurrentPage() - 1) * getPageSize();
  const end = start + getPageSize();
  return getCards().slice(start, end);
}

export function hasMoreLocalCards() {
  const totalCards = getCards().length;
  const end = getCurrentPage() * getPageSize();
  return end < totalCards;
}
