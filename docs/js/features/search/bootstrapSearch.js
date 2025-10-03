// js/features/search/bootstrapSearch.js

import { initSearchForm } from "./initSearch.js";
import { initResetButtons } from "../shared/ui/reset.js";
import { initColorFilters } from "../filters/renderColorFilters.js";
import { applySearchAndFilters } from "./applySearchAndFilters.js";

export function initSearch() {
  // Init color filters
  initColorFilters(applySearchAndFilters);

  // Reset search form + filters
  const form = document.getElementById("search-form");
  if (form) form.reset();

  const checkboxes = document.querySelectorAll('#color-filter input[type="checkbox"]');
  checkboxes.forEach(cb => (cb.checked = false));

  // Wire search + reset
  initSearchForm();
  initResetButtons(applySearchAndFilters);
}
