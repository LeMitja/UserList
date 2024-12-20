// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Enable CORS for cross-origin requests
app.use(cors());
app.use(bodyParser.json());

// In-memory users data
let users = [
  { id: 1, name: 'John Doe', gender: 'male', email: 'john@example.com', phone: '1234567890' },
  { id: 2, name: 'Jane Smith', gender: 'female', email: 'jane@example.com', phone: '9876543210' }
];

// Route to get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Route to add a new user
app.post('/api/users', (req, res) => {
  const newUser = req.body;

  // Generate a new id for the user (incremental)
  newUser.id = users.length + 1;

  // Push the new user to the users array
  users.push(newUser);

  // Send back the newly created user
  res.status(201).json(newUser);
});

// Route to delete a user
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  // Filter out the user by id
  users = users.filter(user => user.id !== userId);

  res.status(200).send();
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
