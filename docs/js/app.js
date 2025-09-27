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
import './src/auth/login.js';
import { logout } from "./src/auth/logout.js";
import updateAuthUI from './src/ui/updateAuthUI.js';
import { fetchCards, updateStateFromApiResponse } from './src/api/index.js'; 
import { getCurrentPageSlice } from './src/state/selectors.js';
import { displaySearchResults } from './src/dom/displaySearchResults.js';
import { clearSearchResults } from './src/dom/clearSearchResults.js';
import { initDeckView } from './src/dom/initDeckView.js';
import { initCardDetailsModal } from "./src/components/cardDetailsModal.js";
import { initSearch } from './src/search/initSearch.js';
import { applySearchAndFilters } from './src/search/applySearchAndFilters.js';
import { initResetButtons } from './src/ui/reset.js';
import { initColorFilters } from './src/filters/index.js';
import { setupLoadMoreButton } from './src/pagination/index.js';
import { updateLoadMoreButtonVisibility } from './src/ui/index.js';
import { setupModal } from './src/ui/modal.js'; // Adjust path if needed
import { initProfilePage } from './src/dom/initProfilePage.js';
import { initNewDeckModal, openNewDeckModal } from "./src/components/newDeckModal.js";
import { handleNewDeckName } from "./src/ui/newDeckHandler.js";
  
document.addEventListener("DOMContentLoaded", async () => {
  console.log('launching');

  // --- AUTH & LOGOUT ---
  updateAuthUI();
  const logoutBtn = document.querySelector("#logout-button");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => logout());
  }

  // --- LOGIN MODAL ---
  window.loginModalControls = setupModal({
    openButtonId: 'login-modal-open-button',
    modalId: 'login-modal',
    closeButtonId: 'login-modal-close-button'
  });

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

  // --- PAGINATION ---
  setupLoadMoreButton();
  const data = await fetchCards();
  const success = updateStateFromApiResponse(data);
  if (success) {
    clearSearchResults();
    displaySearchResults(getCurrentPageSlice());
    updateLoadMoreButtonVisibility();
  }

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


