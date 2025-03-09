import React, { createContext, useState, useEffect } from 'react';

// Create the Auth Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const userIsAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (token && username) {
      setCurrentUser({ username });
      setIsAdmin(userIsAdmin);
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    setCurrentUser(userData);
    setIsAdmin(userData.isAdmin);
    
    // Store in localStorage
    localStorage.setItem('token', userData.token);
    localStorage.setItem('username', userData.username);
    localStorage.setItem('isAdmin', userData.isAdmin ? 'true' : 'false');
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!currentUser;
  };

  const value = {
    currentUser,
    isAdmin,
    login,
    logout,
    isAuthenticated,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;