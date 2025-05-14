import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [me, setMe] = useState({});

  useEffect(() => {
    // Retrieve token from localStorage (or other secure storage mechanisms) when the app loads
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (newToken) => {
    // Save token to localStorage
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    setToken(null);
  };

  return <AuthContext.Provider value={{ token, me, setMe, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
