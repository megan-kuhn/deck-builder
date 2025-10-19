// js/features/deck/ui/addToDeckModal.js

import { getDecks } from '../data/deckList.js';
import { handleNewDeckName } from '../handlers/newDeckHandler.js';
import { addCardToDeckData } from '../data/deck.js';
import { renderDeck } from './deckContainer.js';
import { setupModal } from '../../shared/ui/modal.js';

export function initAddToDeckModal() {
  const modalId = 'add-to-deck-modal';
  const closeButtonId = 'add-to-deck-modal-close-button';

  const modalControls = setupModal({ modalId, closeButtonId });
  if (!modalControls) return {}; // modal not found on page

  const { openModal: openSharedModal, closeModal } = modalControls;

  // DOM references inside the modal
  const modal = document.getElementById(modalId);
  const decksList = modal.querySelector('#existing-decks-list');
  const newDeckForm = modal.querySelector('#add-to-deck_new-deck-form');
  const newDeckInput = modal.querySelector('#add-to-deck_deck-name-input');
  const existingDecksSuccessMsg = modal.querySelector('#add-to-deck_existing-deck-success-message');
  const newDeckSuccessMsg = modal.querySelector('#add-to-deck_new-deck-success-message');

  let currentCard = null;

  // Render the list of existing decks
  function renderExistingDecks() {
    decksList.innerHTML = '';
    const decks = getDecks();

    // Hide or show the container depending on whether there are decks
    const existingDecksContainer = document.getElementById('existing-decks-container');
    if (decks.length === 0) {
      existingDecksContainer.style.display = 'none';
    } else {
      existingDecksContainer.style.display = 'block';
    }

    decks.forEach(deck => {
      const li = document.createElement('li');
      li.textContent = deck.name;
      li.classList.add('current-deck-list-item');
      li.dataset.deckId = deck.id;
      li.style.cursor = 'pointer';

      // Accessibility
      li.setAttribute('role', 'button');  // <- role
      li.setAttribute('tabindex', '0');   // <- make focusable

      li.addEventListener('click', () => {
        addCardToDeckData(deck, currentCard);
        existingDecksSuccessMsg.textContent = `Card added to ${deck.name}`;
        existingDecksSuccessMsg.style.display = 'block';
        renderDeck(
          document.querySelector(`.deck-element[data-deck-id="${deck.id}"] .deck-container`),
          deck.cards
        );
      });
      decksList.appendChild(li);
    });
  }

  // Handle new deck creation
  newDeckForm.addEventListener('submit', e => {
    e.preventDefault();
    const deckName = newDeckInput.value.trim();
    if (!deckName) return;

    const newDeck = handleNewDeckName(deckName, currentCard);

    newDeckSuccessMsg.textContent = `New deck "${deckName}" created and card added!`;
    newDeckSuccessMsg.style.display = 'block';

    // Render the new deck in the UI
    renderDeck(
      document.querySelector(`.deck-element[data-deck-id="${newDeck.id}"] .deck-container`),
      newDeck.cards
    );

    newDeckInput.value = '';
    renderExistingDecks(); // update the list to include the new deck
  });

  // Open modal function to be called from addToDeckHandler
  function openModal(cardData) {
    currentCard = cardData;
    existingDecksSuccessMsg.style.display = 'none';
    newDeckSuccessMsg.style.display = 'none';
    renderExistingDecks();
    openSharedModal();
  }

  return { openModal, closeModal };
}
