import axios from 'axios';

// Create an Axios instance with the base URL for the API
const api = axios.create({
  baseURL: 'https://meditracker-backend.onrender.com/api', // Replace this with your actual API URL if different
});

// Function to set the JWT token in the Axios headers
export const setAuthToken = (token) => {
  if (token) {
    // If the token exists, set it as the default Authorization header
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // If there's no token, remove the Authorization header
    delete api.defaults.headers.common['Authorization'];
  }
};

// Example usage: call this function to set the token when a user logs in
// setAuthToken('your_jwt_token_here');

export default api;
