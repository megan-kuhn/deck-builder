// js/features/auth/bootstrapAuth.js

import { logout } from "./logout.js";
import updateAuthUI from "./ui/updateAuthUI.js";
import { setupModal } from "../shared/ui/modal.js";
import { initLogin } from "./login.js";
import { initSignup } from "./signup.js"; 
import { setupAuthFormToggle } from "./ui/toggleAuthForms.js";

export function initAuth() {
  // --- Update auth UI immediately ---
  updateAuthUI();

  // --- Initialize login and signup ---
  initLogin();
  initSignup();

  // --- Setup the toggle between login/signup forms ---
  setupAuthFormToggle();

  // --- Logout button ---
  const logoutBtn = document.querySelector("#logout-button");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => logout());
  }

  // --- Login modal ---
  window.loginModalControls = setupModal({
    openButtonId: 'login-modal-open-button',
    modalId: 'login-modal',
    closeButtonId: 'login-modal-close-button'
  });
}
