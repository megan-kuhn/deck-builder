// js/src/login.js
import { setUser } from "./state/userState.js";
import updateAuthUI from "./ui/updateAuthUI.js";

// Grab form and message container
const loginForm = document.getElementById('login-form');
const message = document.getElementById('message'); // optional <p> for feedback

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

      const text = await res.text();

      if (res.ok) {
        // ✅ Only update user state if login was successful
        const userData = { username }; // Add token or other server data if available
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        updateAuthUI();

        // Optional: close modal if you have a function
        if (typeof closeModal === 'function') closeModal();

        if (message) {
          message.textContent = 'Login successful!';
          message.style.color = 'green';
        }

        console.log('User logged in:', userData);
      } else {
        // Show server error message without changing state
        if (message) {
          message.textContent = text;
          message.style.color = 'red';
        } else {
          alert(text);
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
