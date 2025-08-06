// components/card.js

import { addCardToList } from '../events/cardListEvents.js';

// Base function that renders the card visual
export function createCardElement(cardData) {
  const cardEl = document.createElement('div');
  cardEl.classList.add('card');

  cardEl.innerHTML = `
    <h3>${cardData.name}</h3>
    <img src="${cardData.image_uris?.normal || ''}" alt="${cardData.name}" />
  `;

  return cardEl;
}

// Public function that adds the button and events for the search view
export function renderCard(cardData) {
  // Create outer wrapper
  const wrapper = document.createElement('div');
  wrapper.classList.add('single-card-container');

  // Get the visual card element
  const cardEl = createCardElement(cardData);

  // Create the button
  const button = document.createElement('button');
  button.classList.add('button--addtolist');
  button.textContent = 'Add to List';
  button.addEventListener('click', () => {
    addCardToList(cardData);
  });

  // Append card and button to wrapper
  wrapper.appendChild(cardEl);
  wrapper.appendChild(button);

  return wrapper;
}
