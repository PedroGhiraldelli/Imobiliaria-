import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const FOTO_PLACEHOLDER = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=440&q=80";

const ImovelList = () => {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get('/imovel')
      .then(response => setImoveis(response.data))
      .catch(() => setError('Erro ao carregar imóveis.'))
      .finally(() => setLoading(false));
  }, []);

  const handleAgendarVisita = async (imovelId) => {
    if (user && user.role !== 'usuario') {
      alert('Apenas usuários podem agendar visitas');
      return;
    }
    try {
      await api.post(`/imovel/${imovelId}/agendar`);
      alert('Visita agendada com sucesso!');
    } catch (error) {
      alert('Erro ao agendar visita');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <p style={{ fontSize: 22, color: '#7f8c8d' }}>Carregando imóveis...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 30, textAlign: 'center', color: '#e74c3c' }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 50, maxWidth: 1400, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 36, color: '#2859ad', fontWeight: 700, fontSize: '2.2rem', textAlign: 'center', letterSpacing: 1 }}>
        Imóveis Disponíveis ({imoveis.length})
      </h2>
      {imoveis.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#7f8c8d', fontSize: 18 }}>
          Nenhum imóvel cadastrado ainda.
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(410px, 1fr))',
          gap: 40
        }}>
          {imoveis.map((imovel) => (
            <div key={imovel.id} style={{
              borderRadius: 16,
              boxShadow: '0 6px 24px #e0e8f6',
              backgroundColor: '#fff',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 560
            }}>
              <div style={{ height: 265, background: '#f6f9fb' }}>
                <Carousel showThumbs={false} showStatus={false} infiniteLoop emulateTouch>
                  {(imovel.fotos && imovel.fotos.length > 0 ? imovel.fotos : [{ url: FOTO_PLACEHOLDER }]).map((foto, i) => (
                    <img key={i}
                      src={foto.url.startsWith('http') ? foto.url : `http://localhost:7260${foto.url}`}
                      alt={`Foto ${i + 1}`}
                      style={{ width: '100%', height: '260px', objectFit: 'cover' }}
                      onError={e => { e.target.onerror = null; e.target.src = FOTO_PLACEHOLDER; }}
                    />
                  ))}
                </Carousel>
              </div>
              <div style={{ padding: '26px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontWeight: 700, fontSize: 24, color: '#2558b1', marginBottom: 10, letterSpacing: 1 }}>{imovel.endereco}</h3>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#208c5c', marginBottom: 7 }}>
                  💰 R$ {imovel.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div style={{ display: 'flex', gap: 18, fontSize: 16, color: '#345' }}>
                  <span>📐 {imovel.area} m²</span>
                  <span>🛏️ {imovel.numeroQuartos} qt</span>
                  <span>🚿 {imovel.numeroBanheiros} banh</span>
                  <span>🚗 {imovel.temGaragem ? 'Garagem' : 'Sem Garagem'} {imovel.vagasGaragem ? `(${imovel.vagasGaragem})` : ''}</span>
                </div>
                {imovel.descricao && <div style={{ fontSize: 15, color: '#8ea5ba', marginTop: 8 }}>{imovel.descricao}</div>}
                {user && user.role === 'usuario' && (
                  <button
                    onClick={() => handleAgendarVisita(imovel.id)}
                    style={{
                      width: '100%',
                      marginTop: 'auto',
                      padding: 14,
                      background: '#3498db',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 9,
                      fontWeight: 'bold',
                      fontSize: 17,
                      transition: 'background 0.3s',
                      cursor: 'pointer'
                    }}
                  >
                    📅 Agendar Visita
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImovelList;
