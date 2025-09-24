// js/src/search/applySearchAndFilters.js

import { fetchCards } from '../api/index.js'; 
import { setCards } from '../state/dataState.js';
import { resetPagination } from '../state/pagination.js';
import { clearSearchResults } from '../dom/clearSearchResults.js';
import { getSelectedColors } from '../filters/index.js';
import { triggerUpdateAfterSearch, updateLoadMoreButtonVisibility } from '../ui/index.js';
import { updateStateFromApiResponse } from '../api/updateState.js';

export async function applySearchAndFilters() {
  const searchInput = document.getElementById('search-input');
  const typeFilter = document.getElementById('type-filter');

  const baseQuery = searchInput?.value.trim() || 'game:paper';
  const selectedColors = getSelectedColors();

  let colorQuery = '';
  if (selectedColors.length > 0) {
    const colorString = selectedColors.sort().join('');
    colorQuery = `color=${colorString}`;
  }

  let typeQuery = '';
  if (typeFilter && typeFilter.value && typeFilter.value.trim() !== '') {
    typeQuery = `type:${typeFilter.value.trim()}`;
  }

  const fullQuery = [baseQuery, colorQuery, typeQuery]
    .filter(Boolean)
    .join(' ');

  const response = await fetchCards(fullQuery); // ✅ renamed from `data` to `response`
  const success = updateStateFromApiResponse(response);

  if (!success) {
    clearSearchResults();
    return;
  }

  setCards(response.data); // ✅ correctly using the `data` array inside the response
  resetPagination();

  triggerUpdateAfterSearch();
  updateLoadMoreButtonVisibility();
}
