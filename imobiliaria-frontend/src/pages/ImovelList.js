import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const ImovelList = () => {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchImoveis();
  }, []);

  const fetchImoveis = async () => {
    try {
      const response = await api.get('/imovel');
      setImoveis(response.data);
    } catch (error) {
      console.error('Erro ao buscar imóveis:', error);
      setError('Erro ao carregar imóveis. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleAgendarVisita = async (imovelId) => {
    if (user.role !== 'usuario') {
      alert('Apenas usuários podem agendar visitas');
      return;
    }

    try {
      await api.post(`/imovel/${imovelId}/agendar`);
      alert('Visita agendada com sucesso!');
    } catch (error) {
      console.error('Erro ao agendar visita:', error);
      alert('Erro ao agendar visita');
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '80vh' 
      }}>
        <p style={{ fontSize: '20px', color: '#7f8c8d' }}>Carregando imóveis...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        color: '#e74c3c' 
      }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '30px', color: '#2c3e50' }}>
        Imóveis Disponíveis ({imoveis.length})
      </h2>
      
      {imoveis.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#7f8c8d', fontSize: '18px' }}>
          Nenhum imóvel cadastrado ainda.
        </p>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '25px' 
        }}>
          {imoveis.map((imovel) => (
            <div 
              key={imovel.id} 
              style={{ 
                border: '1px solid #ddd', 
                padding: '20px', 
                borderRadius: '8px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <h3 style={{ 
                color: '#2c3e50', 
                marginBottom: '10px',
                fontSize: '18px'
              }}>
                📍 {imovel.endereco}
              </h3>
              
              <div style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '15px', 
                borderRadius: '4px',
                marginBottom: '15px'
              }}>
                <p style={{ margin: '5px 0' }}>
                  <strong>💰 Preço:</strong> R$ {imovel.preco.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </p>
                <p style={{ margin: '5px 0' }}>
                  <strong>📐 Área:</strong> {imovel.area} m²
                </p>
                <p style={{ margin: '5px 0' }}>
                  <strong>🛏️ Quartos:</strong> {imovel.numeroQuartos}
                </p>
                <p style={{ margin: '5px 0' }}>
                  <strong>🚿 Banheiros:</strong> {imovel.numeroBanheiros}
                </p>
                <p style={{ margin: '5px 0' }}>
                  <strong>🚗 Garagem:</strong> {imovel.temGaragem ? 'Sim' : 'Não'}
                </p>
              </div>
              
              {imovel.descricao && (
                <p style={{ 
                  color: '#7f8c8d', 
                  fontSize: '14px',
                  marginBottom: '15px',
                  lineHeight: '1.5'
                }}>
                  {imovel.descricao}
                </p>
              )}

              {user && user.role === 'usuario' && (
                <button
                  onClick={() => handleAgendarVisita(imovel.id)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#3498db',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}
                >
                  📅 Agendar Visita
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImovelList;
