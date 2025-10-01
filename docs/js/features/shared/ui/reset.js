// js/features/shared/ui/reset.js

import { applySearchAndFilters } from '../../search/applySearchAndFilters.js';

export function initResetButtons() {
  const clearSearchBtn = document.getElementById('clear-search-button');
  const resetFiltersBtn = document.getElementById('reset-filters-button');
  const searchInput = document.getElementById('search-input');
  const typeFilter = document.getElementById('type-filter');

  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener('click', async () => {
      searchInput.value = '';
      await applySearchAndFilters();
    });
  }

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', async () => {
      // Clear all color checkboxes
      const checkboxes = document.querySelectorAll('#color-filter input[type="checkbox"]');
      checkboxes.forEach(cb => (cb.checked = false));

      // Reset card type filter select
      if (typeFilter) {
        typeFilter.value = '';
      }

      await applySearchAndFilters();
    });
  }
}

