// js/features/state/apiState.js

let nextPageUrl = null;

export function setNextPageUrl(url) {
  nextPageUrl = url;
}

export function getNextPageUrl() {
  return nextPageUrl;
}

