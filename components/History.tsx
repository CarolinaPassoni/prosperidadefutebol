
import React, { useState } from 'react';
import { Section } from '../types';

interface HistoryProps {
  onNavigate: (section: Section) => void;
}

interface NewsItem {
  source: string;
  date: string;
  title: string;
  snippet: string;
  fullText: string;
}

export const History: React.FC<HistoryProps> = ({ onNavigate }) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const mediaHighlights: NewsItem[] = [
    {
      source: "CBF",
      date: "10 de Setembro de 2025",
      title: "Prosperidade comemora bicampeonato capixaba e vagas nacionais",
      snippet: "O clube garantiu participação na Copa do Brasil Feminina e no Brasileiro Série A3 de 2026.",
      fullText: "O Prosperidade Futebol Clube reafirmou sua hegemonia no futebol capixaba feminino ao conquistar o bicampeonato estadual. Com uma campanha sólida e um futebol ofensivo, a equipe de Vargem Alta não apenas levantou o troféu, mas também assegurou um calendário nacional cheio para 2026. O clube representará o Espírito Santo na Copa do Brasil e no Campeonato Brasileiro Série A3, elevando o patamar do futebol feminino regional para o cenário brasileiro."
    },
    {
      source: "Folha Iconha",
      date: "08 de Setembro de 2025",
      title: "Prosperidade é bicampeã do estadual feminino",
      snippet: "No jogo de volta das finais, o Prospê garantiu o título e a hegemonia no futebol capixaba.",
      fullText: "Em uma final emocionante disputada no Estádio Araripe, o Prosperidade (o carinhoso 'Prospê') mostrou por que é a maior força do futebol feminino no estado atualmente. Com uma vitória convincência sobre seu rival, a equipe celebrou junto à sua apaixonada torcida que viajou de Vargem Alta para apoiar as atletas. 'Este título é fruto de um trabalho profissional e de uma dedicação sem limites dessas jogadoras', afirmou a diretoria após o apito final."
    },
    {
      source: "Diário do Estado",
      date: "06 de Setembro de 2025",
      title: "Prospê coloca Vargem Alta no mapa do Brasil",
      snippet: "Equipe domina o cenário estadual pelo segundo ano consecutivo e faz história.",
      fullText: "O sucesso do Prosperidade FC vai além das quatro linhas. Ao conquistar o bicampeonato estadual, o clube coloca a cidade de Vargem Alta em destaque nacional. A visibilidade gerada pelas futuras participações em competições da CBF atrai olhares de investidores e valoriza o esporte local. O projeto, que já dura décadas, colhe agora os frutos de um planejamento focado em excelência e representatividade feminina."
    },
    {
      source: "FES",
      date: "09 de Setembro de 2025",
      title: "Federação parabeniza o Prosperidade pela conquista do Bi",
      snippet: "O Prospê irá novamente representar o Espírito Santo nas competições nacionais.",
      fullText: "A Federação de Futebol do Estado do Espírito Santo (FES) manifestou oficialmente seu orgulho pela trajetória do Prosperidade FC. Em nota, a entidade destacou que a organização estrutural do clube serve de modelo para outras agremiações. O bicampeonato é visto como um marco para a profissionalização da modalidade no estado, garantindo que o pavilhão capixaba seja bem representado nas competições nacionais da próxima temporada."
    }
  ];

  return (
    <div className="bg-white min-h-screen text-gray-900 pb-20 selection:bg-prosperidade-red selection:text-white">
      
      {/* Hero Section - Fixed Clipping with extra padding and container sizing */}
      <div className="relative min-h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden border-b-8 border-prosperidade-red bg-white py-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')] opacity-20"></div>
          <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-prosperidade-red/5 blur-[120px] rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[400px] md:text-[600px] font-heading font-black text-gray-100 italic select-none pointer-events-none opacity-40">
            P
          </div>
        </div>
        
        <div className="relative z-10 text-center px-4 animate-fade-in flex flex-col items-center">
          <div className="bg-white p-5 inline-block rounded-full mb-8 shadow-xl border-2 border-prosperidade-red/10 transition-transform hover:scale-105">
            <img src="https://files.catbox.moe/91axjx.jpg" className="h-20 w-20 md:h-32 md:w-32 object-contain" alt="Logo" />
          </div>
          
          <h1 className="text-4xl md:text-[100px] font-heading font-bold uppercase tracking-tighter italic leading-none mb-8 text-gray-900 drop-shadow-sm">
            Prosperidade <span className="text-prosperidade-red">FC</span>
          </h1>
          
          <div className="relative group mx-auto">
            <div className="absolute inset-0 bg-prosperidade-red/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative px-10 md:px-16 py-4 bg-prosperidade-red text-white font-heading font-bold uppercase tracking-[0.2em] text-[10px] md:text-xl shadow-2xl transform -skew-x-12 flex items-center justify-center min-w-[200px]">
              <div className="transform skew-x-12 whitespace-nowrap">
                Apresentação & Legado
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 space-y-24">
        
        <section className="relative overflow-hidden bg-gray-50 rounded-[40px] border border-gray-100 p-10 md:p-20 transition-all hover:border-prosperidade-red/20 shadow-sm text-center">
           <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-prosperidade-red to-transparent"></div>
           
           <div className="max-w-4xl mx-auto">
              <div className="inline-block px-5 py-2 bg-prosperidade-red text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8">
                 Temporada 2026
              </div>
              <h2 className="text-4xl md:text-7xl font-heading font-bold uppercase italic leading-tight mb-8 text-gray-900">
                 O 2026 do Prospê será em <br className="hidden md:block"/> <span className="text-prosperidade-red">dose dupla!</span>
              </h2>
              
              <div className="space-y-6 text-gray-600 text-lg md:text-2xl leading-relaxed mb-12">
                 <p>
                    É oficial: o <span className="text-prosperidade-red font-bold">Prosperidade Futebol Clube</span> está confirmado no Campeonato Brasileiro Feminino A3 e na Copa do Brasil Feminina. Representaremos o Espírito Santo com orgulho e raça.
                 </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-12 inline-block">
                <p className="text-gray-900 font-heading font-bold text-xl md:text-3xl uppercase italic tracking-tight">
                  Apoie o Prospê e jogue junto conosco!
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-6">
                 <button 
                   onClick={() => onNavigate(Section.MEMBERSHIP)}
                   className="bg-prosperidade-red hover:bg-gray-800 text-white font-black px-12 py-5 rounded-2xl uppercase tracking-[0.3em] text-xs transition-all shadow-xl shadow-prosperidade-red/20 active:scale-95"
                 >
                   Seja Sócio Torcedor
                 </button>
              </div>
           </div>
        </section>

        <section>
          <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
            <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase italic text-gray-900 leading-none">QUEM <span className="text-prosperidade-red">SOMOS</span></h2>
            <div className="h-0.5 flex-grow bg-gray-100 hidden md:block"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 group shadow-sm">
              <h3 className="text-prosperidade-red font-bold uppercase tracking-widest mb-4">Institucional</h3>
              <p className="text-gray-600 leading-relaxed text-lg font-medium italic">
                O Prosperidade Futebol Clube é uma instituição dedicada ao desenvolvimento do futebol com excelência técnica e disciplina em <span className="text-gray-900 font-bold">Vargem Alta.</span>
              </p>
            </div>
            
            <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 group shadow-sm">
              <h3 className="text-prosperidade-red font-bold uppercase tracking-widest mb-4">Tradição</h3>
              <p className="text-gray-600 leading-relaxed text-lg font-medium italic">
                Com mais de <span className="text-gray-900 font-bold underline">50 anos</span> de história no futebol feminino, somos o orgulho da região serrana capixaba.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-prosperidade-red text-white rounded-[50px] p-12 md:p-24 shadow-2xl relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-white/5 opacity-50"></div>
          <h2 className="relative z-10 text-5xl md:text-8xl font-heading font-bold uppercase italic border-b-2 border-white/30 inline-block pb-8 mb-20">Conquistas</h2>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
            <div className="bg-white/10 p-10 rounded-3xl border border-white/20">
              <h4 className="text-3xl font-heading font-bold mb-4 uppercase">Nacional</h4>
              <p className="text-white/80 text-lg">Top 75 do Ranking Nacional da CBF Feminino.</p>
            </div>
            <div className="bg-white/10 p-10 rounded-3xl border border-white/20">
              <h4 className="text-3xl font-heading font-bold mb-4 uppercase">Estadual</h4>
              <p className="text-white/80 text-lg">Atual Bicampeão Estadual Capixaba (2024-2025).</p>
            </div>
          </div>
        </section>

        <section>
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase italic text-gray-900">MÍDIA</h2>
            <div className="h-1.5 w-24 bg-prosperidade-red mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mediaHighlights.map((item, idx) => (
              <button 
                key={idx} 
                onClick={() => setSelectedNews(item)}
                className="group text-left bg-gray-50 border border-gray-100 p-10 rounded-3xl hover:bg-white hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-prosperidade-red text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{item.source}</span>
                  <span className="text-gray-400 text-xs font-bold">{item.date}</span>
                </div>
                <h4 className="text-2xl font-heading font-bold text-gray-900 group-hover:text-prosperidade-red transition-colors mb-4 italic">"{item.title}"</h4>
                <p className="text-gray-500 text-base leading-relaxed line-clamp-2 italic">{item.snippet}</p>
              </button>
            ))}
          </div>
        </section>

        {selectedNews && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" onClick={() => setSelectedNews(null)}></div>
            <div className="relative bg-white text-gray-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl border border-gray-100 animate-fade-in">
              <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 p-8 flex justify-between items-center z-20">
                <span className="bg-prosperidade-red text-white px-4 py-1 rounded-full text-[10px] font-black uppercase">{selectedNews.source}</span>
                <button onClick={() => setSelectedNews(null)} className="p-2 hover:bg-prosperidade-red/5 rounded-full text-prosperidade-red">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
              <div className="p-12 md:p-20">
                <h2 className="text-4xl md:text-6xl font-heading font-bold leading-tight mb-10 italic">{selectedNews.title}</h2>
                <div className="text-xl text-gray-700 leading-relaxed font-light italic">{selectedNews.fullText}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
