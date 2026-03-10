
import React, { useState, useEffect } from 'react';
import { SQUAD_PLAYERS } from '../constants';

export const Squad: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlay]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % SQUAD_PLAYERS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + SQUAD_PLAYERS.length) % SQUAD_PLAYERS.length);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-20 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[400px] md:text-[600px] font-heading font-bold text-gray-50 pointer-events-none select-none italic leading-none opacity-40">
        PFC
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-prosperidade-red/20 bg-prosperidade-red/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-prosperidade-red animate-pulse"></span>
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-prosperidade-red italic">Galeria de Elite</span>
          </div>
          <h2 className="text-5xl md:text-[110px] font-heading font-bold text-gray-900 uppercase italic tracking-tighter leading-[0.85] mb-6">
            NOSSO <span className="text-prosperidade-red">ELENCO</span>
          </h2>
          <div className="h-2 w-32 bg-prosperidade-red mx-auto mb-8 rounded-full"></div>
        </div>

        {/* Immersive Stage Carousel */}
        <div 
          className="relative group"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          {/* Main Stage */}
          <div className="relative h-[550px] md:h-[750px] w-full max-w-6xl mx-auto overflow-hidden rounded-[60px] bg-white border-4 border-white shadow-[0_60px_120px_-30px_rgba(217,0,0,0.2)]">
            
            {SQUAD_PLAYERS.map((player, index) => (
              <div
                key={player.id}
                className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${
                  index === currentIndex 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-105 pointer-events-none'
                }`}
              >
                {/* Full Stage Image */}
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Premium Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-prosperidade-red via-transparent to-white/10 opacity-70"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-prosperidade-red/20 via-transparent to-transparent"></div>

                {/* Info Stage Content */}
                <div className="absolute inset-0 p-8 md:p-20 flex flex-col justify-end">
                  <div className="animate-fade-in">
                    <div className="flex flex-col md:flex-row items-end md:items-center gap-6 mb-8">
                      {/* Stylized Number */}
                      <div className="text-[120px] md:text-[250px] font-heading font-black text-white/20 italic leading-none select-none tracking-tighter -mb-4 md:-mb-10">
                        {player.number < 10 ? `0${player.number}` : player.number}
                      </div>

                      <div className="flex-1 text-right md:text-left">
                        <div className="inline-block px-4 py-1.5 bg-white/30 backdrop-blur-xl border border-white/40 rounded-full mb-6 shadow-xl">
                          <span className="text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">{player.position}</span>
                        </div>
                        <h3 className="text-5xl md:text-9xl font-heading font-bold text-white uppercase italic tracking-tighter leading-[0.8] mb-8 drop-shadow-2xl">
                          {player.name}
                        </h3>
                      </div>
                    </div>

                    {/* Quick Details Grid */}
                    <div className="flex justify-end md:justify-start gap-12 border-t border-white/20 pt-8 max-w-3xl">
                      <div className="text-center md:text-left">
                        <p className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-2">Atributo</p>
                        <p className="text-white font-bold text-2xl uppercase italic">{player.height}</p>
                      </div>
                      <div className="text-center md:text-left">
                        <p className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-2">Referência</p>
                        <p className="text-white font-bold text-2xl uppercase italic">#{player.id}</p>
                      </div>
                      <div className="text-center md:text-left">
                        <p className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-2">Origem</p>
                        <p className="text-white font-bold text-2xl uppercase italic tracking-tighter">Vargem Alta</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16 z-20">
            <button 
              onClick={prevSlide}
              className="p-6 md:p-8 rounded-full bg-white text-prosperidade-red border-2 border-gray-50 shadow-3xl hover:bg-prosperidade-red hover:text-white transition-all duration-500 active:scale-90 group"
            >
              <svg className="w-10 h-10 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16 z-20">
            <button 
              onClick={nextSlide}
              className="p-6 md:p-8 rounded-full bg-white text-prosperidade-red border-2 border-gray-50 shadow-3xl hover:bg-prosperidade-red hover:text-white transition-all duration-500 active:scale-90 group"
            >
              <svg className="w-10 h-10 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* Thumbnails Navigation */}
        <div className="flex justify-center mt-20 gap-8 flex-wrap">
          {SQUAD_PLAYERS.map((player, idx) => (
            <button
              key={player.id}
              onClick={() => setCurrentIndex(idx)}
              className={`relative transition-all duration-700 ${
                idx === currentIndex ? 'scale-125' : 'scale-90 opacity-30 grayscale hover:grayscale-0 hover:opacity-100'
              }`}
            >
              <div className={`w-20 h-20 md:w-28 md:h-28 rounded-3xl overflow-hidden border-4 transition-all ${idx === currentIndex ? 'border-prosperidade-red shadow-2xl' : 'border-gray-100'}`}>
                <img src={player.image} className="w-full h-full object-cover" alt={player.name} />
              </div>
              <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-prosperidade-red text-white text-[9px] font-black uppercase tracking-tighter shadow-xl transition-opacity duration-300 ${idx === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                #{player.number}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Summary Panel */}
      <div className="mt-32 w-full max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12">
        {[
          { label: 'História Viva', value: '100+' },
          { label: 'Troféus', value: '85' },
          { label: 'Sede Própria', value: 'ES' },
          { label: 'União', value: '100%' }
        ].map((stat, i) => (
          <div key={i} className="bg-gray-50 p-10 rounded-[50px] text-center border border-gray-100 shadow-sm group hover:border-prosperidade-red/20 transition-all">
             <p className="text-5xl font-heading font-bold text-gray-900 leading-none group-hover:text-prosperidade-red transition-colors">{stat.value}</p>
             <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.4em] mt-4">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
