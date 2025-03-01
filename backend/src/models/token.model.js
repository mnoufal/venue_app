// backend/src/models/token.model.js
const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['refresh', 'passwordReset'],
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  usedAt: {
    type: Date,
    default: null
  },
  revokedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

const Token = mongoose.model('Token', TokenSchema);

module.exports = Token;