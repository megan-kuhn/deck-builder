// js/src/auth/login.js

import { setUser } from "../state/userState.js";
import updateAuthUI from "../ui/updateAuthUI.js";

const loginForm = document.getElementById('login-form');
const message = document.getElementById('message'); // optional <p> for feedback

if (loginForm) {
  console.log("Login form found, setting up submit handler");
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

      if (res.ok) {
        // ✅ Wait for server data so we store validated info
        const userData = await res.json().catch(() => ({ username }));

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        updateAuthUI();

        if (typeof closeModal === 'function') closeModal();

        if (message) {
          message.textContent = 'Login successful!';
          message.style.color = 'green';
        }

        alert('Login successful!');

      } else {
        const errText = await res.text();
        if (message) {
          message.textContent = errText;
          message.style.color = 'red';
        } else {
          alert(errText);
        }
      }
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
