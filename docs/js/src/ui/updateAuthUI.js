// js/src/ui/updateAuthUI.js

import { isLoggedIn, getUser } from "../state/userState.js";

export default function updateAuthUI() {
  const loginBtn = document.querySelector("#login-modal-open-button");
  const profileLink = document.querySelector("#profile-link");

  if (!loginBtn || !profileLink) return;

  if (isLoggedIn()) {
    loginBtn.style.display = "none";
    profileLink.style.display = "inline-block";
    profileLink.textContent = `My Profile`;
    profileLink.href = `/profile.html`; // Or wherever your profile page is
  } else {
    loginBtn.style.display = "inline-block";
    profileLink.style.display = "none";
  }
}
