// backend/src/middleware/validation.middleware.js
const { apiResponse } = require('../utils/apiResponse');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  
  if (error) {
    const errorMessage = error.details.map(detail => detail.message).join(', ');
    return apiResponse(res, 400, errorMessage);
  }
  
  next();
};

module.exports = { validate };