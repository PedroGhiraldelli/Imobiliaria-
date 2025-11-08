import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={{
      textAlign: 'center',
      padding: '60px 20px',
      backgroundColor: '#f8f9fa',
      minHeight: 'calc(100vh - 60px)'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#2c3e50' }}>
        🏠 Bem-vindo à Imobiliária
      </h1>
      
      <p style={{ fontSize: '20px', color: '#7f8c8d', marginBottom: '40px' }}>
        {user 
          ? `Olá, ${user.email}! Explore nossos imóveis disponíveis.`
          : 'Encontre o imóvel dos seus sonhos'
        }
      </p>

      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {user ? (
          <>
            <Link to="/imoveis">
              <button style={{
                padding: '15px 30px',
                fontSize: '18px',
                backgroundColor: '#3498db',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                Ver Imóveis
              </button>
            </Link>
            
            {user.role === 'admin' && (
              <Link to="/dashboard">
                <button style={{
                  padding: '15px 30px',
                  fontSize: '18px',
                  backgroundColor: '#2ecc71',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}>
                  Dashboard Admin
                </button>
              </Link>
            )}
          </>
        ) : (
          <>
            <Link to="/login">
              <button style={{
                padding: '15px 30px',
                fontSize: '18px',
                backgroundColor: '#3498db',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                Fazer Login
              </button>
            </Link>
            
            <Link to="/register">
              <button style={{
                padding: '15px 30px',
                fontSize: '18px',
                backgroundColor: '#2ecc71',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                Registrar-se
              </button>
            </Link>
          </>
        )}
      </div>

      <div style={{
        marginTop: '60px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '30px',
        maxWidth: '1000px',
        margin: '60px auto 0'
      }}>
        <div style={{
          padding: '30px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#3498db', marginBottom: '10px' }}>🔍 Busque</h3>
          <p>Encontre imóveis por localização, preço e características</p>
        </div>

        <div style={{
          padding: '30px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#2ecc71', marginBottom: '10px' }}>📅 Agende</h3>
          <p>Marque visitas aos imóveis do seu interesse</p>
        </div>

        <div style={{
          padding: '30px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#e74c3c', marginBottom: '10px' }}>🏡 Realize</h3>
          <p>Encontre seu novo lar com facilidade e segurança</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
