
// docs/js/s../initProfilePage.js

import { renderProfilePage } from "./renderProfilePage.js";

export const initProfilePage = () => {
  const profileContainer = document.getElementById("profile-container");
  if (profileContainer) {
    renderProfilePage();
  }
};
