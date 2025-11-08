import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login as loginService, decodeToken } from '../services/auth';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Tentando login com:', { email, senha }); // DEBUG
      const data = await loginService(email, senha);
      console.log('Resposta do backend:', data); // DEBUG
      
      // Decodificar o token JWT para pegar o role
      const payload = decodeToken(data.token);
      console.log('Payload do token:', payload); // DEBUG
      const role = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      
      login(data.token, email, role);
      navigate('/');
    } catch (err) {
      console.error('Erro no login:', err); // DEBUG
      setError('Email ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '80px auto', 
      padding: '30px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      backgroundColor: '#fff'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
      
      {error && (
        <div style={{ 
          backgroundColor: '#fee', 
          color: '#c00', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '15px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Senha:
          </label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: loading ? '#95a5a6' : '#3498db',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Não tem conta? <Link to="/register">Registre-se</Link>
      </p>
    </div>
  );
};

export default Login;
