// js/src/filters/renderColorFilters.js

const colors = [
  { value: 'W', label: 'White' },
  { value: 'U', label: 'Blue' },
  { value: 'B', label: 'Black' },
  { value: 'R', label: 'Red' },
  { value: 'G', label: 'Green' },
  { value: 'C', label: 'Colorless' }
];

export function initColorFilters(onChangeCallback) {
  const container = document.getElementById('color-filter');
  if (!container) return;

  container.innerHTML = '';

  colors.forEach(({ value, label }) => {
    const labelEl = document.createElement('label');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = value;
    checkbox.checked = false;

    checkbox.addEventListener('change', onChangeCallback);

    labelEl.appendChild(checkbox);
    labelEl.append(` ${label}`);

    container.appendChild(labelEl);
  });
}

