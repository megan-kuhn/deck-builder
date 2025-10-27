// js/features/shared/ui/qtyStepper.js

export function createQtyStepper({ 
  initial = 1, 
  min = 0, 
  max = Infinity, 
  onChange = () => {} 
} = {}) {
  const container = document.createElement('div'); 
  container.classList.add('qty-stepper');

  const decrementBtn = document.createElement('button');
  decrementBtn.type = 'button';
  decrementBtn.textContent = '-';
  decrementBtn.classList.add('qty-stepper__btn', 'qty-stepper__btn--decrement');

  const valueDisplay = document.createElement('input');
  valueDisplay.type = 'number';
  valueDisplay.value = initial;
  valueDisplay.classList.add('qty-stepper__input');

  const incrementBtn = document.createElement('button');
  incrementBtn.type = 'button';
  incrementBtn.textContent = '+';
  incrementBtn.classList.add('qty-stepper__btn', 'qty-stepper__btn--increment');

  container.append(decrementBtn, valueDisplay, incrementBtn);

  function updateValue(newValue) {
    const value = Math.min(Math.max(newValue, min), max);
    valueDisplay.value = value;
    onChange(value);
  }

  decrementBtn.addEventListener('click', () => {
    updateValue(parseInt(valueDisplay.value) - 1);
  });

  incrementBtn.addEventListener('click', () => {
    updateValue(parseInt(valueDisplay.value) + 1);
  });

  valueDisplay.addEventListener('change', () => {
    updateValue(parseInt(valueDisplay.value));
  });

  return { element: container, updateValue };
}
