import { isLoggedIn, getUser } from "../state/userState.js";

export default function updateAuthUI() {
  const loginBtn = document.querySelector("#login-modal-open-button");
  const logoutBtn = document.querySelector("#logout-button"); // optional button
  const profileLink = document.querySelector("#profile-link");

  const user = getUser();
  console.log("Updating auth UI, current user:", user);

  if (!loginBtn || !profileLink) return;

  if (isLoggedIn()) {
    loginBtn.style.display = "none";
    profileLink.style.display = "inline-block";
    profileLink.textContent = `My Profile`;

    if (logoutBtn) logoutBtn.style.display = "inline-block";
  } else {
    loginBtn.style.display = "inline-block";
    profileLink.style.display = "none";

    if (logoutBtn) logoutBtn.style.display = "none";
  }
}
