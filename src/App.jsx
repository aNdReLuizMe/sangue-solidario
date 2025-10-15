import React, { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    const forceScrollToTop = () => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
    
    forceScrollToTop();
    requestAnimationFrame(forceScrollToTop);
    setTimeout(forceScrollToTop, 50);
    setTimeout(forceScrollToTop, 150);
    setTimeout(forceScrollToTop, 300);
  }, [currentPage]);
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
        
        <footer className="gradient-bg text-white py-12 mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
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
            <div className="border-t border-red-400 pt-6 text-center">
              <p className="text-red-100 mb-2">Projeto de Extensão - UFMS | Hemosul Três Lagoas</p>
              <p className="text-sm text-red-200">
                © 2025 Sangue Solidário. Desenvolvido por{'  '}
                <a href="https://www.linkedin.com/in/andreluizme/" target="_blank" rel="noopener noreferrer" 
                       class="inline-flex items-center hover:text-blue-400 transition-colors">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </a> {'  '}para salvar vidas.
              </p>
            </div>
          </div>
        </footer>
        
        <ScrollToTop />
      </div>
    </AuthProvider>
  );
}

export default App;
