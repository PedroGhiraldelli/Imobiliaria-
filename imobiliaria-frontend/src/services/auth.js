import api from './api';

// Função de login
export const login = async (email, senha) => {
  try {
    console.log('Enviando para /auth/login:', { email, senha }); // DEBUG
    const response = await api.post('/auth/login', { 
      email: email,
      senha: senha
    });
    console.log('Resposta do login:', response.data); // DEBUG
    return response.data;
  } catch (error) {
    console.error('Erro no login service:', error.response || error); // DEBUG
    throw error.response?.data || 'Erro ao fazer login';
  }
};

// Função de registro
export const register = async (nome, email, senha) => {
  return await api.post('/auth/register', {
    nome,
    email,
    senhaHash: senha, // campo esperado no backend
    perfil: 'usuario' // força sempre usuario
  });
};

// Função de logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userRole');
};

// Função para decodificar token JWT
export const decodeToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    return null;
  }
};
