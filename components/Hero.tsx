
import React from 'react';
import { Section } from '../types';

interface HeroProps {
  onNavigate: (section: Section) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative bg-white h-[90dvh] md:h-[800px] flex items-center overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://files.catbox.moe/6xvtq8.png"
          alt="Prosperidade FC Hero"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-10">
        <div className="max-w-4xl">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[110px] font-heading font-bold text-gray-900 mb-10 md:mb-14 leading-[0.9] tracking-tight uppercase italic animate-fade-in">
            <span className="block">AVANTE</span>
            <span className="text-prosperidade-red block">PROSPERIDADE</span>
          </h1>
          
          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in [animation-delay:400ms]">
            <button 
              onClick={() => onNavigate(Section.MEMBERSHIP)}
              className="px-10 py-5 bg-prosperidade-red text-white font-heading font-bold text-base md:text-xl uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-800 transition-all duration-300 shadow-xl shadow-prosperidade-red/20 flex items-center justify-center gap-3 active:scale-95"
            >
              Seja Sócio
            </button>
            <button 
              onClick={() => onNavigate(Section.HISTORY)}
              className="px-10 py-5 bg-white border border-gray-200 text-gray-600 font-heading font-bold text-base md:text-xl uppercase tracking-[0.2em] rounded-2xl hover:border-prosperidade-red hover:text-prosperidade-red transition-all duration-300 active:scale-95"
            >
              Nossa História
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
