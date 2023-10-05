// Import the pets array from data.js
const pets = require('./data');

// Initialize the Express app
const express = require('express');
const app = express();

const PORT = 8080;

app.use(express.static('public'));

// GET - / - returns homepage
app.get('/', (req, res) => {
  // Serve up the public folder as a static index.html file
  res.sendFile(__dirname + '/public/index.html');
});

// Hello World route
app.get('/api', (req, res) => {
  res.send('Hello World!');
});

// Get all pets from the database
app.get('/api/v1/pets', (req, res) => {
  // Send the pets array as a JSON response
  res.json(pets);
});

// Get two pets owned by an owner with a query string
app.get('/api/v1/pets/owner', (req, res) => {
  // Get the owner from the query string
  const owner = req.query.owner;

  // Filter the pets array to find all pets owned by the specified owner
  const petsByOwner = pets.filter(pet => pet.owner === owner);

  // Get the first two pets owned by the specified owner
  const twoPets = petsByOwner.slice(0, 2);

  if (twoPets.length > 0) {
    res.json(twoPets);
  } else {
    res.status(404).json({ error: 'No pets found for this owner' });
  }
});

// Get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
  const name = req.params.name;

  // Find the pet in the pets array
  const pet = pets.find(pet => pet.name === name);

  if (pet) {
    res.json(pet);
  } else {
    res.status(404).json({ error: 'Pet not found' });
  }
});

app.listen(PORT, () => {
  console.log('Server is listening on port ' + PORT);
});

module.exports = app;
