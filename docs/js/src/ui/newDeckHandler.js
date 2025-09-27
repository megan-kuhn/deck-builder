// js/src/ui/newDeckHandler.js

// This module handles what happens after a new deck name is submitted.
// No DOM manipulation or modal logic here — just business logic + state.

import { isLoggedIn } from '../state/userState.js';

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

    // TODO: Hook into your state management
    // Example: add to local state or trigger an API call
    // saveDeck({ name: cleanName });

    // Example placeholder:
    alert(`Deck "${cleanName}" created!`);
}

