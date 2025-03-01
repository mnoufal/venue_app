// backend/src/utils/validation.js
const Joi = require('joi');

const authValidation = {
  register: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().allow(''),
    role: Joi.string().valid('SUPER_ADMIN', 'GROUP_ADMIN', 'FRANCHISE_ADMIN', 'CUSTOMER')
  }),
  
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  
  refreshToken: Joi.object({
    refreshToken: Joi.string().required()
  })
};

module.exports = {
  authValidation
};