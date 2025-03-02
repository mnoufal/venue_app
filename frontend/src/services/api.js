import axios from 'axios';

// Create axios instance with defaults
const api = axios.create({
baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    if (tokens && tokens.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 (Unauthorized) and not a retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Get the refresh token
        const tokens = JSON.parse(localStorage.getItem('tokens'));
        if (!tokens || !tokens.refreshToken) {
          throw new Error('No refresh token available');
        }
        
        // Try to refresh the token
        const response = await axios.post('http://localhost:5000/api/v1/auth/refresh-token', {
          refreshToken: tokens.refreshToken
        });
        
        const { tokens: newTokens } = response.data.data;
        
        // Update tokens in localStorage
        localStorage.setItem('tokens', JSON.stringify(newTokens));
        
        // Update the authorization header
        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear auth data and redirect to login
        localStorage.removeItem('user');
        localStorage.removeItem('tokens');
        
        // Force page reload to reset app state
        window.location.href = '/login';
        
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;