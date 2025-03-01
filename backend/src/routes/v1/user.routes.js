// backend/src/routes/v1/user.routes.js
const express = require('express');
const { authenticate, authorize } = require('../../middleware/auth.middleware');
const userController = require('../../controllers/user.controller');
const { ROLES } = require('../../config/constants');

const router = express.Router();

// Get user profile - protected route
router.get(
  '/profile',
  authenticate,
  userController.getProfile
);

// Admin only route example
router.get(
  '/admin-only',
  authenticate,
  authorize(ROLES.SUPER_ADMIN),
  (req, res) => {
    return res.json({ message: 'Admin access granted' });
  }
);

module.exports = router;