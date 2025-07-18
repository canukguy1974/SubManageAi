import api from './api';

// Description: Login user functionality
// Endpoint: POST /api/auth/login
// Request: { email: string, password: string }
// Response: { accessToken: string, refreshToken: string }
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
      throw new Error('Unable to connect to server. Please check if the server is running.');
    }
    throw new Error(error?.response?.data?.message || error.message || 'Login failed');
  }
};

// Description: Register user functionality
// Endpoint: POST /api/auth/register
// Request: { email: string, password: string }
// Response: { email: string }
export const register = async (email: string, password: string) => {
  try {
    const response = await api.post('/api/auth/register', {email, password});
    return response.data;
  } catch (error) {
    console.error('Register error:', error);
    if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
      throw new Error('Unable to connect to server. Please check if the server is running.');
    }
    throw new Error(error?.response?.data?.message || error.message || 'Registration failed');
  }
};

// Description: Logout
// Endpoint: POST /api/auth/logout
// Request: {}
// Response: { success: boolean, message: string }
export const logout = async () => {
  try {
    return await api.post('/api/auth/logout');
  } catch (error) {
    if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
      throw new Error('Unable to connect to server. Please check if the server is running.');
    }
    throw new Error(error?.response?.data?.message || error.message || 'Logout failed');
  }
};