
import React, { useState } from 'react';
import { Match } from '../types';
import { UPCOMING_MATCHES } from '../constants';
import { generateMatchPreview } from '../services/geminiService';

export const Schedule: React.FC = () => {
  const [analysis, setAnalysis] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<Record<number, boolean>>({});

  const handleAnalyze = async (match: Match) => {
    if (analysis[match.id]) return;

    setLoading(prev => ({ ...prev, [match.id]: true }));
    const text = await generateMatchPreview(match.opponent, match.isHome);
    setAnalysis(prev => ({ ...prev, [match.id]: text }));
    setLoading(prev => ({ ...prev, [match.id]: false }));
  };

  return (
    <div className="bg-white py-12 md:py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-prosperidade-red/5 rounded-full blur-[80px] md:blur-[100px] -mr-32 -mt-32"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-gray-900 font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight">
            Calendário de Jogos
          </h2>
          <div className="h-1.5 w-16 md:w-24 bg-prosperidade-red mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-gray-500 text-sm md:text-lg">Acompanhe a jornada ao vivo pela TV Prospê.</p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {UPCOMING_MATCHES.map((match) => (
            <div 
              key={match.id} 
              className="bg-gray-50 border border-gray-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 hover:border-prosperidade-red/20 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {/* Date & Time */}
              <div className="text-center md:text-left md:min-w-[180px]">
                <div className="text-2xl md:text-3xl font-heading font-bold text-gray-900 whitespace-nowrap">
                  {new Date(match.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).toUpperCase()}
                </div>
                <div className="text-prosperidade-red font-bold mt-1 flex items-center justify-center md:justify-start text-sm uppercase tracking-widest">
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  {match.time}
                </div>
                <div className="text-gray-400 text-xs mt-2 font-medium truncate max-w-[200px]">{match.location}</div>
              </div>

              {/* Matchup */}
              <div className="flex-1 flex items-center justify-between w-full max-w-sm md:max-w-none mx-auto">
                <div className="flex flex-col items-center gap-2 w-24 sm:w-32">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white border border-gray-100 rounded-3xl flex items-center justify-center shadow-sm">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-prosperidade-red rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-3xl border-2 border-white shadow-md">P</div>
                  </div>
                  <span className="text-gray-900 text-[10px] sm:text-xs font-black uppercase tracking-tighter text-center">PROSPERIDADE</span>
                </div>
                
                <div className="flex flex-col items-center px-2">
                  <span className="text-prosperidade-red font-heading text-xl sm:text-4xl italic font-black">VS</span>
                </div>

                <div className="flex flex-col items-center gap-2 w-24 sm:w-32">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white border border-gray-100 rounded-3xl flex items-center justify-center shadow-sm">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 font-bold text-lg sm:text-2xl border-2 border-white shadow-inner">
                      {match.opponent.charAt(0)}
                    </div>
                  </div>
                  <span className="text-gray-500 text-[10px] sm:text-xs font-bold uppercase tracking-tighter text-center line-clamp-1">{match.opponent}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 w-full md:w-64">
                <a 
                  href="https://www.youtube.com/@ProsperidadeFC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-prosperidade-red hover:bg-gray-900 text-white font-bold uppercase text-xs sm:text-sm tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-prosperidade-red/20"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                  TV Prospê
                </a>
                
                <button 
                  onClick={() => handleAnalyze(match)}
                  disabled={loading[match.id]}
                  className="w-full py-3 border border-prosperidade-red/20 text-prosperidade-red text-[10px] sm:text-xs uppercase font-bold tracking-widest rounded-2xl hover:bg-prosperidade-red/5 transition-all flex items-center justify-center"
                >
                  {loading[match.id] ? (
                    <span className="flex items-center gap-2"><div className="w-3 h-3 border-2 border-prosperidade-red border-t-transparent rounded-full animate-spin"></div> Analisando...</span>
                  ) : (
                    "Análise Tática IA"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* AI Analysis Result */}
        <div className="mt-12 space-y-4">
           {Object.entries(analysis).map(([id, text]) => (
             <div key={id} className="bg-gray-50 border-l-4 border-prosperidade-red p-6 md:p-8 rounded-2xl animate-fade-in shadow-sm">
                <h4 className="text-prosperidade-red font-bold text-xs mb-3 uppercase tracking-widest flex items-center">
                  <span className="w-2 h-2 bg-prosperidade-red rounded-full mr-2"></span>
                  Analista Virtual: {UPCOMING_MATCHES.find(m => m.id === Number(id))?.opponent}
                </h4>
                <p className="text-gray-700 italic text-sm md:text-lg leading-relaxed pl-6 border-l border-gray-200">"{text}"</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};