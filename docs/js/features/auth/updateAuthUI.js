// js/features/auth/updateAuthUI.js

import { isLoggedIn, getUser } from "../state/userState.js";

export default function updateAuthUI() {
  const loginBtn = document.querySelector("#login-modal-open-button");
  const logoutBtn = document.querySelector("#logout-button"); // optional button
  const profileLink = document.querySelector("#profile-link");

  const user = getUser();

  if (!loginBtn || !profileLink) return;

  if (isLoggedIn()) {
    loginBtn.style.display = "none";
    profileLink.style.display = "flex";
    profileLink.textContent = `My Profile`;

    if (logoutBtn) logoutBtn.style.display = "flex";
  } else {
    loginBtn.style.display = "flex";
    profileLink.style.display = "none";

    if (logoutBtn) logoutBtn.style.display = "none";
  }
}