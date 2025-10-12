export function setupAuthFormToggle() {
  const loginForm = document.getElementById("login-section");
  const signupForm = document.getElementById("signup-section");
  const switchToSignup = document.querySelector(".switch-to-signup");
  const switchToLogin = document.querySelector(".switch-to-login");

  if (!loginForm || !signupForm) return;

  switchToSignup?.addEventListener("click", () => {
    loginForm.classList.remove("active");
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
    signupForm.classList.add("active");
  });

  switchToLogin?.addEventListener("click", () => {
    signupForm.classList.remove("active");
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
    loginForm.classList.add("active");
  });
}
