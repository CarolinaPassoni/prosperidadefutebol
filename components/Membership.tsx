
import React, { useState } from 'react';
import { MEMBERSHIP_PLANS, TEAM_LOGO_URL } from '../constants';

export const Membership: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [plan, setPlan] = useState('Plano Guerreiro');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const FORM_ENDPOINT = 'https://formsubmit.co/ajax/prosperidadefutebolclube@gmail.com';

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Envio direto para o e-mail do clube via FormSubmit (sem backend)
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          plan,
          cpf,
          whatsapp,
          _subject: 'Novo cadastro - Sócio Torcedor',
          _template: 'table',
          _captcha: 'false'
        })
      });
      
      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 500);
      } else {
        alert('Erro ao processar solicitação. Tente novamente.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Erro de conexão. Verifique sua internet.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4 py-20">
        <div className="bg-gray-50 border-2 border-prosperidade-red/10 p-12 rounded-[50px] text-center max-w-lg w-full animate-fade-in shadow-2xl">
          <div className="w-24 h-24 bg-prosperidade-red rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl shadow-prosperidade-red/30">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 uppercase italic text-gray-900">CONVOCADO!</h2>
          <p className="text-gray-600 mb-10 leading-relaxed text-lg">
            Sua convocação foi aceita, <span className="text-prosperidade-red font-bold">{name}</span>. <br/>
            Seu cartão do <span className="text-gray-900 font-bold">{plan}</span> está sendo preparado!
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full py-5 bg-gray-900 text-white font-black rounded-2xl uppercase tracking-[0.4em] hover:bg-prosperidade-red transition-all duration-300 shadow-xl"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-gray-900 pb-20">
      
      {/* Hero Section Premium */}
      <div className="relative h-[35vh] md:h-[45vh] flex items-center justify-center overflow-hidden border-b-8 border-prosperidade-red">
        <div className="absolute inset-0">
          <img 
            src="https://files.catbox.moe/2847ov.jpg" 
            className="w-full h-full object-cover opacity-10 grayscale scale-110"
            alt="Fundo"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/80 to-white"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-[80px] font-heading font-bold uppercase italic tracking-tighter leading-none mb-4 text-gray-900">
            SÓCIO <span className="text-prosperidade-red">TORCEDOR</span> 2026
          </h1>
          <p className="text-gray-500 text-xs md:text-lg font-black tracking-[0.6em] uppercase max-w-3xl mx-auto italic">
            PROSPERIDADE FUTEBOL CLUBE
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white/90 backdrop-blur-md border border-gray-100 p-6 rounded-3xl shadow-xl mb-12 flex flex-wrap justify-center gap-8 text-center">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Validade</p>
            <p className="text-lg font-bold text-gray-900">Até Dezembro de 2026</p>
          </div>
          <div className="w-px h-12 bg-gray-100 hidden md:block"></div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pagamento</p>
            <p className="text-lg font-bold text-prosperidade-red">Valor Anual</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Card Preview */}
          <div className="flex flex-col items-center lg:items-end space-y-10">
            <div className="text-center lg:text-right">
              <h2 className="text-3xl md:text-4xl font-heading font-bold uppercase tracking-tight text-gray-900 italic">
                SOLICITE SEU <span className="text-prosperidade-red">CARTÃO</span>
              </h2>
              <div className="h-2 w-16 bg-prosperidade-red ml-auto mt-4 hidden lg:block rounded-full"></div>
            </div>

            <div className="relative w-full max-w-[380px] group perspective-1000">
              {/* Card Body - Updated to Red/White */}
              <div className="w-full aspect-[1.586/1] rounded-[24px] bg-prosperidade-red p-[2px] shadow-[0_50px_100px_-20px_rgba(217,0,0,0.4)] relative overflow-hidden transition-all duration-700 hover:rotate-1 hover:scale-[1.05]">
                {/* Patterns and Textures */}
                <div className="absolute inset-0 opacity-10 bg-white"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                
                {/* Left White Bar */}
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-white shadow-[2px_0_10px_rgba(255,255,255,0.4)]"></div>
                
                <div className="relative h-full flex flex-col justify-between p-7 pl-9">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-1 rounded-full border-2 border-white shadow-lg">
                        <img src={TEAM_LOGO_URL} className="h-10 w-10 rounded-full" alt="Logo" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-black tracking-widest text-white leading-none">PROSPERIDADE FC</span>
                        <span className="text-[8px] font-bold text-white/70 tracking-[0.4em] uppercase">Vargem Alta - ES</span>
                      </div>
                    </div>
                    <div className="text-right">
                       <span className="text-[8px] font-black tracking-[0.4em] uppercase text-white/40 italic">VIP MEMBER</span>
                       <div className="w-10 h-7 bg-gradient-to-br from-[#ffffff] via-[#f1f1f1] to-[#ffffff] rounded-lg border border-white/20 mt-2 ml-auto opacity-90 shadow-inner"></div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="text-[6px] font-black uppercase tracking-[0.5em] text-white/60">TITULAR DO CARTÃO</div>
                      <div className="text-xl md:text-2xl font-heading font-bold uppercase tracking-wider text-white truncate h-8 drop-shadow-md">
                        {name || 'SEU NOME AQUI'}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end border-t border-white/20 pt-4">
                      <div className="space-y-1">
                        <div className="text-[6px] font-bold uppercase tracking-widest text-white/40 italic">ID DE ACESSO</div>
                        <div className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] text-white/80 uppercase">
                          {name ? 'PRSP-2026-X8' : '•••• •••• ••••'}
                        </div>
                      </div>
                      <div className="text-right">
                         <span className="text-[9px] block font-black text-white uppercase tracking-tighter italic leading-none bg-white/20 px-2 py-1 rounded">{plan}</span>
                         <span className="text-[6px] text-white/50 font-bold tracking-widest block mt-1">VALID 12/26</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Membership Form */}
          <div className="bg-gray-50 p-10 md:p-14 rounded-[50px] border border-gray-100 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-prosperidade-red/5 blur-[80px] pointer-events-none"></div>
            <form onSubmit={handleFormSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 ml-2">NOME COMPLETO</label>
                <input 
                  required
                  type="text" 
                  maxLength={22}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="NOME IMPRESSO NO CARTÃO" 
                  className="w-full bg-white border-2 border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-prosperidade-red transition-all text-gray-900 placeholder:text-gray-300 font-bold uppercase tracking-widest text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 ml-2">E-MAIL</label>
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com" 
                  className="w-full bg-white border-2 border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-prosperidade-red transition-all text-gray-900 font-bold tracking-widest text-sm"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 ml-2">CPF</label>
                  <input 
                    required 
                    type="text" 
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="000.000.000-00" 
                    className="w-full bg-white border-2 border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-prosperidade-red transition-all text-gray-900 text-sm" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 ml-2">WHATSAPP</label>
                  <input 
                    required 
                    type="tel" 
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="(28) 99999-9999" 
                    className="w-full bg-white border-2 border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-prosperidade-red transition-all text-gray-900 text-sm" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 ml-2">CATEGORIA</label>
                <select 
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="w-full bg-white border-2 border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-prosperidade-red appearance-none cursor-pointer text-gray-900 font-bold uppercase tracking-widest text-sm"
                >
                  {MEMBERSHIP_PLANS.map(p => (
                    <option key={p.id} value={p.name}>{p.name} — R$ {p.price.toFixed(2)}</option>
                  ))}
                </select>
              </div>
              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={loading}
                  className={`w-full py-5 bg-prosperidade-red text-white font-black uppercase tracking-[0.5em] rounded-2xl transition-all duration-300 shadow-2xl shadow-prosperidade-red/30 hover:bg-gray-900 active:scale-95 text-xs ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'PROCESSANDO...' : 'SOLICITAR AGORA'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Plans List */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tighter italic text-gray-900">PLANOS <span className="text-prosperidade-red">SÓCIO</span></h2>
          <div className="h-2 w-24 bg-prosperidade-red mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center gap-10 max-w-5xl mx-auto">
          {MEMBERSHIP_PLANS.map((planItem) => (
            <div 
              key={planItem.id} 
              className={`relative bg-gray-50 p-12 rounded-[50px] border-2 transition-all duration-500 hover:shadow-2xl hover:bg-white w-full md:w-1/2 flex flex-col ${planItem.highlight ? 'border-prosperidade-red shadow-xl' : 'border-gray-100 shadow-sm'}`}
            >
              <h4 className="text-3xl font-heading font-bold mb-2 uppercase italic tracking-wider text-gray-900">{planItem.name}</h4>
              <p className="text-xs text-gray-500 font-bold mb-6 uppercase tracking-widest">
                {planItem.name === "Plano Raiz" ? "Ideal para: Torcedores que acompanham o time nos jogos e querem viver o clube de perto." : "Ideal para: Torcedores que moram longe e não conseguem ir aos jogos, mas querem apoiar o clube."}
              </p>
              <div className="flex items-baseline gap-1 mb-10">
                <span className="text-5xl font-bold text-gray-900">R$ {planItem.price.toFixed(2).split('.')[0]}</span>
                <span className="text-2xl font-bold text-prosperidade-red">,{planItem.price.toFixed(2).split('.')[1]}</span>
                <span className="text-[11px] text-gray-400 font-black ml-2 uppercase">Pagamento Único</span>
              </div>
              <ul className="space-y-6 mb-16 border-t border-gray-100 pt-10 flex-grow">
                {planItem.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start gap-4 text-base text-gray-600 font-medium">
                    <svg className="w-6 h-6 text-prosperidade-red shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => {
                   setPlan(planItem.name);
                   window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs transition-all duration-500 ${planItem.highlight ? 'bg-prosperidade-red text-white hover:bg-gray-900 shadow-xl shadow-prosperidade-red/30' : 'bg-white border-2 border-gray-100 text-gray-600 hover:border-prosperidade-red hover:text-prosperidade-red shadow-sm'}`}
              >
                ESCOLHER PLANO
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
