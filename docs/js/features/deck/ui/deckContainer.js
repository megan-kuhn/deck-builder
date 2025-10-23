// js/features/deck/ui/deckContainer.js

import { createCardElement } from '../../card/ui/card.js';
import { createQtyStepper } from '../../shared/ui/qtyStepper.js';
import { getActiveDeck } from '../data/deckList.js';
import { updateCardQty } from '../data/deck.js';

export function renderDeck(container, cards, limit = 100) {
  if (!container) return;

  container.innerHTML = '';

  if (!cards || cards.length === 0) {
    container.textContent = 'No cards added yet.';
    return;
  }

  cards.slice(0, limit).forEach(card => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('single-card-container');

    const cardEl = createCardElement(card);

    const qtyStepper = createQtyStepper({
      initial: card.quantity,
      onChange: (newQty) => { 
        const deck = getActiveDeck();
        updateCardQty(deck, card.id, newQty);

        // Optional: handle removing from deck if 0
        if (newQty <= 0) {
          deck.cards = deck.cards.filter(c => c.id !== card.id);
          renderDeck(container, deck.cards);
        }
      },
    });

    const quantity = document.createElement('div');
    quantity.classList.add('card__qty-container');
    quantity.appendChild(qtyStepper.element);

    wrapper.appendChild(cardEl);
    wrapper.appendChild(qtyStepper.element);
    container.appendChild(wrapper);
  });
}
