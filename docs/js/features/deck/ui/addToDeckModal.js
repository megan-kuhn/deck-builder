// js/features/deck/ui/addToDeckModal.js

import { getDecks } from '../data/deckList.js';
import { handleNewDeckName } from '../handlers/newDeckHandler.js';
import { addCardToDeck } from '../handlers/deckHandlers.js'; // centralized handler
import { renderDeck } from './deckContainer.js';
import { setupModal } from '../../shared/ui/modal.js';
import { createQtyStepper } from '../../shared/ui/qtyStepper.js';

export function initAddToDeckModal() {
  const modalId = 'add-to-deck-modal';
  const closeButtonId = 'add-to-deck-modal-close-button';

  const modal = document.getElementById(modalId);
  if (!modal) return {}; // exit if modal isn't in DOM

  const decksSelect = modal.querySelector('#add-to-existing-deck-select');
  const existingDecksContainer = modal.querySelector('#add-to-existing-deck-container');
  const addToSelectedDeckButton = modal.querySelector('#add-to-existing-deck-button');
  const existingDecksSuccessMsg = modal.querySelector('#add-to-existing-deck-success-message');

  const newDeckForm = modal.querySelector('#add-to-new-deck-form');
  const newDeckInput = modal.querySelector('#add-to-new-deck-name-input');
  const addToNewDeckButton = newDeckForm.querySelector('#add-to-new-deck-button');
  const newDeckSuccessMsg = modal.querySelector('#add-to-new-deck-success-message');

  // Setup shared modal
  const modalControls = setupModal({ modalId, closeButtonId });
  if (!modalControls) return {};
  const { openModal: openSharedModal, closeModal } = modalControls;

  let currentCard = null;

  // ---- Quantity Steppers ----
  let existingDeckQty = 1;
  let newDeckQty = 1;

  const existingDeckStepper = createQtyStepper({
    initial: 1,
    min: 1,
    max: 999999,
    onChange: (val) => (existingDeckQty = val),
  });

  const newDeckStepper = createQtyStepper({
    initial: 1,
    min: 1,
    max: 999999,
    onChange: (val) => (newDeckQty = val),
  });

  // ---- Wrap existing deck stepper + button ----
  if (addToSelectedDeckButton?.parentNode && existingDecksSuccessMsg) {
  const existingParent = addToSelectedDeckButton.parentNode;

  const existingRow = document.createElement('div');
  existingRow.classList.add('form__row');

  // Move stepper + button into the row
  existingRow.appendChild(existingDeckStepper.element);
  existingRow.appendChild(addToSelectedDeckButton);

  // Append the row
  existingParent.appendChild(existingRow);

  // Move the success message to be after the row
  existingParent.appendChild(existingDecksSuccessMsg);
}


  // ---- Wrap new deck stepper + button ----
  if (addToNewDeckButton?.parentNode) {
    const newParent = addToNewDeckButton.parentNode;

    const newRow = document.createElement('div');
    newRow.classList.add('form__row');

    // Move button into the row
    newRow.appendChild(newDeckStepper.element);
    newRow.appendChild(addToNewDeckButton);

    newParent.appendChild(newRow);
  }


  // ---- Render Existing Decks ----
  function renderExistingDecks() {
    if (!decksSelect) return;
    const decks = getDecks();
    decksSelect.innerHTML = '';

    if (decks.length === 0) {
      if (existingDecksContainer) existingDecksContainer.style.display = 'none';
      return;
    }

    if (existingDecksContainer) existingDecksContainer.style.display = 'block';

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = '-- Select a deck --';
    placeholder.disabled = true;
    placeholder.selected = true;
    decksSelect.appendChild(placeholder);

    decks.forEach((deck) => {
      const option = document.createElement('option');
      option.value = deck.id;
      option.textContent = deck.name;
      decksSelect.appendChild(option);
    });
  }

  // ---- Existing Deck Selection ----
  if (decksSelect) {
    decksSelect.addEventListener('change', () => {
      const selectedDeckName = decksSelect.options[decksSelect.selectedIndex]?.textContent;
      if (addToSelectedDeckButton) {
        addToSelectedDeckButton.textContent = 'Add to Deck';
      }
    });
  }

// ---- Add to Existing Deck ----
if (addToSelectedDeckButton && decksSelect) {
  addToSelectedDeckButton.addEventListener('click', () => {
    if (!currentCard) return;

    // Convert select value to match deck ID type
    const selectedDeckId = decksSelect.value;
    const deck = getDecks().find((d) => String(d.id) === selectedDeckId);
    if (!deck) return;

    // Add card to deck using centralized handler and quantity
    addCardToDeck(currentCard, existingDeckQty, deck);

    // Show success message below button
    if (existingDecksSuccessMsg) {
      existingDecksSuccessMsg.textContent = `${existingDeckQty} card${existingDeckQty > 1 ? 's' : ''} added to ${deck.name}`;
      existingDecksSuccessMsg.style.display = 'block';
    }

    // Re-render that deck in the UI
    const container = document.querySelector(`.deck-element[data-deck-id="${deck.id}"] .deck-container`);
    if (container) renderDeck(container, deck.cards);
  });
}


  // ---- Create + Add to New Deck ----
  if (newDeckForm && newDeckInput && addToNewDeckButton) {
    newDeckInput.addEventListener('input', () => {
      addToNewDeckButton.textContent = 'Add to New Deck';
    });

    newDeckForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const deckName = newDeckInput.value.trim();
      if (!deckName || !currentCard) return;

      const hadNoDecks = getDecks().length === 0;
      const previouslySelectedDeckId = decksSelect?.value;

      const newDeck = handleNewDeckName(deckName, currentCard);

      // Apply new deck quantity
      const cardInDeck = newDeck.cards.find((c) => c.id === currentCard.id);
      if (cardInDeck) cardInDeck.quantity = newDeckQty;

      if (newDeckSuccessMsg) {
        newDeckSuccessMsg.textContent = `${newDeckQty} card${newDeckQty > 1 ? 's' : ''} added to ${deckName}`;
        newDeckSuccessMsg.style.display = 'block';
      }

      const container = document.querySelector(`.deck-element[data-deck-id="${newDeck.id}"] .deck-container`);
      if (container) renderDeck(container, newDeck.cards);

      newDeckInput.value = '';
      addToNewDeckButton.textContent = 'Add to New Deck';

      if (!hadNoDecks && decksSelect) {
        renderExistingDecks();
        if (previouslySelectedDeckId) {
          decksSelect.value = previouslySelectedDeckId;
          decksSelect.dispatchEvent(new Event('change'));
        }
      }
    });
  }

  // ---- Open Modal ----
  function openModal(cardData) {
    currentCard = cardData;
    existingDeckQty = 1;
    newDeckQty = 1;
    existingDeckStepper.updateValue(1);
    newDeckStepper.updateValue(1);

    if (addToSelectedDeckButton) addToSelectedDeckButton.textContent = 'Add to Deck';
    if (existingDecksSuccessMsg) existingDecksSuccessMsg.style.display = 'none';
    if (newDeckSuccessMsg) newDeckSuccessMsg.style.display = 'none';
    if (newDeckInput) newDeckInput.value = '';

    renderExistingDecks();
    openSharedModal();
  }

  return { openModal, closeModal };
}

