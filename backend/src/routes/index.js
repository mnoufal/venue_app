// backend/src/routes/index.js
const express = require('express');
const v1Routes = require('./v1');

const router = express.Router();



// API routes with versioning
router.use('/v1', v1Routes);



// Default route
router.get('/', (req, res) => {
  res.json({ message: 'Event Management API' });
});

module.exports = router;


// Add this to the existing file


// Add this line after the existing router.use line
