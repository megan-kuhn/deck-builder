// src/search/initSearch.js
import { applySearchAndFilters } from './applySearchAndFilters.js';

export function initSearch() {
  const form = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const typeFilter = document.getElementById('type-filter');

  if (!form || !searchInput) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await applySearchAndFilters();
  });

  searchInput.addEventListener('input', () => {
    applySearchAndFilters();
  });

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      applySearchAndFilters();
    }
  });

  if (typeFilter) {
    typeFilter.addEventListener('change', () => {
      applySearchAndFilters();
    });
  }
}
