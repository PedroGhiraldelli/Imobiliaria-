import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ 
          color: '#fff', 
          textDecoration: 'none',
          fontSize: '20px',
          fontWeight: 'bold'
        }}>
          🏠 Imobiliária
        </Link>
        
        {user && (
          <>
            <Link to="/imoveis" style={{ color: '#fff', textDecoration: 'none' }}>
              Imóveis
            </Link>
            
            {user.role === 'admin' && (
              <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>
                Dashboard Admin
              </Link>
            )}
          </>
        )}
      </div>

      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ color: '#fff' }}>
              Olá, {user.email} ({user.role})
            </span>
            <button 
              onClick={handleLogout}
              style={{
                backgroundColor: '#e74c3c',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>
              Login
            </Link>
            <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>
              Registrar
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
