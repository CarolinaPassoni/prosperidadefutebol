
import React from 'react';
import { MERCH_PRODUCTS } from '../constants';

export const Store: React.FC = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      
      {/* Top Bar - Benefits */}
      <div className="bg-prosperidade-red text-white py-2 text-xs md:text-sm font-bold tracking-wide">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center overflow-x-auto whitespace-nowrap gap-4">
          <span className="flex items-center"><svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> LOJA OFICIAL DO PROSPERIDADE FC</span>
          <span className="flex items-center hidden md:flex"><svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg> FRETE GRÁTIS P/ SÓCIOS</span>
        </div>
      </div>

      {/* Main Promo Banner */}
      <div className="relative h-[400px] md:h-[500px] bg-prosperidade-red overflow-hidden group">
        <div className="absolute inset-0 bg-white/5 opacity-40"></div>
        <img 
          src="https://files.catbox.moe/6pkqui.jpg" 
          alt="Novo Manto" 
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-start max-w-7xl mx-auto px-6 lg:px-8 pointer-events-none">
          <span className="bg-white text-prosperidade-red px-3 py-1 text-sm font-black uppercase tracking-widest mb-4 inline-block shadow-lg">
            Coleção 2025/2026
          </span>
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-2 italic drop-shadow-lg">
            SANGUE <br/> <span className="text-white underline decoration-white/30">VERMELHO</span>
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-lg drop-shadow-md font-medium italic">A nova armadura do Prosperidade FC já está disponível. Garanta a sua e vista a tradição.</p>
          <button className="bg-white text-prosperidade-red hover:bg-gray-800 hover:text-white font-bold py-4 px-8 uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 shadow-xl hover:shadow-2xl pointer-events-auto">
            Comprar Agora
          </button>
        </div>
      </div>

      {/* Product Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 uppercase border-l-4 border-prosperidade-red pl-4">
            Destaques da Loja
          </h3>
          <a href="#" className="text-sm font-bold text-prosperidade-red hover:underline uppercase">Ver tudo &rarr;</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MERCH_PRODUCTS.map((product) => {
            const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
            const installmentValue = (product.price / 6).toFixed(2);

            return (
              <div key={product.id} className="group bg-white border border-gray-200 hover:shadow-2xl hover:border-prosperidade-red/30 transition-all duration-300 rounded-sm flex flex-col h-full relative overflow-hidden">
                
                {/* Discount Badge */}
                {discount > 0 && (
                  <div className="absolute top-0 right-0 z-10 bg-prosperidade-red text-white text-xs font-bold px-3 py-1.5 uppercase">
                    {discount}% OFF
                  </div>
                )}

                {/* Image Area */}
                <div className="relative aspect-[1/1] overflow-hidden bg-white">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain object-center group-hover:scale-110 transition-transform duration-500 p-4"
                  />
                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-prosperidade-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-white text-prosperidade-red font-bold py-2 px-6 uppercase text-xs tracking-widest hover:bg-prosperidade-red hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg">
                      Espiar
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-grow">
                  
                  {/* Stars */}
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-3 h-3 ${i < (product.rating || 0) ? 'text-prosperidade-red' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <h3 className="text-sm font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-prosperidade-red transition-colors h-10">
                    {product.name}
                  </h3>

                  <div className="mt-auto">
                    {product.originalPrice && (
                      <p className="text-xs text-gray-400 line-through mb-0.5 font-bold">
                        R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                      </p>
                    )}
                    <p className="text-xl md:text-2xl font-bold text-prosperidade-red">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </p>
                    <p className="text-xs text-gray-500 font-medium mt-1">
                      em até <span className="text-gray-900 font-bold">6x de R$ {installmentValue.replace('.', ',')}</span>
                    </p>
                  </div>

                  <button className="w-full mt-4 bg-prosperidade-red hover:bg-gray-800 text-white font-bold py-3 px-4 rounded uppercase text-sm tracking-wide transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex justify-center items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    Comprar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-prosperidade-red text-white py-12 relative overflow-hidden">
         <div className="absolute inset-0 bg-white/5 opacity-20"></div>
         <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl font-heading font-bold mb-4 uppercase italic">Receba ofertas exclusivas</h2>
            <p className="text-white/80 mb-6 font-medium italic">Cadastre-se e ganhe 10% de desconto na primeira compra.</p>
            <div className="flex flex-col sm:flex-row justify-center max-w-lg mx-auto gap-2">
               <input type="email" placeholder="Seu e-mail principal" className="w-full px-6 py-4 text-gray-900 border-2 border-white/20 focus:outline-none focus:border-white rounded-xl font-bold uppercase tracking-wider text-xs" />
               <button className="bg-white text-prosperidade-red hover:bg-gray-800 hover:text-white font-black px-10 py-4 uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl rounded-xl text-xs">
                 Cadastrar
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};
