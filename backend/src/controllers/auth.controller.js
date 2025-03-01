// backend/src/controllers/auth.controller.js
const authService = require('../services/auth.service');
const { apiResponse } = require('../utils/apiResponse');

// Register a new user
const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    return apiResponse(res, 201, 'User registered successfully', result);
  } catch (error) {
    next(error);
  }
};

// Login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    return apiResponse(res, 200, 'Login successful', result);
  } catch (error) {
    next(error);
  }
};

// Refresh token
const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshAuth(refreshToken);
    return apiResponse(res, 200, 'Token refreshed successfully', result);
  } catch (error) {
    next(error);
  }
};

// Logout
const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    await authService.logout(refreshToken);
    return apiResponse(res, 200, 'Logged out successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout
};