// js/src/auth/auth.js

import { setUser, clearUser } from "../state/userState.js";
import updateAuthUI from "../ui/updateAuthUI.js";

// Log in a user
export function login(username) {
  setUser({ username });
  localStorage.setItem("user", JSON.stringify({ username }));
  updateAuthUI(); // update buttons immediately
}

// Log out the current user
export function logout() {
  console.log("Logging out user");
  clearUser();
  localStorage.removeItem("user");
  updateAuthUI(); // update buttons immediately
}
