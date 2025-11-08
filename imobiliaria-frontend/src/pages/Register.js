import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerService } from '../services/auth';

const Register = () => {
  const [nome, setNome] = useState('');  // ← NOVO CAMPO
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [perfil, setPerfil] = useState('usuario');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validações
    if (senha !== confirmSenha) {
      setError('As senhas não coincidem');
      return;
    }

    if (senha.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      await registerService(nome, email, senha, perfil);  // ← Passa o nome também
      setSuccess('Usuário registrado com sucesso! Redirecionando...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Erro ao registrar usuário. Email já pode estar em uso.');
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
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Registro</h2>
      
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

      {success && (
        <div style={{ 
          backgroundColor: '#efe', 
          color: '#0a0', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '15px',
          textAlign: 'center'
        }}>
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* ← NOVO CAMPO NOME */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Nome:
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
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
        
        <div style={{ marginBottom: '15px' }}>
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

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Confirmar Senha:
          </label>
          <input
            type="password"
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
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
            Tipo de Conta:
          </label>
          <select
            value={perfil}
            onChange={(e) => setPerfil(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            <option value="usuario">Usuário</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: loading ? '#95a5a6' : '#2ecc71',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Já tem conta? <Link to="/login">Faça login</Link>
      </p>
    </div>
  );
};

export default Register;
