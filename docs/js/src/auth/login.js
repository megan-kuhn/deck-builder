// js/src/auth/login.js
import { setUser } from "../state/userState.js";
import updateAuthUI from "../ui/updateAuthUI.js";

const loginForm = document.getElementById('login-form');
const message = document.getElementById('login-message'); // optional <p> for feedback

console.log("Login.js loaded, loginForm:", loginForm);

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Clear previous message
    if (message) {
      message.textContent = '';
      message.style.color = '';
    }

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
      if (message) {
        message.textContent = 'Please enter both username and password.';
        message.style.color = 'red';
      }
      return;
    }

    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      console.log('Login response', res.status, res.statusText);

      if (!res.ok) {
        const errText = await res.text();
        if (message) {
          message.textContent = errText;
          message.style.color = 'red';
        } else {
          alert(errText);
        }
        return; // exit early on failure
      }

      // ✅ Only proceed if login is successful
      let userData;
      try {
        userData = await res.json();
      } catch {
        userData = { username }; // fallback
      }

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      updateAuthUI();

      if (window.loginModalControls?.closeModal) {
        window.loginModalControls.closeModal();
        
        // ✅ Redirect only if we are on signup.html
        if (window.location.pathname.endsWith("signup.html")) {
          window.location.href = "/"; // or "/index.html" if that's your homepage
        }
      }

      // ✅ Only show success message once
      if (message) {
        message.textContent = 'Login successful!';
        message.style.color = 'green';
      }
      alert('Login successful!');
      console.log('User logged in:', userData);

    } catch (err) {
      console.error('Login request failed:', err);
      if (message) {
        message.textContent = 'Error connecting to server';
        message.style.color = 'red';
      } else {
        alert('Error connecting to server');
      }
    }
  });
}

