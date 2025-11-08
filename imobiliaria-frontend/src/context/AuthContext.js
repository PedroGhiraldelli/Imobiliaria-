import React, { createContext, useState, useEffect } from 'react';
import { logout as logoutService } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um usuário logado ao carregar a aplicação
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');
    const role = localStorage.getItem('userRole');
    
    if (token && email) {
      setUser({ email, role, token });
    }
    setLoading(false);
  }, []);

  const login = (token, email, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userRole', role);
    setUser({ email, role, token });
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
