/* js/app.js

- Main application bootstrap module:
- Runs on DOMContentLoaded event
- Initializes UI components: card list view, color filters, search form, reset buttons
- Resets form inputs and filters to default states on load
- Fetches initial card data from the API and updates application state
- Displays initial cards with pagination controls
- Sets up the dynamic "Load More" button to handle pagination
- Provides seamless user experience by wiring all core UI and data fetching together
*/

import { initApi } from './features/api/bootstrapApi.js'; 
import { getCurrentPageSlice } from './features/state/selectors.js';
import { displaySearchResults } from './features/search/ui/displaySearchResults.js';
import { clearSearchResults } from './features/search/ui/clearSearchResults.js';
import { initDeckView } from './features/deck/initDeckView.js';
import { initCardDetailsModal } from "./features/card/ui/cardDetailsModal.js";
import { initSearch } from './features/search/initSearch.js';
import { applySearchAndFilters } from './features/search/applySearchAndFilters.js';
import { initResetButtons } from './features/shared/ui/reset.js';
import { initColorFilters } from './features/filters/renderColorFilters.js';
import { initPagination } from './features/pagination/bootstrapPagination.js';

import { initAuth } from './features/auth/bootstrapAuth.js';

import { initProfilePage } from './features/profile/initProfilePage.js';
import { initNewDeckModal, openNewDeckModal } from "./features/deck/ui/newDeckModal.js";
import { handleNewDeckName } from "./features/deck/handlers/newDeckHandler.js";
  
document.addEventListener("DOMContentLoaded", async () => {

  const data = await initApi();

  if (data) {
    clearSearchResults();
    displaySearchResults(getCurrentPageSlice());
    
    initPagination();
  }

  initAuth();

  // --- CARD LIST & DETAILS ---
  initDeckView();
  const cardDetailsModalEl = document.getElementById("card-details-modal");
  if (cardDetailsModalEl) {
    initCardDetailsModal();
  }

  // --- FILTERS & SEARCH ---
  initColorFilters(applySearchAndFilters);
  const form = document.getElementById('search-form');
  if (form) form.reset();
  const checkboxes = document.querySelectorAll('#color-filter input[type="checkbox"]');
  checkboxes.forEach(cb => (cb.checked = false));
  initSearch();
  initResetButtons(applySearchAndFilters);

  // --- PROFILE PAGE INIT ---
  if (window.location.pathname.endsWith("my-profile.html")) {
    initProfilePage();
  }

  // --- NEW DECK FLOW ---
  initNewDeckModal(); // sets up the modal and its form

  const newDeckBtn = document.getElementById("new-deck-button");
  if (newDeckBtn) {
    newDeckBtn.addEventListener("click", () => {
      openNewDeckModal(); // open the new deck modal
    }); 
  }

  // Handle deck name submission globally
  document.addEventListener("deckNameSubmitted", (e) => {
    handleNewDeckName(e.detail.name); // your custom logic
  });
});


