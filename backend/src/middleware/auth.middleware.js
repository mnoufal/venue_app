// backend/src/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { apiResponse } = require('../utils/apiResponse');

// Authenticate user with JWT
const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return apiResponse(res, 401, 'Authentication required');
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return apiResponse(res, 401, 'User not found');
    }

    if (!user.active) {
      return apiResponse(res, 403, 'User account is disabled');
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return apiResponse(res, 401, 'Invalid token');
    }
    if (error.name === 'TokenExpiredError') {
      return apiResponse(res, 401, 'Token expired');
    }
    next(error);
  }
};

// Check user roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return apiResponse(res, 401, 'Authentication required');
    }

    if (!roles.includes(req.user.role)) {
      return apiResponse(res, 403, 'Access denied');
    }

    next();
  };
};

module.exports = {
  authenticate,
  authorize
};