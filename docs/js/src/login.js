// js/src/login.js

import { setUser } from "./state/userState.js";
import updateAuthUI from "./ui/updateAuthUI.js";

const loginForm = document.getElementById('login-form');
const message = document.getElementById('message'); // optional, reuse the same <p id="message">

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const text = await res.text();

      if (res.ok) {
        // ✅ Store user in state + localStorage
        const userData = { username }; // minimal user object; add more fields if server sends them
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        // ✅ Update UI to hide sign-in button & show profile link
        updateAuthUI();
        console.log('User logged in:', userData);
      }

      // Show alert
      if (message) {
        message.textContent = text;
        message.style.color = res.ok ? 'green' : 'red';
      } else {
        alert(text);
      }
    } catch (err) {
      if (message) {
        message.textContent = 'Error connecting to server';
        message.style.color = 'red';
      } else {
        alert('Error connecting to server');
      }
    }
  });
}
