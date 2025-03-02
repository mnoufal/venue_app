import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create auth context
const AuthContext = createContext(null);

// Auth provider component
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [tokens, setTokens] = useState(null);
    const [loading, setLoading] = useState(true);
  
    // Your existing AuthProvider code...
      // Initialize auth state from localStorage on component mount
      useEffect(() => {
          const storedUser = localStorage.getItem('user');
          const storedTokens = localStorage.getItem('tokens');
          
          if (storedUser && storedTokens) {
            setCurrentUser(JSON.parse(storedUser));
            setTokens(JSON.parse(storedTokens));
            
            // Set up axios interceptor with the stored token
            setupAxiosInterceptors(JSON.parse(storedTokens).accessToken);
          }
          
          setLoading(false);
        }, []);
      
        // Set up axios defaults and interceptors
        const setupAxiosInterceptors = (accessToken) => {
          // Set base URL
          axios.defaults.baseURL = 'http://localhost:5000/api/v1';
          
          // Set default headers
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          
          // Add response interceptor for handling token refresh
          axios.interceptors.response.use(
            (response) => response,
            async (error) => {
              const originalRequest = error.config;
              
              // If error is 401 and not a retry
              if (error.response.status === 401 && !originalRequest._retry && tokens) {
                originalRequest._retry = true;
                
                try {
                  // Try to refresh the token
                  const response = await axios.post('/auth/refresh-token', {
                    refreshToken: tokens.refreshToken
                  });
                  
                  const { tokens: newTokens } = response.data.data;
                  
                  // Update tokens in state and localStorage
                  setTokens(newTokens);
                  localStorage.setItem('tokens', JSON.stringify(newTokens));
                  
                  // Update the authorization header
                  axios.defaults.headers.common['Authorization'] = `Bearer ${newTokens.accessToken}`;
                  originalRequest.headers['Authorization'] = `Bearer ${newTokens.accessToken}`;
                  
                  // Retry the original request
                  return axios(originalRequest);
                } catch (refreshError) {
                  // If refresh fails, log out the user
                  logout();
                  return Promise.reject(refreshError);
                }
              }
              
              return Promise.reject(error);
            }
          );
        };
      
        // Register a new user
        const register = async (userData) => {
          const response = await axios.post('/auth/register', userData);
          const { user, tokens } = response.data.data;
          
          // Save user and tokens
          setCurrentUser(user);
          setTokens(tokens);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('tokens', JSON.stringify(tokens));
          
          // Set up axios interceptors with the new token
          setupAxiosInterceptors(tokens.accessToken);
          
          return response.data;
        };
      
        // Log in a user
        const login = async (email, password) => {
          const response = await axios.post('/auth/login', { email, password });
          const { user, tokens } = response.data.data;
          
          // Save user and tokens
          setCurrentUser(user);
          setTokens(tokens);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('tokens', JSON.stringify(tokens));
          
          // Set up axios interceptors with the new token
          setupAxiosInterceptors(tokens.accessToken);
          
          return response.data;
        };
      
        // Log out a user
        const logout = async () => {
          try {
            if (tokens) {
              // Call the logout endpoint
              await axios.post('/auth/logout', { refreshToken: tokens.refreshToken });
            }
          } catch (error) {
            console.error('Logout error:', error);
          } finally {
            // Clear user data regardless of API call result
            setCurrentUser(null);
            setTokens(null);
            localStorage.removeItem('user');
            localStorage.removeItem('tokens');
            
            // Remove Authorization header
            delete axios.defaults.headers.common['Authorization'];
          }
        };
      
        // Update user profile
        const updateProfile = async (userData) => {
          const response = await axios.put('/users/profile', userData);
          const updatedUser = response.data.data.user;
          
          // Update user in state and localStorage
          setCurrentUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          
          return response.data;
        };
      
        // Check if user is authenticated
        const isAuthenticated = () => {
          return !!currentUser && !!tokens;
        };
    // Context value
    const value = {
      currentUser,
      loading,
      register,
      login,
      logout,
      updateProfile,
      isAuthenticated
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// No default export, just named exports