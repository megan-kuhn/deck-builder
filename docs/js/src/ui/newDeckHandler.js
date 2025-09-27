// js/src/ui/newDeckHandler.js

// This module handles what happens after a new deck name is submitted.
// No DOM manipulation or modal logic here — just business logic + state.

import { isLoggedIn } from '../state/userState.js';
import { createDeck } from '../data/deck.js';
import { createActiveDeckElement, renderActiveDeck, removeActiveDeck } from '../components/activeDeck.js';

export function handleNewDeckName(deckName) {
  // Trim just in case (modal already does this, but it's safe)
  const cleanName = deckName.trim();
  if (!cleanName) return; // Should never happen, but guard clause anyway

  console.log("📦 [newDeckHandler] Received deck name:", cleanName);

  if (isLoggedIn()) {
    console.log("✅ User is logged in");
  } else {
    console.log("❌ User is NOT logged in"); 
  }

  // 1️⃣ Remove previous active deck UI
  removeActiveDeck();

  // 2️⃣ Create the new deck in state
  const newDeck = createDeck(cleanName);

  // 3️⃣ Render the new active deck accordion
  const container = document.getElementById('deck-section');
  if (container) {
    container.appendChild(createActiveDeckElement(newDeck));
    renderActiveDeck();
  }
}

