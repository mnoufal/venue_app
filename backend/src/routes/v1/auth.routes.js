// backend/src/routes/v1/auth.routes.js
const express = require('express');
const { validate } = require('../../middleware/validation.middleware');
const authController = require('../../controllers/auth.controller');
const { authValidation } = require('../../utils/validation');

const router = express.Router();

// Register
router.post(
  '/register',
  validate(authValidation.register),
  authController.register
);

// Login
router.post(
  '/login',
  validate(authValidation.login),
  authController.login
);

// Refresh token
router.post(
  '/refresh-token',
  validate(authValidation.refreshToken),
  authController.refreshToken
);

// Logout
router.post(
  '/logout',
  validate(authValidation.refreshToken),
  authController.logout
);

module.exports = router;