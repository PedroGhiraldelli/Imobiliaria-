import React from 'react';

const HomePage = () => (
  <div
    style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: ' url(/campinasmedio.jpg) center/cover no-repeat',
      color: '#fff',
      fontFamily: 'Roboto, Arial, sans-serif'
    }}
  >
    {/* Logos top left/right opcional */}
    <div style={{ position: 'absolute', left: 30, top: 30 }}>
     <img src="" alt="Campinas" style={{ height: 54 }} />

    </div>
    <div style={{ position: 'absolute', right: 40, top: 38 }}>
      <img src="/logo-parceiro-pilarhomes.svg" style={{ height: 32 }} alt="Parceiro" />
    </div>
    {/* Menu topo direito */}
    <nav style={{ position: 'absolute', right: 60, top: 30, display: 'flex', gap: 44, alignItems: 'center' }}>
      <a href="/" style={{ color:'#fff', fontWeight:700, fontSize: '1.18rem', borderBottom:'2px solid #fff', textDecoration:'none' }}>Home</a>
      <a href="/imoveis" style={{ color:'#fff', fontWeight:400, fontSize: '1.11rem', textDecoration:'none' }}>Buscar Imóveis</a>
      <a href="#contato" style={{ color:'#fff', fontWeight:400, fontSize: '1.11rem', textDecoration:'none' }}>Contato</a>
      <a href="#quem-somos" style={{ color:'#fff', fontWeight:400, fontSize: '1.11rem', textDecoration:'none' }}>Quem somos</a>
      <span style={{ fontSize:22, paddingLeft:10, paddingTop:7 }}>&#128247;</span>
    </nav>
    {/* Conteúdo principal centralizado */}
    <div style={{ width: '100%', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3.3rem', fontWeight: '800', marginBottom: 32, letterSpacing: 1 }}>
        Vista Paulistana Imóveis
      </h1>

      
      <div style={{ display: 'inline-flex', gap: 24 }}>
        <a href="/imoveis" style={{
          minWidth: 120,
          padding: '16px 34px',
          fontSize: '1.19rem',
          fontWeight: 700,
          color: '#fff',
          background: 'transparent',
          border: '2px solid #fff',
          borderRadius: 8,
          textDecoration: 'none',
          transition: 'background 0.2s, color 0.2s'
        }}>Ver Imóveis</a>
        <a href="#contato" style={{
          minWidth: 120,
          padding: '16px 34px',
          fontSize: '1.19rem',
          fontWeight: 700,
          color: '#fff',
          background: 'transparent',
          border: '2px solid #fff',
          borderRadius: 8,
          textDecoration: 'none',
          transition: 'background 0.2s, color 0.2s'
        }}>Contato</a>
      </div>
    </div>
  </div>
);

export default HomePage;
