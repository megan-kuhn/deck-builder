// src/filters/getSelectedColors.js

export function getSelectedColors() {
  const checkboxes = document.querySelectorAll('#color-filter input[type="checkbox"]');
  return Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value)
    .sort();
}
