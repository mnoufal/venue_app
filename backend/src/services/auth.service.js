// backend/src/services/auth.service.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user.model');
const Token = require('../models/token.model');

// Generate JWT tokens
const generateTokens = async (userId) => {
  try {
    // Create access token
    const accessToken = jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRATION || '15m' }
    );

    // Create refresh token
    const refreshToken = crypto.randomBytes(40).toString('hex');
    
    // Calculate expiration (e.g., 7 days)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Save refresh token in DB
    await Token.create({
      userId,
      token: refreshToken,
      type: 'refresh',
      expiresAt
    });

    return {
      accessToken,
      refreshToken
    };
  } catch (error) {
    throw new Error('Error generating tokens');
  }
};

// Register a new user
const register = async (userData) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Create new user
    const user = await User.create(userData);
    
    // Generate tokens
    const tokens = await generateTokens(user._id);
    
    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      tokens
    };
  } catch (error) {
    throw error;
  }
};

// Login user
const login = async (email, password) => {
  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check if user is active
    if (!user.active) {
      throw new Error('Account is disabled');
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      throw new Error('Invalid email or password');
    }

    // Generate tokens
    const tokens = await generateTokens(user._id);
    
    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        firstTimeLogin: user.firstTimeLogin
      },
      tokens
    };
  } catch (error) {
    throw error;
  }
};

// Refresh token
const refreshAuth = async (refreshToken) => {
  try {
    // Find token in database
    const tokenDoc = await Token.findOne({
      token: refreshToken,
      type: 'refresh',
      expiresAt: { $gt: new Date() },
      revokedAt: null
    });

    if (!tokenDoc) {
      throw new Error('Invalid or expired refresh token');
    }

    // Get user
    const user = await User.findById(tokenDoc.userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.active) {
      throw new Error('User account is inactive');
    }

    // Generate new tokens
    const tokens = await generateTokens(user._id);
    
    // Revoke old refresh token
    await Token.findByIdAndUpdate(tokenDoc._id, {
      revokedAt: new Date()
    });

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      tokens
    };
  } catch (error) {
    throw error;
  }
};

// Logout
const logout = async (refreshToken) => {
  try {
    // Revoke refresh token
    const result = await Token.findOneAndUpdate(
      { token: refreshToken, type: 'refresh', revokedAt: null },
      { revokedAt: new Date() }
    );
    
    return !!result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  register,
  login,
  refreshAuth,
  logout,
  generateTokens
};