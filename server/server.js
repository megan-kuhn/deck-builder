// server/server.js

const express = require('express');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = new sqlite3.Database(path.join(__dirname, 'users.db'));

// --------------------------- 
// 1️⃣ Middleware
// ---------------------------

// Parse JSON bodies
app.use(bodyParser.json());

// Serve JS files from root js folder
app.use('/js', express.static(path.join(__dirname, '../js')));

// Serve static frontend files (CSS, images, etc.) from public
app.use(express.static(path.join(__dirname, '../public')));

// ---------------------------
// 2️⃣ Database setup
// ---------------------------
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT,
  email TEXT
)`);

// ---------------------------
// 3️⃣ API routes
// ---------------------------

// Register endpoint
app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).send("Missing username, password, or email");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // First, check if the username already exists
    db.get(
      `SELECT * FROM users WHERE username = ?`,
      [username],
      (err, row) => {
        if (err) {
          return res.status(500).send("Database error");
        }

        if (row) {
          // User already exists
          return res.status(400).send("Username already taken");
        }

        // Insert new user if not found
        db.run(
          `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`,
          [username, hashedPassword, email],
          function(err) {
            if (err) {
              console.error("SQLite insert error:", err); // <-- log the real error
              return res.status(500).send("Database error while inserting user");
            }
            res.status(201).send("User registered successfully");
          }
        );

      }
    );
  } catch (err) {
    res.status(500).send("Error hashing password");
  }
});


// ---------------------------
// 4️⃣ Frontend routes
// ---------------------------

// Root route serves index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Explicit route for signup.html
app.get('/signup.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/signup.html'));
});

// ---------------------------
// 5️⃣ Start server
// ---------------------------
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});