import React, { useState, useEffect } from 'react';
import { TEAM_LOGO_URL } from '../constants';
import { Section } from '../types';

interface NavbarProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
  onOpenBuyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onOpenBuyModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navItems = [
    { label: 'Início', value: Section.HOME },
    { label: 'História', value: Section.HISTORY },
    { label: 'Sócio', value: Section.MEMBERSHIP },
    { label: 'Lançamento das Camisas', value: Section.LAUNCH },
    { label: 'Parceiros', value: Section.SPONSORS },
  ];

  const handleNavClick = (value: Section) => {
    onNavigate(value);
    setIsOpen(false);
  };

  const handleBuyClick = () => {
    setIsOpen(false);
    onOpenBuyModal();
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-md py-3 shadow-sm border-b border-gray-100' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          <div 
            className="flex items-center cursor-pointer group shrink-0" 
            onClick={() => handleNavClick(Section.HOME)}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-prosperidade-red rounded-full blur-md opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <img 
                src={TEAM_LOGO_URL} 
                alt="Prosperidade FC" 
                className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-prosperidade-red object-cover bg-white shadow-sm" 
              />
            </div>
            <span className="ml-3 text-lg sm:text-2xl font-heading font-bold tracking-tighter uppercase text-gray-900 leading-none">
              PROSPERIDADE <span className="text-prosperidade-red">FC</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onNavigate(item.value)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 uppercase tracking-[0.15em] whitespace-nowrap ${
                  activeSection === item.value
                    ? 'text-white bg-prosperidade-red shadow-lg shadow-prosperidade-red/20'
                    : 'text-gray-600 hover:text-prosperidade-red hover:bg-prosperidade-red/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={handleBuyClick}
              className="ml-2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.15em] bg-prosperidade-red text-white hover:bg-red-700 shadow-lg shadow-prosperidade-red/30 transition-all duration-300 whitespace-nowrap flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Comprar
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 flex items-center justify-center focus:outline-none z-[110]"
              aria-label="Abrir Menu"
            >
              <div className="w-6 flex flex-col items-end justify-center space-y-1.5">
                <span className={`block h-0.5 bg-prosperidade-red transition-all duration-300 ${isOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'}`}></span>
                <span className={`block h-0.5 bg-prosperidade-red transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-4'}`}></span>
                <span className={`block h-0.5 bg-prosperidade-red transition-all duration-300 ${isOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-5'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`fixed inset-0 z-[105] md:hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-white/98 backdrop-blur-2xl"></div>
        <div className="relative h-full flex flex-col p-10 pt-24 overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-prosperidade-red/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col space-y-6">
            {navItems.map((item, index) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                style={{ transitionDelay: `${index * 50}ms` }}
                className={`text-left text-3xl font-heading font-black uppercase italic tracking-tighter transition-all duration-500 transform ${
                  isOpen ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
                } ${
                  activeSection === item.value ? 'text-prosperidade-red' : 'text-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={handleBuyClick}
              style={{ transitionDelay: `${navItems.length * 50}ms` }}
              className={`text-left text-3xl font-heading font-black uppercase italic tracking-tighter transition-all duration-500 transform text-prosperidade-red ${
                isOpen ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              } flex items-center gap-3`}
            >
              <span className="text-2xl">🛒</span> Comprar
            </button>
          </div>

          <div className={`mt-auto pt-10 border-t border-gray-100 transition-all duration-700 delay-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
             <div className="flex flex-col gap-1">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em]">Prosperidade FC © 2026</p>
                <p className="text-[8px] text-prosperidade-red font-black uppercase tracking-[0.2em] italic">Vargem Alta - Espírito Santo</p>
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
};