const express = require('express');
const path = require('path');
<<<<<<< HEAD
const fs = require('fs');
=======
>>>>>>> origin/Production

// Create express application
const app = express();
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = path.join(__dirname, 'docs');

// Serve static files from the docs folder
app.use(express.static(DIST_FOLDER));

// All routes serve the index.html file
app.get('*', (req, res) => {
<<<<<<< HEAD
  const indexPath = path.join(DIST_FOLDER, 'index.html');
  res.sendFile(indexPath);
=======
  res.sendFile(path.join(DIST_FOLDER, 'index.html'));
>>>>>>> origin/Production
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
