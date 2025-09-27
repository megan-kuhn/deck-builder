// js/src/components/card.js

import { attachAddToDeckHandler } from '../ui/addToDeckHandler.js';

// Base function that renders the visual part of a card
export function createCardElement(cardData) {
  const cardEl = document.createElement('div');
  cardEl.classList.add('card');

  cardEl.innerHTML = `
    <h3 class="card__heading">${cardData.name}</h3>
    <img class="card__image" src="${cardData.image_uris?.normal || ''}" alt="${cardData.name}" />
  `;

  return cardEl;
}

// Main function to render a card with buttons
export function renderCard(cardData) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('single-card-container');
  wrapper.dataset.cardId = cardData.id; // optional, useful for tracking

  const cardEl = createCardElement(cardData);

  // Detail View button
  const viewDetailsButton = document.createElement('button');
  viewDetailsButton.classList.add('button--detail-view');
  viewDetailsButton.textContent = 'View Details';
  viewDetailsButton._cardData = cardData;

  // Add to deck button
  const addToDeckButton = document.createElement('button');
  addToDeckButton.classList.add('button--add-to-deck');
  addToDeckButton.textContent = 'Add to Deck';
  
  attachAddToDeckHandler(addToDeckButton, cardData);

  // Append everything
  wrapper.appendChild(cardEl);
  wrapper.appendChild(viewDetailsButton);
  wrapper.appendChild(addToDeckButton);

  return wrapper;
}

