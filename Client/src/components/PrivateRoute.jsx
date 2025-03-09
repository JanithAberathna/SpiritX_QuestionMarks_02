import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Import from root src directory

const PrivateRoute = ({ children, requiredRole }) => {
  const { currentUser, isAdmin, loading } = useContext(AuthContext);
  const location = useLocation();
  
  // If still loading auth state, show nothing or a loader
  if (loading) {
    return <div>Loading...</div>;
  }
  
  // If not authenticated, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // If role is required and user doesn't have it, redirect to appropriate page
  if (requiredRole === 'admin' && !isAdmin) {
    return <Navigate to="/user" replace />;
  }
  
  if (requiredRole === 'user' && isAdmin) {
    return <Navigate to="/admin" replace />;
  }
  
  // If user is authenticated and has proper role, render the protected route
  return children;
};

export default PrivateRoute;