import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import ImovelList from './pages/ImovelList';
import AdminDashboard from './pages/AdminDashboard';
import ContatoPage from './pages/ContatoPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {/* Cabeçalho fixo em todas as páginas */}
          <Header />
          <div style={{ minHeight: 'calc(100vh - 72px)' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contato" element={<ContatoPage />} />
              {/* Rotas protegidas - autenticação obrigatória */}
              <Route 
                path="/imoveis" 
                element={
                  <ProtectedRoute>
                    <ImovelList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              {/* Rota padrão - redireciona para homepage */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
