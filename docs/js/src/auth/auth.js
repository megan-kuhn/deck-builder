import { setUser, clearUser } from "../state/userState.js";
import updateAuthUI from "../ui/updateAuthUI.js";

// Log in the user
export function login(userData) {
  setUser(userData);
  localStorage.setItem("user", JSON.stringify(userData));
  console.log("User logged in:", userData);
  updateAuthUI();
}

// Log out the user
export function logout() {
  clearUser();
  localStorage.removeItem("user");
  console.log("User logged out");
  updateAuthUI();
}
