// js/src/api/updateState.js

import { setNextPageUrl } from '../state/apiState.js'; 
import { setCards } from '../state/dataState.js';

export function updateStateFromApiResponse(data) {
  if (!data) return false;

  setNextPageUrl(data.has_more ? data.next_page : null);
  setCards(data.data || []);

  return true;
}

