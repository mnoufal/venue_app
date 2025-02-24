const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
// TODO: Add your API routes here

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});