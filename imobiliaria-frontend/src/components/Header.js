import React from "react";

const Header = () => (
  <header style={{
    position: "sticky", // "fixed" também funciona, mas "sticky" permite espaçamento natural com o conteúdo
    top: 0,
    zIndex: 1000,
    width: "100%",
    background: "rgba(39,56,80,0.97)",
    boxShadow: "0 1px 10px #0001",
    padding: "0 .5rem"
  }}>
    <nav style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      maxWidth: 1400, margin: "0 auto", height: 72
    }}>
      <div>
        <a href="/">
          <img src="/logo-vista-paulistana.svg" alt="Logo" style={{ height: 40, verticalAlign: 'middle'}} />
        </a>
      </div>
      <div style={{ display: 'flex', gap: 38 }}>
        <a href="/" style={{ color: "#fff", fontWeight: 700, textDecoration: 'none', fontSize: 18 }}>Home</a>
        <a href="/imoveis" style={{ color: "#fff", textDecoration: 'none', fontSize: 17 }}>Imóveis</a>
        <a href="/contato" style={{ color: "#fff", textDecoration: 'none', fontSize: 17 }}>Contato</a>
        <a href="/quem-somos" style={{ color: "#fff", textDecoration: 'none', fontSize: 17}}>Quem somos</a>
      </div>
    </nav>
  </header>
);

export default Header;
