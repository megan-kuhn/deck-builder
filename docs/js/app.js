/* js/app.js
Main application bootstrap module
- Runs on DOMContentLoaded
- Initializes all core features in proper order
- Handles dependencies between features
*/

import { initApi } from './features/api/bootstrapApi.js'; 
import { getCurrentPageSlice } from './features/state/selectors.js';
import { displaySearchResults } from './features/search/ui/displaySearchResults.js';
import { clearSearchResults } from './features/search/ui/clearSearchResults.js';

import { initAuth } from './features/auth/bootstrapAuth.js';
import { initProfilePage } from './features/profile/initProfilePage.js';

import { initDeckView } from './features/deck/initDeckView.js';
import { initNewDeck } from './features/deck/bootstrapNewDeck.js';

import { initCardDetailsModal } from "./features/card/ui/cardDetailsModal.js";

import { initSearch } from "./features/search/bootstrapSearch.js";
import { initPagination } from './features/pagination/bootstrapPagination.js';
  
document.addEventListener("DOMContentLoaded", async () => {

  // -------------------------
  // 1. Initialize API + initial search results
  // -------------------------
  const data = await initApi();

  if (data) {
    clearSearchResults();
    displaySearchResults(getCurrentPageSlice());
    initPagination();
  }

  // -------------------------
  // 2. Authentication
  // -------------------------
  initAuth();

  // -------------------------
  // 3. Deck / Card Features
  // -------------------------
  initCardDetailsModal();    
  initDeckView();            
  initNewDeck(); // depends on deck container existing

  // -------------------------
  // 4. Search & Filters
  // -------------------------
  initSearch();              

  // -------------------------
  // 5. Profile page
  // -------------------------
  initProfilePage();
});
