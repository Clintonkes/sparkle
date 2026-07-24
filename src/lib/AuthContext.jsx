import React, { createContext, useState, useContext, useEffect } from 'react';
import { extractErrorMessage } from '@/lib/apiError';

const API_URL = import.meta.env.VITE_API_URL || '';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('aveness_admin_token'));
  // Trust a stored token immediately so a page refresh never drops the
  // admin back to the login screen while we're re-verifying in the
  // background. Only an explicit 401 from the server clears it.
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('aveness_admin_token'));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setAdmin({ role: 'admin' });
      verifyToken();
    }
  }, []);

  const verifyToken = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        logout();
      }
      // Any other outcome (200, a transient 5xx, or a network error) is
      // left alone — the stored token stays valid until the server
      // explicitly rejects it.
    } catch {
      // Network blip: don't sign the admin out over it.
    }
  };

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(extractErrorMessage(err.detail, 'Login failed'));
    }
    const data = await res.json();
    localStorage.setItem('aveness_admin_token', data.access_token);
    setToken(data.access_token);
    setIsAuthenticated(true);
    setAdmin({ role: 'admin' });
    return data;
  };

  const logout = () => {
    localStorage.removeItem('aveness_admin_token');
    setToken(null);
    setIsAuthenticated(false);
    setAdmin(null);
  };

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  return (
    <AuthContext.Provider value={{ admin, isAuthenticated, isLoading, login, logout, authHeaders }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export { API_URL };
