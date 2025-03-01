// backend/src/utils/apiResponse.js
const apiResponse = (res, statusCode, message, data = null) => {
    const response = {
      success: statusCode < 400,
      message,
      ...(data && { data })
    };
  
    return res.status(statusCode).json(response);
  };
  
  module.exports = { apiResponse };