import React, { useState } from 'react';

const ContatoPage = () => {
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' });
  const [enviado, setEnviado] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Aqui você pode fazer POST para seu backend, enviar e-mail, etc
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
  };

  return (
    <div style={{ maxWidth: 500, margin: '110px auto 0', background: '#fff', borderRadius: 12,
                  boxShadow: '0 6px 24px #e0e8f6', padding: '38px 26px 24px' }}>
      <h2 style={{ color: '#2558b1', fontWeight: 800, fontSize: '2rem', marginBottom: 18 }}>Entre em Contato</h2>
      {enviado && <div style={{ color: '#179e62', marginBottom: 12, fontWeight:'bold' }}>Mensagem enviada! Obrigado 🙂</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label>Nome</label>
          <input name="nome" required value={form.nome} onChange={handleChange}
                 style={{ width: '100%', padding: 11, borderRadius: 6, border: '1px solid #bbe', fontSize: 16 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Email</label>
          <input name="email" type="email" required value={form.email} onChange={handleChange}
                 style={{ width: '100%', padding: 11, borderRadius: 6, border: '1px solid #bbe', fontSize: 16 }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>Mensagem</label>
          <textarea name="mensagem" required value={form.mensagem} onChange={handleChange}
                    rows={4} style={{ width: '100%', padding: 11, borderRadius: 6, border: '1px solid #bbe', fontSize: 16 }} />
        </div>
        <button type="submit" style={{ background:'#3498db', color:'#fff', fontWeight:700,
            border:'none', borderRadius: 7, fontSize: 18, padding: '13px 30px', width: '100%' }}>
          Enviar Mensagem
        </button>
      </form>
      <div style={{ marginTop: 30, color:'#556', fontSize:15, textAlign:'center' }}>
        <strong>Vista Paulistana Imóveis</strong><br />
        Av. das Cidades, 1000 - São Paulo, SP<br />
        Whatsapp: (11) 91234-5678<br />
        Email: contato@vistapaulistana.com.br
      </div>
    </div>
  );
};

export default ContatoPage;
