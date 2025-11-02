// js/features/card/ui/card.js

import { attachAddToDeckHandler } from '../handlers/addToDeckHandler.js';

// Base function that renders the visual part of a card
export function createCardElement(cardData) {
  const cardEl = document.createElement('div');
  cardEl.classList.add('card');

  cardEl.innerHTML = `
    <h3 class="card__heading visually-hidden">${cardData.name}</h3>
    <img class="card__image" src="${cardData.image_uris?.normal || ''}" alt="${cardData.name}" />
  `;

  return cardEl;
}

// Main function to render a card with buttons
export function renderCard(cardData) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('single-card-container');
  wrapper.dataset.cardId = cardData.id;

  const cardEl = createCardElement(cardData);

  // Detail View button
  const viewDetailsButton = document.createElement('button');
  viewDetailsButton.classList.add('button--detail-view');
  viewDetailsButton.textContent = 'View Details';
  viewDetailsButton._cardData = cardData;

  // Create a container div for the buttons
  const buttonRow = document.createElement('div');
  buttonRow.classList.add('card__button-row');
  buttonRow.appendChild(viewDetailsButton);

  // Append everything
  wrapper.appendChild(cardEl);
  wrapper.appendChild(buttonRow);

  return wrapper;
}


