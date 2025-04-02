const express = require('express');
const path = require('path');

// Create express application
const app = express();
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = path.join(__dirname, 'docs');

// Serve static files from the docs folder
app.use(express.static(DIST_FOLDER));

// All routes serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_FOLDER, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
