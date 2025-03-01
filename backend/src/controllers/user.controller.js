// backend/src/controllers/user.controller.js
const { apiResponse } = require('../utils/apiResponse');

const getProfile = async (req, res, next) => {
  try {
    return apiResponse(res, 200, 'User profile', {
      user: req.user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile
};