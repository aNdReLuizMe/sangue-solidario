import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import ProfileModal from './ProfileModal';

const Navbar = ({ currentPage, onPageChange }) => {
  const { user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setShowMobileMenu(false);
    onPageChange('home');
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
  };

  const handleProfileClick = () => {
    setShowProfileModal(true);
    setShowUserMenu(false);
    setShowMobileMenu(false);
  };

  useEffect(() => {
    const handleOpenLoginModal = () => {
      setShowLoginModal(true);
    };

    window.addEventListener('openLoginModal', handleOpenLoginModal);
    
    return () => {
      window.removeEventListener('openLoginModal', handleOpenLoginModal);
    };
  }, []);

  return (
    <>
      <nav className="gradient-bg text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <i className="fas fa-hand-holding-heart text-3xl"></i>
              <span className="text-2xl font-bold">Sangue Solidário</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              <button
                onClick={() => onPageChange('home')}
                className={`nav-link hover:text-red-200 transition ${
                  currentPage === 'home' ? 'text-red-200' : ''
                }`}
              >
                Home
              </button>
              <button
                onClick={() => onPageChange('about')}
                className={`nav-link hover:text-red-200 transition ${
                  currentPage === 'about' ? 'text-red-200' : ''
                }`}
              >
                Sobre
              </button>
              <button
                onClick={() => onPageChange('contact')}
                className={`nav-link hover:text-red-200 transition ${
                  currentPage === 'contact' ? 'text-red-200' : ''
                }`}
              >
                Contato
              </button>
            </div>

            {/* Desktop Auth Buttons */}
            {!user && (
              <div className="hidden md:flex space-x-3">
                <button onClick={handleLoginClick} className="btn-secondary">
                  Login
                </button>
                <button onClick={handleRegisterClick} className="btn-primary">
                  Cadastre-se
                </button>
              </div>
            )}

            {/* Desktop User Menu */}
            {user && (
              <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 hover:text-red-200 transition"
                  >
                    <i className="fas fa-user-circle text-2xl"></i>
                    <span>{user.name}</span>
                    <i className="fas fa-chevron-down text-sm"></i>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      <button
                        onClick={handleProfileClick}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <i className="fas fa-user mr-2"></i>Perfil
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <i className="fas fa-sign-out-alt mr-2"></i>Sair
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden text-2xl"
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden pb-4 px-4 border-t border-red-400">
              <div className="flex flex-col space-y-2 mt-4">
                <button
                  onClick={() => {
                    onPageChange('home');
                    setShowMobileMenu(false);
                  }}
                  className="text-left py-2 hover:text-red-200"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    onPageChange('about');
                    setShowMobileMenu(false);
                  }}
                  className="text-left py-2 hover:text-red-200"
                >
                  Sobre
                </button>
                <button
                  onClick={() => {
                    onPageChange('contact');
                    setShowMobileMenu(false);
                  }}
                  className="text-left py-2 hover:text-red-200"
                >
                  Contato
                </button>
                
                {!user ? (
                  <>
                    <div className="border-t border-red-400 pt-2 mt-2">
                      <button
                        onClick={() => {
                          handleLoginClick();
                          setShowMobileMenu(false);
                        }}
                        className="block w-full text-left py-2 hover:text-red-200"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          handleRegisterClick();
                          setShowMobileMenu(false);
                        }}
                        className="block w-full text-left py-2 hover:text-red-200"
                      >
                        Cadastre-se
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="border-t border-red-400 pt-2 mt-2">
                    <button
                      onClick={() => {
                        handleProfileClick();
                        setShowMobileMenu(false);
                      }}
                      className="block w-full text-left py-2 hover:text-red-200"
                    >
                      <i className="fas fa-user-circle mr-2"></i>{user.name}
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowMobileMenu(false);
                      }}
                      className="block w-full text-left py-2 hover:text-red-200"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>Sair
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onRegisterClick={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onLoginClick={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />

      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </>
  );
};

export default Navbar;
