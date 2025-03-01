// backend/src/middleware/error.middleware.js
const logger = require('../utils/logger');
const { apiResponse } = require('../utils/apiResponse');

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return apiResponse(res, 400, 'Validation Error', { errors });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    return apiResponse(res, 400, 'Duplicate field value entered');
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return apiResponse(res, 401, 'Invalid token');
  }

  if (err.name === 'TokenExpiredError') {
    return apiResponse(res, 401, 'Token expired');
  }

  // Custom application errors
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Server Error';
  
  return apiResponse(res, statusCode, message);
};

module.exports = errorHandler;