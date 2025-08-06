/* src/app.js

- Main application bootstrap module:
- Runs on DOMContentLoaded event
- Initializes UI components: card list view, color filters, search form, reset buttons
- Resets form inputs and filters to default states on load
- Fetches initial card data from the API and updates application state
- Displays initial cards with pagination controls
- Sets up the dynamic "Load More" button to handle pagination
- Provides seamless user experience by wiring all core UI and data fetching together
*/

import { fetchCards, updateStateFromApiResponse } from './api/index.js'; 
import { getCurrentPageSlice } from './state/selectors.js';
import { displayCards } from './dom/displayCards.js';
import { clearCards } from './dom/clearCards.js';
import { initCardListView } from './dom/initCardListView.js';
import { initSearch } from './search/initSearch.js';
import { applySearchAndFilters } from './search/applySearchAndFilters.js';
import { initResetButtons } from './ui/reset.js';
import { initColorFilters } from './filters/index.js';
import { setupLoadMoreButton } from './pagination/index.js';
import { updateLoadMoreButtonVisibility } from './ui/index.js';

document.addEventListener("DOMContentLoaded", async () => {
  console.log('launching');
  
  initCardListView();

  initColorFilters(applySearchAndFilters);

  const form = document.getElementById('search-form');
  if (form) form.reset();

  const checkboxes = document.querySelectorAll('#color-filter input[type="checkbox"]');
  checkboxes.forEach(cb => (cb.checked = false));

  setupLoadMoreButton();

const data = await fetchCards();
const success = updateStateFromApiResponse(data);

if (success) {
  clearCards();
  displayCards(getCurrentPageSlice());
  updateLoadMoreButtonVisibility();
}

  initSearch();
  initResetButtons(applySearchAndFilters);
});
