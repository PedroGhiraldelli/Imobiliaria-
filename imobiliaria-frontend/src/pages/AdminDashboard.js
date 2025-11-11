import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const FOTO_PLACEHOLDER = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=440&q=80";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('imoveis');
  const [imoveis, setImoveis] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingImovel, setEditingImovel] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    endereco: '',
    preco: '',
    area: '',
    numeroQuartos: '',
    numeroBanheiros: '',
    temGaragem: false,
    vagasGaragem: 0,
    imagens: [],
    descricao: ''
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'imoveis') {
          const response = await api.get('/imovel');
          setImoveis(response.data);
        } else {
          const response = await api.get('/user');
          setUsuarios(response.data);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, navigate, activeTab]);

  const handleOpenModal = (imovel = null) => {
    if (imovel) {
      setEditingImovel(imovel);
      setFormData({
        endereco: imovel.endereco,
        preco: imovel.preco,
        area: imovel.area,
        numeroQuartos: imovel.numeroQuartos,
        numeroBanheiros: imovel.numeroBanheiros,
        temGaragem: imovel.temGaragem,
        vagasGaragem: imovel.vagasGaragem || 0,
        imagens: [],
        descricao: imovel.descricao || ''
      });
    } else {
      setEditingImovel(null);
      setFormData({
        endereco: '',
        preco: '',
        area: '',
        numeroQuartos: '',
        numeroBanheiros: '',
        temGaragem: false,
        vagasGaragem: 0,
        imagens: [],
        descricao: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingImovel(null);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, imagens: files });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = new FormData();
    data.append('Endereco', formData.endereco);
    data.append('Preco', formData.preco);
    data.append('Area', formData.area);
    data.append('NumeroQuartos', formData.numeroQuartos);
    data.append('NumeroBanheiros', formData.numeroBanheiros);
    data.append('TemGaragem', formData.temGaragem);
    data.append('VagasGaragem', formData.vagasGaragem);
    data.append('Descricao', formData.descricao);
    formData.imagens.forEach(file => data.append('Imagens', file));
    // log para debug:
    console.log([...data.entries()]);

    if (editingImovel) {
      await api.put(`/imovel/${editingImovel.id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Imóvel atualizado com sucesso!');
    } else {
      await api.post('/imovel', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Imóvel cadastrado com sucesso!');
    }
    handleCloseModal();
    setTimeout(() => { setLoading(true); setActiveTab('imoveis'); }, 300);
  } catch (error) {
    console.error(error.response?.data || error);
    alert('Erro ao salvar imóvel');
  }
};

  const handleDelete = async (id) => {
  if (!window.confirm('Tem certeza que deseja deletar este imóvel?')) return;
  try {
    await api.delete(`/imovel/${id}`);
    alert('Imóvel deletado com sucesso!');
    setImoveis((prev) => prev.filter((imovel) => imovel.id !== id)); // <- esta linha faz sumir da tela imediatamente
  } catch (error) {
    console.error('Erro ao deletar imóvel:', error);
    alert('Erro ao deletar imóvel');
  }
};


  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Tem certeza que deseja deletar este usuário?')) return;
    try {
      await api.delete(`/user/${userId}`);
      alert('Usuário deletado com sucesso!');
      setActiveTab('usuarios');
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      alert('Erro ao deletar usuário');
    }
  };

  // Opcional: função placeholder para agendamento de visita (corrige erro caso queira testar)
  const handleAgendarVisita = (imovelId) => {
    alert(`Visita agendada para imóvel ${imovelId}!`);
  };

  return (
    <div style={{ padding: 30, maxWidth: 1400, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 30, color: '#2c3e50' }}>Dashboard Administrativo</h1>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          marginBottom: 30,
          borderBottom: '2px solid #ecf0f1'
        }}
      >
        <button
          onClick={() => setActiveTab('imoveis')}
          style={{
            padding: '15px 30px',
            backgroundColor: activeTab === 'imoveis' ? '#3498db' : 'transparent',
            color: activeTab === 'imoveis' ? '#fff' : '#7f8c8d',
            border: 'none',
            borderBottom: activeTab === 'imoveis' ? '3px solid #3498db' : 'none',
            cursor: 'pointer',
            fontSize: 16,
            fontWeight: 'bold',
            transition: 'all 0.3s'
          }}
        >
          Imóveis ({imoveis.length})
        </button>
        <button
          onClick={() => setActiveTab('usuarios')}
          style={{
            padding: '15px 30px',
            backgroundColor: activeTab === 'usuarios' ? '#3498db' : 'transparent',
            color: activeTab === 'usuarios' ? '#fff' : '#7f8c8d',
            border: 'none',
            borderBottom: activeTab === 'usuarios' ? '3px solid #3498db' : 'none',
            cursor: 'pointer',
            fontSize: 16,
            fontWeight: 'bold',
            transition: 'all 0.3s'
          }}
        >
          Usuários ({usuarios.length})
        </button>
      </div>

      {activeTab === 'imoveis' && (
        <button
          onClick={() => handleOpenModal()}
          style={{
            padding: '12px 24px',
            backgroundColor: '#2ecc71',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 20
          }}
        >
          + Novo Imóvel
        </button>
      )}

      {/* Conteúdo */}
      {loading ? (
        <p>Carregando...</p>
      ) : activeTab === 'imoveis' ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: 20
          }}
        >
          {imoveis.map((imovel) => (
            <div
              key={imovel.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: 20,
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <h3 style={{ marginBottom: 15, color: '#2c3e50' }}>
                {imovel.endereco}
              </h3>
              <Carousel showThumbs={false} showStatus={false} infiniteLoop emulateTouch>
                {(imovel.fotos && imovel.fotos.length > 0 ? imovel.fotos : [{ url: FOTO_PLACEHOLDER }]).map((foto, i) => (
                    <div key={i}>
                    <img 
                        src={foto.url.startsWith('http') ? foto.url : `http://localhost:7260${foto.url}`} 
                        alt={`Foto ${i + 1}`} 
                        style={{ width: '100%', height: 220, objectFit: 'cover' }} 
                        onError={e => { e.target.onerror = null; e.target.src = FOTO_PLACEHOLDER; }}
                    />
                    </div>
                ))}
            </Carousel>

              <div style={{ marginTop: 12, color: '#334', fontSize: 16 }}>
                <strong>💰 Preço:</strong> R$ {imovel.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}<br />
                <strong>📐 Área:</strong> {imovel.area} m²<br />
                <strong>🛏️ Quartos:</strong> {imovel.numeroQuartos} &nbsp;|&nbsp;
                <strong>🚿 Banheiros:</strong> {imovel.numeroBanheiros} &nbsp;|&nbsp;
                <strong>🚗 Garagem:</strong> {imovel.temGaragem ? 'Sim' : 'Não'} &nbsp;|&nbsp;
                <strong>🚙 Vagas:</strong> {imovel.vagasGaragem}
              </div>
              {imovel.descricao && (
                <p style={{ color: '#8ea5ba', fontSize: 15, margin: 0 }}>{imovel.descricao}</p>
              )}
              {user && user.role === 'usuario' && (
                <button
                  onClick={() => handleAgendarVisita(imovel.id)}
                  style={{
                    width: '100%',
                    marginTop: 18,
                    padding: 12,
                    backgroundColor: '#3498db',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontSize: 15,
                    fontWeight: 'bold'
                  }}
                >
                  📅 Agendar Visita
                </button>
              )}
              <div style={{ display: 'flex', gap: '10px', marginTop: 14 }}>
                <button
                  onClick={() => handleOpenModal(imovel)}
                  style={{
                    flex: 1,
                    padding: 10,
                    backgroundColor: '#3498db',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer'
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(imovel.id)}
                  style={{
                    flex: 1,
                    padding: 10,
                    backgroundColor: '#e74c3c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer'
                  }}
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#34495e', color: '#fff' }}>
                <th style={{ padding: 15, textAlign: 'left' }}>Nome</th>
                <th style={{ padding: 15, textAlign: 'left' }}>Email</th>
                <th style={{ padding: 15, textAlign: 'left' }}>Perfil</th>
                <th style={{ padding: 15, textAlign: 'center' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, i) => (
                <tr
                  key={usuario.id}
                  style={{
                    backgroundColor: i % 2 === 0 ? '#f8f9fa' : '#fff',
                    borderBottom: '1px solid #ecf0f1'
                  }}
                >
                  <td style={{ padding: 15 }}>{usuario.nome}</td>
                  <td style={{ padding: 15 }}>{usuario.email}</td>
                  <td style={{ padding: 15 }}>
                    <span
                      style={{
                        padding: '5px 15px',
                        borderRadius: 20,
                        backgroundColor: usuario.perfil === 'admin' ? '#e74c3c' : '#3498db',
                        color: '#fff',
                        fontSize: 12,
                        fontWeight: 'bold'
                      }}
                    >
                      {usuario.perfil}
                    </span>
                  </td>
                  <td style={{ padding: 15, textAlign: 'center' }}>
                    <button
                      onClick={() => handleDeleteUser(usuario.id)}
                      style={{
                        padding: '5px 15px',
                        backgroundColor: '#e74c3c',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer'
                      }}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: 30, borderRadius: 8, maxWidth: 500, width: '90%',
            maxHeight: '90vh', overflowY: 'auto'
          }}>
            <h2 style={{ marginBottom: 20 }}>
              {editingImovel ? 'Editar Imóvel' : 'Novo Imóvel'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 15 }}>
                <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>
                  Endereço:
                </label>
                <input
                  type="text"
                  value={formData.endereco}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                  required
                  style={{
                    width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 4
                  }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15, marginBottom: 15 }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>
                    Preço (R$):
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.preco}
                    onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                    required
                    style={{
                      width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 4
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>
                    Área (m²):
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    required
                    style={{
                      width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 4
                    }}
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15, marginBottom: 15 }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>
                    Quartos:
                  </label>
                  <input
                    type="number"
                    value={formData.numeroQuartos}
                    onChange={(e) => setFormData({ ...formData, numeroQuartos: e.target.value })}
                    required
                    style={{
                      width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 4
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>
                    Banheiros:
                  </label>
                  <input
                    type="number"
                    value={formData.numeroBanheiros}
                    onChange={(e) => setFormData({ ...formData, numeroBanheiros: e.target.value })}
                    required
                    style={{
                      width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 4
                    }}
                  />
                </div>
              </div>
              <div style={{ marginBottom: 15 }}>
                <label style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    checked={formData.temGaragem}
                    onChange={(e) => setFormData({ ...formData, temGaragem: e.target.checked })}
                  />
                  <span style={{ fontWeight: 'bold' }}>Tem Garagem</span>
                </label>
              </div>
              <div style={{ marginBottom: 15 }}>
                <label style={{ fontWeight: 'bold' }}>Garagem para quantos carros?</label>
                <input
                  type="number"
                  min="0"
                  value={formData.vagasGaragem}
                  onChange={e => setFormData({ ...formData, vagasGaragem: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold' }}>Fotos do imóvel:</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ width: '100%', padding: '10px' }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Descrição:
                </label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    resize: 'vertical'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: '#2ecc71',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {editingImovel ? 'Atualizar' : 'Cadastrar'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: '#95a5a6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
