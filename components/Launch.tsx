import React, { useEffect, useRef, useState } from 'react';
import { SmartImage } from './SmartImage';

const CAROUSEL_IMAGES = [
  { basePath: '/manto/jogo-branca', alt: 'Uniforme 2026 - Jogo Branca' },
  { basePath: '/manto/jogo-laranja', alt: 'Uniforme 2026 - Jogo Laranja' },
  { basePath: '/manto/jogo-roxa', alt: 'Uniforme 2026 - Jogo Roxa' },
  { basePath: '/manto/jogo-vermelha', alt: 'Uniforme 2026 - Jogo Vermelha' },
  { basePath: '/manto/torcedor-branca', alt: 'Uniforme 2026 - Sócio Branca' },
  { basePath: '/manto/torcedor-laranja', alt: 'Uniforme 2026 - Sócio Laranja' },
  { basePath: '/manto/torcedor-roxa', alt: 'Uniforme 2026 - Sócio Roxa' },
  { basePath: '/manto/torcedor-vermelha', alt: 'Uniforme 2026 - Sócio Vermelha' },
];

export const Launch: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    intervalRef.current = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 2800);
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const handlePrev = () => {
    stopAutoplay();
    setCurrent((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
    startAutoplay();
  };

  const handleNext = () => {
    stopAutoplay();
    setCurrent((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    startAutoplay();
  };

  const handleDotClick = (index: number) => {
    stopAutoplay();
    setCurrent(index);
    startAutoplay();
  };

  return (
    <section className="min-h-[100dvh] bg-white flex items-center justify-center px-4 py-10 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-prosperidade-red/5 blur-[160px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl text-center">
        <div className="mb-6 inline-flex items-center rounded-full bg-prosperidade-red px-6 py-2 text-white text-xs md:text-sm font-black uppercase tracking-[0.35em] shadow-xl shadow-prosperidade-red/20">
          Uniforme 2026
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold uppercase italic tracking-tighter leading-none text-gray-900">
          Lançamento das <span className="text-prosperidade-red">Camisas</span>
        </h2>

        <p className="mt-3 text-gray-400 text-xs md:text-sm font-semibold uppercase tracking-[0.25em]">
          Prosperidade FC · Vargem Alta - ES
        </p>

        <div className="mt-10 relative mx-auto w-full max-w-[380px] sm:max-w-[520px] md:max-w-[680px] rounded-[28px] overflow-hidden border border-gray-100 shadow-2xl bg-white">
          <div style={{ aspectRatio: '4 / 5' }} className="relative overflow-hidden bg-white">
            {CAROUSEL_IMAGES.map((img, index) => (
              <div
                key={img.basePath}
                className="absolute inset-0 transition-all duration-700 ease-in-out"
                style={{
                  opacity: current === index ? 1 : 0,
                  transform: current === index ? 'scale(1)' : 'scale(1.04)',
                  zIndex: current === index ? 2 : 1,
                }}
              >
                <SmartImage
                  basePath={img.basePath}
                  alt={img.alt}
                  className="w-full h-full object-contain bg-white"
                  draggable={false}
                />
              </div>
            ))}

            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all"
              aria-label="Imagem anterior"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all"
              aria-label="Próxima imagem"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {CAROUSEL_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-300 rounded-full ${
                current === index ? 'w-8 h-2.5 bg-prosperidade-red' : 'w-2.5 h-2.5 bg-gray-300'
              }`}
              aria-label={`Ir para imagem ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};