// Single source of truth for all user-related data
let currentUser = {
  username: null,
  authToken: null,
  decks: [],
  preferences: {}
};

// --- SETTERS / MUTATORS ---
export function setUser(user) {
  currentUser = { ...currentUser, ...user };
}

export function clearUser() {
  currentUser = {
    username: null,
    authToken: null,
    decks: [],
    preferences: {}
  };
  localStorage.removeItem("user"); // remove stored user
}

export function setDecks(decks) {
  if (!Array.isArray(decks)) return;
  currentUser.decks = decks;
}

export function addDeck(deck) {
  if (!deck || typeof deck !== "object") return;
  currentUser.decks.push(deck);
}

export function setPreferences(prefs) {
  if (!prefs || typeof prefs !== "object") return;
  currentUser.preferences = { ...currentUser.preferences, ...prefs };
}

// --- GETTERS ---
export function getUser() {
  return { ...currentUser }; // return a copy
}

export function isLoggedIn() {
  return currentUser.username !== null;
}

// --- LOCAL STORAGE RESTORE ---
const savedUser = localStorage.getItem("user");
if (savedUser) {
  try {
    currentUser = { ...currentUser, ...JSON.parse(savedUser) };
    console.log("Restored user from localStorage:", currentUser);
  } catch (err) {
    console.error("Failed to parse user from localStorage:", err);
  }
}
