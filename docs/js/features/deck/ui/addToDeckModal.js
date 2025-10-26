// js/features/deck/ui/addToDeckModal.js

import { getDecks } from '../data/deckList.js';
import { handleNewDeckName } from '../handlers/newDeckHandler.js';
import { addCardToDeckData } from '../data/deck.js';
import { renderDeck } from './deckContainer.js';
import { setupModal } from '../../shared/ui/modal.js';

export function initAddToDeckModal() {
  const modalId = 'add-to-deck-modal';
  const closeButtonId = 'add-to-deck-modal-close-button';

  // Initialize shared modal behavior
  const modalControls = setupModal({ modalId, closeButtonId });
  if (!modalControls) return {}; // Exit early if modal isn't present

  const { openModal: openSharedModal, closeModal } = modalControls;

  // ---- DOM ELEMENTS ----
  const modal = document.getElementById(modalId);
  const decksSelect = modal.querySelector('#existing-decks-select');
  const existingDecksContainer = modal.querySelector('#existing-decks-container');
  const addToSelectedDeckButton = modal.querySelector('#add-to-selected-deck-button');
  const existingDecksSuccessMsg = modal.querySelector('#add-to-deck_existing-deck-success-message');

  const newDeckForm = modal.querySelector('#add-to-deck_new-deck-form');
  const newDeckInput = modal.querySelector('#add-to-deck_deck-name-input');
  const newDeckSuccessMsg = modal.querySelector('#add-to-deck_new-deck-success-message');

  let currentCard = null;

  // ---- RENDER EXISTING DECKS ----
  function renderExistingDecks() {
    const decks = getDecks();
    decksSelect.innerHTML = ''; // Clear old options

    if (decks.length === 0) {
      existingDecksContainer.style.display = 'none';
      return;
    }

    existingDecksContainer.style.display = 'block';

    // Placeholder option
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = '-- Select a deck --';
    placeholder.disabled = true;
    placeholder.selected = true;
    decksSelect.appendChild(placeholder);

    // Deck options
    decks.forEach(deck => {
      const option = document.createElement('option');
      option.value = deck.id;
      option.textContent = deck.name;
      decksSelect.appendChild(option);
    });
  }

  // ---- HANDLE EXISTING DECK SELECTION ----
  decksSelect.addEventListener('change', () => {
    const selectedDeckName = decksSelect.options[decksSelect.selectedIndex]?.textContent;
    addToSelectedDeckButton.textContent = selectedDeckName
      ? `Add to ${selectedDeckName}`
      : 'Add to Selected Deck';
  });

  // ---- HANDLE ADDING CARD TO EXISTING DECK ----
  addToSelectedDeckButton.addEventListener('click', () => {
    const selectedDeckId = decksSelect.value;
    if (!selectedDeckId) return;

    const deck = getDecks().find(d => d.id === selectedDeckId);
    if (!deck) return;

    addCardToDeckData(deck, currentCard);

    existingDecksSuccessMsg.textContent = `Card added to ${deck.name}`;
    existingDecksSuccessMsg.style.display = 'block';

    renderDeck(
      document.querySelector(`.deck-element[data-deck-id="${deck.id}"] .deck-container`),
      deck.cards
    );
  });

  // ---- HANDLE NEW DECK CREATION ----
  const addToNewDeckButton = newDeckForm.querySelector('button[type="submit"]');

  // Update button label live as user types
  newDeckInput.addEventListener('input', () => {
    const name = newDeckInput.value.trim();
    addToNewDeckButton.textContent = name ? `Create ${name} & Add` : 'Create Deck & Add';
  });

  // ---- HANDLE NEW DECK CREATION ----
  newDeckForm.addEventListener('submit', e => {
    e.preventDefault();
    const deckName = newDeckInput.value.trim();
    if (!deckName) return;

    const hadNoDecks = getDecks().length === 0;

    // Preserve current selection before creating the new deck
    const previouslySelectedDeckId = decksSelect.value;

    const newDeck = handleNewDeckName(deckName, currentCard);

    newDeckSuccessMsg.textContent = `New deck "${deckName}" created and card added!`;
    newDeckSuccessMsg.style.display = 'block';

    // Render the new deck in the UI
    renderDeck(
      document.querySelector(`.deck-element[data-deck-id="${newDeck.id}"] .deck-container`),
      newDeck.cards
    );

    // Reset input and button
    newDeckInput.value = '';
    addToNewDeckButton.textContent = 'Add to New Deck';

    // 🔹 Only refresh deck list if the user already had decks
    if (!hadNoDecks) {
      renderExistingDecks();

      // Restore the previously selected deck (if it still exists)
      if (previouslySelectedDeckId) {
        decksSelect.value = previouslySelectedDeckId;

        // Re-trigger the change event to update the "Add to ..." button label
        decksSelect.dispatchEvent(new Event('change'));
      }
    }
  });

  // ---- OPEN MODAL ----
  function openModal(cardData) {
    currentCard = cardData;

    // Reset modal UI state
    addToSelectedDeckButton.textContent = 'Add to Selected Deck';
    existingDecksSuccessMsg.style.display = 'none';
    newDeckSuccessMsg.style.display = 'none';
    newDeckInput.value = '';

    renderExistingDecks();
    openSharedModal();
  }

  return { openModal, closeModal };
}
