import React, { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [editingAppointment, setEditingAppointment] = useState(null);

  // Scroll para o topo sempre que a página mudar
  useEffect(() => {
    // Forçar scroll para o topo de forma mais agressiva
    const forceScrollToTop = () => {
      // Scroll instantâneo primeiro
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Depois scroll suave
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
    
    // Executar imediatamente
    forceScrollToTop();
    
    // Executar após renderização
    requestAnimationFrame(forceScrollToTop);
    
    // Executar após delays para garantir
    setTimeout(forceScrollToTop, 50);
    setTimeout(forceScrollToTop, 150);
    setTimeout(forceScrollToTop, 300);
  }, [currentPage]);

  // Função para navegar entre páginas
  const handlePageChange = (page, appointmentData = null) => {
    setCurrentPage(page);
    if (page === 'appointment' && appointmentData) {
      setEditingAppointment(appointmentData);
    } else {
      setEditingAppointment(null);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onPageChange={handlePageChange} />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'appointment':
        return <Appointment onPageChange={handlePageChange} editingAppointment={editingAppointment} />;
      default:
        return <Home onPageChange={handlePageChange} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar currentPage={currentPage} onPageChange={handlePageChange} />
        <main>
          {renderPage()}
        </main>
        
        {/* Footer */}
        <footer className="gradient-bg text-white py-12 mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* About */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <i className="fas fa-hand-holding-heart text-3xl"></i>
                  <span className="text-2xl font-bold">Sangue Solidário</span>
                </div>
                <p className="text-red-100 text-sm leading-relaxed">
                  Plataforma digital desenvolvida para facilitar e modernizar o processo de doação de sangue em
                  Três Lagoas - MS.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-bold mb-4">Links Rápidos</h4>
                <ul className="space-y-2 text-red-100">
                  <li>
                    <button
                      onClick={() => handlePageChange('home')}
                      className="hover:text-white transition flex items-center"
                    >
                      <i className="fas fa-chevron-right text-xs mr-2"></i>Home
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handlePageChange('about')}
                      className="hover:text-white transition flex items-center"
                    >
                      <i className="fas fa-chevron-right text-xs mr-2"></i>Sobre
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handlePageChange('contact')}
                      className="hover:text-white transition flex items-center"
                    >
                      <i className="fas fa-chevron-right text-xs mr-2"></i>Contato
                    </button>
                  </li>
                  <li>
                    <a
                      href="https://www.hemosul.ms.gov.br"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition flex items-center"
                    >
                      <i className="fas fa-external-link-alt text-xs mr-2"></i>Hemosul MS
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-lg font-bold mb-4">Contato</h4>
                <ul className="space-y-3 text-red-100 text-sm">
                  <li className="flex items-start">
                    <i className="fas fa-map-marker-alt mt-1 mr-3"></i>
                    <span>Rua Manoel Rodrigues Artez, 520<br />Três Lagoas - MS</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-phone mr-3"></i>
                    <span>(67) 3522-7959</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fab fa-whatsapp mr-3"></i>
                    <span>(67) 98163-2387</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-red-400 pt-6 text-center">
              <p className="text-red-100 mb-2">Projeto de Extensão - UFMS | Hemosul Três Lagoas</p>
              <p className="text-sm text-red-200">
                © 2025 Sangue Solidário. Desenvolvido com{' '}
                <i className="fas fa-heart text-red-300"></i> para salvar vidas.
              </p>
              <p className="text-xs text-red-200 mt-2">
                Em conformidade com a LGPD - Lei Geral de Proteção de Dados
              </p>
            </div>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;
