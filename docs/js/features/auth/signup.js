// docs/js/features/auth/signup.js

export function initSignup() {
  const form = document.getElementById('signup-form');

  if (!form) return; // <-- exit if no form on this page

  const message = document.getElementById('signup-message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('signup-email').value;
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    try {
      const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });

      const text = await res.text();
      message.textContent = text;
      message.style.color = res.ok ? 'green' : 'red';
    } catch (err) {
      message.textContent = 'Error connecting to server.';
      message.style.color = 'red';
    }
  });
}
