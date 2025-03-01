// backend/src/routes/v1/index.js
const express = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');

const router = express.Router();

// Routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;