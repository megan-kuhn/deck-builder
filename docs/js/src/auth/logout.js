// js/src/auth/logout.js

import { clearUser } from "../state/userState.js";
import updateAuthUI from "../ui/updateAuthUI.js";

// Log out the current user
export function logout() {
  console.log("Logging out user");
  clearUser();
  localStorage.removeItem("user");
  updateAuthUI(); // update buttons immediately
}
