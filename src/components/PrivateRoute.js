import React from 'react';
import { Navigate } from 'react-router-dom';

// This will be a wrapper for protected routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  // If there's no token, redirect to login
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
