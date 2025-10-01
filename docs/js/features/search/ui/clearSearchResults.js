// js/features/search/ui/clearSearchResults.js

export function clearSearchResults(containerId = "search-results") {
  const container = document.getElementById(containerId);
  if (container) container.innerHTML = '';
}

