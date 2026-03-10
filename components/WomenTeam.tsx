
import React from 'react';

export const WomenTeam: React.FC = () => {
  return (
    <div className="bg-prosperidade-dark min-h-screen text-white">
      {/* Hero Header */}
      <div className="relative h-[400px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-prosperidade-dark via-prosperidade-red/30 to-prosperidade-dark z-10"></div>
        <img 
          src="https://files.catbox.moe/p6d7nu.jpg" 
          alt="Torcida Prosperidade" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale mix-blend-multiply"
        />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-heading font-bold uppercase tracking-tighter mb-4">
            Pioneiras da <span className="text-prosperidade-red">Prosperidade</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-300 max-w-3xl mx-auto">
            Uma das histórias mais vitoriosas e tradicionais do futebol feminino paulista.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-heading font-bold uppercase border-l-4 border-prosperidade-red pl-6 mb-8">
              Tradição e Garra desde 1946
            </h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                O <span className="text-white font-bold">Prosperidade Futebol Clube</span>, fundado no bairro da Prosperidade em São Caetano do Sul, consolidou-se como um dos pilares do futebol amador e profissional da região do ABCD.
              </p>
              <p>
                No entanto, foi no <span className="text-prosperidade-red font-bold">Futebol Feminino</span> que o clube escreveu capítulos de ouro no cenário nacional, tornando-se uma referência para jovens atletas em uma época de resistência para a modalidade.
              </p>
              <p>
                O time feminino do Prosperidade não era apenas um participante; era um competidor temido, conhecido por revelar talentos e por bater de frente com as maiores potências do estado de São Paulo.
              </p>
            </div>
          </div>
          <div className="relative group rounded-2xl overflow-hidden shadow-2xl shadow-prosperidade-red/10 border border-white/10">
            <img 
              src="https://files.catbox.moe/p6d7nu.jpg" 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
              alt="Futebol Feminino" 
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
              <span className="text-prosperidade-red font-bold uppercase tracking-widest text-sm">Legado</span>
              <h3 className="text-2xl font-heading font-bold mt-2">Orgulho de São Caetano</h3>
            </div>
          </div>
        </div>

        {/* Highlight Section: 1999 */}
        <div className="bg-white/5 border border-prosperidade-red/20 rounded-3xl p-8 md:p-12 mb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-prosperidade-red/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
               <div>
                 <span className="bg-prosperidade-red text-white px-4 py-1 font-bold text-sm uppercase tracking-widest rounded-full">Momento Histórico</span>
                 <h2 className="text-4xl md:text-5xl font-heading font-bold mt-4 uppercase italic">Vice-Campeonato Paulista de 1999</h2>
               </div>
               <div className="text-7xl font-heading font-bold text-prosperidade-red/20 hidden md:block">1999</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-black/40 p-6 rounded-xl border border-white/5">
                <h4 className="text-prosperidade-red font-bold uppercase mb-2">A Campanha</h4>
                <p className="text-gray-400 text-sm">O Prosperidade desafiou gigantes e chegou à grande final do Campeonato Paulista Feminino, perdendo apenas para o poderoso São Paulo em uma disputa épica.</p>
              </div>
              <div className="bg-black/40 p-6 rounded-xl border border-white/5">
                <h4 className="text-prosperidade-red font-bold uppercase mb-2">Protagonismo</h4>
                <p className="text-gray-400 text-sm">O clube foi base de diversas atletas que viriam a servir a Seleção Brasileira, mostrando a força do trabalho de base e captação do time.</p>
              </div>
              <div className="bg-black/40 p-6 rounded-xl border border-white/5">
                <h4 className="text-prosperidade-red font-bold uppercase mb-2">O ABCD no Mapa</h4>
                <p className="text-gray-400 text-sm">Essa conquista colocou São Caetano do Sul definitivamente no mapa das grandes forças do futebol feminino no Brasil.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-prosperidade-red/40 transition-colors">
              <h3 className="text-2xl font-heading font-bold uppercase mb-4 text-white">Revelação de Talentos</h3>
              <p className="text-gray-400 leading-relaxed">
                Durante décadas, o Prosperidade serviu como porta de entrada para meninas de todo o país. Com uma estrutura voltada para o acolhimento e desenvolvimento técnico, o clube ajudou a profissionalizar o sonho de muitas atletas.
              </p>
           </div>
           <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-prosperidade-red/40 transition-colors">
              <h3 className="text-2xl font-heading font-bold uppercase mb-4 text-white">Resistência e Futuro</h3>
              <p className="text-gray-400 leading-relaxed">
                Mesmo com as dificuldades históricas do esporte no país, a marca do Prosperidade Futebol Clube permanece viva no imaginário de quem acompanhou o auge do futebol feminino no final do século XX.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};
