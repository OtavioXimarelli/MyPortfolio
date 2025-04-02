import express, { Request, Response, NextFunction } from 'express';
import { join } from 'path';
import * as fs from 'fs';

// Create express application
const app = express();
const PORT = process.env['PORT'] || 4000;
const DIST_FOLDER = join(process.cwd(), 'docs');

// Check if the app is running in production
const isProduction = process.env['NODE_ENV'] === 'production';

// Serve static files from the docs folder
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// Define the index.html path
const indexPath = join(DIST_FOLDER, 'index.html');
let indexHtml: string;

// Read the index file once when server starts to improve performance
try {
  indexHtml = fs.readFileSync(indexPath, 'utf8');
  console.log('Index file loaded successfully');
} catch (error) {
  console.error('Error reading index file:', error);
  process.exit(1);
}

// Log requests in development
app.use((req: Request, res: Response, next: NextFunction) => {
  if (!isProduction) {
    console.log(`${req.method} ${req.url}`);
  }
  next();
});

// All routes will serve the index.html file for Angular to handle
app.use('/**', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(indexHtml);
  } catch (error) {
    next(error);
  }
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Server error:', err);
  res.status(500).send('Internal Server Error');
});

// Start the server if this module is the main entry point
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Serving files from ${DIST_FOLDER}`);
  });
}

// Export the app for potential use with serverless functions
export default app;
