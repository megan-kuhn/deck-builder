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
import { logout } from "./src/auth/auth.js";
import updateAuthUI from './src/ui/updateAuthUI.js';
import { getUser } from './src/state/userState.js';
import { fetchCards, updateStateFromApiResponse } from './src/api/index.js'; 
import { getCurrentPageSlice } from './src/state/selectors.js';
import { displayCards } from './src/dom/displayCards.js';
import { clearCards } from './src/dom/clearCards.js';
import { initCardListView } from './src/dom/initCardListView.js';
import { initCardDetailsModal } from "./src/components/cardDetailsModal.js";
import { initSearch } from './src/search/initSearch.js';
import { applySearchAndFilters } from './src/search/applySearchAndFilters.js';
import { initResetButtons } from './src/ui/reset.js';
import { initColorFilters } from './src/filters/index.js';
import { setupLoadMoreButton } from './src/pagination/index.js';
import { updateLoadMoreButtonVisibility } from './src/ui/index.js';
import { setupModal } from './src/ui/modal.js'; // Adjust path if needed
import { initCardListToggle } from "./src/components/cardListToggle.js";
import { initProfilePage } from './src/dom/initProfilePage.js';
  
document.addEventListener("DOMContentLoaded", async () => {
  console.log('launching');

  updateAuthUI();

  const logoutBtn = document.querySelector("#logout-button"); // add a logout button to your HTML

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => logout());
  }

  setupModal({
    openButtonId: 'login-modal-open-button',
    modalId: 'login-modal',
    closeButtonId: 'login-modal-close-button'
  });
  
  initCardListToggle();
  initCardListView();
  initCardDetailsModal();

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

  if (window.location.pathname.endsWith("my-profile.html")) {
    initProfilePage();
  }
});
