const express = require('express');
const path = require('path');
const fs = require('fs');

// Create express application
const app = express();
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = path.join(__dirname, 'docs');

// Serve static files from the docs folder
app.use(express.static(DIST_FOLDER));

// All routes serve the index.html file
app.get('*', (req, res) => {
  const indexPath = path.join(DIST_FOLDER, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.status(404).send('index.html file not found');
      } else {
        res.status(500).send('Error accessing index.html file');
      }
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
