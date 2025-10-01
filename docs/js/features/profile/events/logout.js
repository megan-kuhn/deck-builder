import { login, logout } from "./src/auth/logout.js";

document.addEventListener("DOMContentLoaded", async () => {
  // existing initialization code...
  
  const loginBtn = document.querySelector("#login-modal-open-button");
  const logoutBtn = document.querySelector("#logout-button"); // add a logout button to your HTML
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      // For testing, just log in as "megan"
      login("megan");
    });
  }
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => logout());
  }
});

