import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar/ocultar botão baseado na posição do scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Função para scroll suave para o topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-8 right-8 z-50 animate-fadeInUp">
          <button
            onClick={scrollToTop}
            className="relative w-14 h-14 bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white rounded-full shadow-2xl hover:shadow-red-500/30 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-red-500/50 group overflow-hidden"
            title="Voltar ao topo"
            aria-label="Voltar ao topo da página"
          >
            {/* Fundo com gradiente animado */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-400 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            
            {/* Ícone */}
            <div className="relative flex items-center justify-center h-full z-10">
              <i className="fas fa-chevron-up text-lg group-hover:animate-bounce transition-transform duration-200"></i>
            </div>
            
            {/* Efeito de brilho */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            {/* Anel de pulso */}
            <div className="absolute inset-0 rounded-full border-2 border-red-300 opacity-0 group-hover:opacity-60 animate-ping"></div>
            
            {/* Sombra interna */}
            <div className="absolute inset-0 rounded-full shadow-inner"></div>
          </button>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-1/2 transform translate-x-1/2 mb-3 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-lg">
            Voltar ao topo
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScrollToTop;