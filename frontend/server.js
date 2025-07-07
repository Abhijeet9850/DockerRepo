const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve a simple form at '/'
app.get('/', (req, res) => {
  res.send(`
    <form id="dataForm" method="POST" action="/submit">
      <label for="name">Name:</label><br/>
      <input type="text" id="name" name="name" required><br/>
      <label for="email">Email:</label><br/>
      <input type="email" id="email" name="email" required><br/><br/>
      <button type="submit">Submit</button>
    </form>
    <script>
      const form = document.getElementById('dataForm');
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
          name: form.name.value,
          email: form.email.value
        };
        try {
          const response = await fetch('/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          const result = await response.json();
          alert(JSON.stringify(result));
        } catch (err) {
          alert('Error submitting form');
        }
      });
    </script>
  `);
});

// Proxy the form submission to Flask backend
app.post('/submit', async (req, res) => {
  try {
    // Change URL to Flask backend service defined in docker-compose
    const response = await axios.post('http://backend:5000/submit', req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Backend request failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Frontend server running on http://localhost:${PORT}`);
});
