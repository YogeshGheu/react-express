import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null indicates loading state

  useEffect(() => {
    
    const checkUserLoginStatus = async () => {
      try {
        const res = await fetch('/api/verify-login', { method: 'POST' });
        const response = await res.json();
        setIsLoggedIn(response.success);
      } catch (error) {
        console.log('Error Occurred! - ', error);
        setIsLoggedIn(false);
      }
    };

    checkUserLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
