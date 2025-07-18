// Load environment variables from .env.local in root directory
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '../.env.local') });

const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const basicRoutes = require("./routes/index");
const authRoutes = require("./routes/authRoutes");
const { connectDB } = require("./config/database");
const cors = require("cors");

// Check for MongoDB URI
const mongoUri = process.env.MONGODB_URI_DEV || process.env.DATABASE_URL;
if (!mongoUri) {
  console.error("Error: MONGODB_URI_DEV or DATABASE_URL environment variable missing in .env.local");
  process.exit(-1);
}

const app = express();
const port = process.env.PORT || 3000;
// Pretty-print JSON responses
app.enable('json spaces');
// We want to be consistent with URL paths, so we enable strict routing
app.enable('strict routing');

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.on("error", (error) => {
  console.error(`Server error: ${error.message}`);
  console.error(error.stack);
});

// Basic Routes
app.use(basicRoutes);
// Authentication Routes
app.use('/api/auth', authRoutes);

// If no routes handled the request, it's a 404
app.use((req, res, next) => {
  res.status(404).send("Page not found.");
});

// Error handling
app.use((err, req, res, next) => {
  console.error(`Unhandled application error: ${err.message}`);
  console.error(err.stack);
  res.status(500).send("There was an error serving your request.");
});

// Start server only after database connection is established
const startServer = async () => {
  try {
    // Wait for database connection
    await connectDB();

    // Start server only if database connection is successful
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server due to database connection error');
    process.exit(1);
  }
};

startServer();