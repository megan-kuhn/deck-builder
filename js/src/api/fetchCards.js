// src/api/fetchCards.js

export async function fetchCards(queryOrUrl = 'game:paper') {
  let url;

  if (typeof queryOrUrl === 'string' && queryOrUrl.startsWith('http')) {
    url = queryOrUrl;
  } else {
    url = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(queryOrUrl)}&order=name&unique=cards`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.data) {
      console.error('Scryfall API error:', data);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Fetch error:', err);
    return null;
  }
}
