// js/features/auth/bootstrapAuth.js

import { logout } from "./logout.js";
import updateAuthUI from "./updateAuthUI.js";
import { setupModal } from "../shared/ui/modal.js";
import { initLogin } from "./login.js";
import { initSignup } from "./signup.js"; 

export function initAuth() {
  // --- Update auth UI immediately ---
  updateAuthUI();

  // --- Initialize login and signup ---
  initLogin();
  initSignup();

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
