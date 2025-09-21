// js/src/ui/renderProfilePage.js
import { getUser } from "../state/userState.js";

export const renderProfilePage = () => {
  const { username, decks } = getUser();
  const container = document.getElementById("profile-container");

  container.innerHTML = `
    <h1>${username ? username : "Guest"}</h1>
    <div id="deck-list">
      ${decks.length > 0 ? 
        decks.map(deck => `<div class="deck">${deck.name}</div>`).join("") :
        "<p>No decks yet.</p>"
      }
    </div>
  `;
};
