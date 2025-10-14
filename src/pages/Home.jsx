import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import CustomModal from '../components/CustomModal';
import AppointmentCard from '../components/AppointmentCard';

const Home = ({ onPageChange }) => {
  const { user, updateUser } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  const handleAgendarClick = () => {
    if (user) {
      onPageChange('appointment');
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    // Disparar evento personalizado para abrir o modal de login na Navbar
    window.dispatchEvent(new CustomEvent('openLoginModal'));
  };

  // Funções para gerenciar agendamentos
  const handleEditAppointment = (appointment) => {
    // Por enquanto, redireciona para a página de agendamento
    // TODO: Implementar modal de edição
    onPageChange('appointment');
  };

  const handleDeleteAppointment = (appointmentId) => {
    setAppointmentToDelete(appointmentId);
    setShowDeleteModal(true);
  };

  const confirmDeleteAppointment = async () => {
    try {
      const updatedAppointments = user.appointments.filter(apt => apt.id !== appointmentToDelete);
      const updatedUser = {
        ...user,
        appointments: updatedAppointments
      };
      await updateUser(updatedUser);
      setShowDeleteModal(false);
      setAppointmentToDelete(null);
    } catch (error) {
      console.error('Erro ao excluir agendamento:', error);
      alert('Erro ao excluir agendamento. Tente novamente.');
    }
  };

  // Obter próximo agendamento (mais recente)
  const getNextAppointment = () => {
    if (!user?.appointments || user.appointments.length === 0) return null;
    
    // Filtrar apenas agendamentos futuros e ordenar por data
    const futureAppointments = user.appointments
      .filter(apt => new Date(apt.date) >= new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return futureAppointments.length > 0 ? futureAppointments[0] : null;
  };

  const nextAppointment = getNextAppointment();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="gradient-bg text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Doe Sangue, Salve Vidas
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-red-100">
            Uma doação pode salvar até 4 vidas. Agende sua doação de forma rápida e fácil.
          </p>
          <button
            onClick={handleAgendarClick}
            className="px-8 py-4 bg-white text-red-700 rounded-lg text-lg font-semibold hover:bg-red-50 transition transform hover:scale-105"
          >
            <i className="fas fa-calendar-plus mr-2"></i>
            Agendar Doação
          </button>
        </div>
      </div>

      {/* Próximo Agendamento */}
      {user && nextAppointment && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              <i className="fas fa-calendar-check text-red-600 mr-2"></i>
              Seu Próximo Agendamento
            </h2>
            <AppointmentCard
              appointment={nextAppointment}
              onEdit={handleEditAppointment}
              onDelete={handleDeleteAppointment}
            />
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Doações do Mês */}
          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Doações este Mês</h3>
              <i className="fas fa-hand-holding-heart text-3xl text-red-600"></i>
            </div>
            <div className="text-5xl font-bold text-red-600 mb-2">247</div>
            <p className="text-sm text-gray-600">
              Meta: <span className="font-semibold">250</span> doações/mês
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div 
                className="progress-bar"
                style={{ width: '98.8%' }}
              ></div>
            </div>
          </div>

          {/* Novos Doadores */}
          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Novos Doadores</h3>
              <i className="fas fa-users text-3xl text-green-600"></i>
            </div>
            <div className="text-5xl font-bold text-green-600 mb-2">63</div>
            <p className="text-sm text-gray-600">
              +<span className="font-semibold">27</span>% vs. mês anterior
            </p>
            <div className="flex items-center mt-3 text-green-600">
              <i className="fas fa-arrow-up mr-2"></i>
              <span className="text-sm font-semibold">Em crescimento</span>
            </div>
          </div>

          {/* Vidas Salvas */}
          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Vidas Salvas</h3>
              <i className="fas fa-heartbeat text-3xl text-purple-600"></i>
            </div>
            <div className="text-5xl font-bold text-purple-600 mb-2">988</div>
            <p className="text-sm text-gray-600">
              Aproximadamente 4 vidas por doação
            </p>
            <div className="flex items-center mt-3 text-purple-600">
              <i className="fas fa-star mr-2"></i>
              <span className="text-sm font-semibold">Impacto extraordinário</span>
            </div>
          </div>
        </div>


        {/* Blood Stock Levels */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Níveis de Estoque</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { type: 'A+', level: 85, status: 'Adequado' },
              { type: 'A-', level: 60, status: 'Baixo' },
              { type: 'B+', level: 45, status: 'Baixo' },
              { type: 'B-', level: 20, status: 'Crítico' },
              { type: 'AB+', level: 70, status: 'Adequado' },
              { type: 'AB-', level: 55, status: 'Baixo' },
              { type: 'O+', level: 40, status: 'Baixo' },
              { type: 'O-', level: 15, status: 'Crítico' }
            ].map((bloodType) => (
              <div key={bloodType.type} className="text-center">
                <div className="text-2xl font-bold mb-2">{bloodType.type}</div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className={`h-3 rounded-full ${
                      bloodType.level >= 70
                        ? 'bg-green-500'
                        : bloodType.level >= 40
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${bloodType.level}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600">{bloodType.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Modals */}
      <CustomModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onConfirm={handleLoginRedirect}
        title="Login Necessário"
        message="Você precisa fazer login para agendar uma doação de sangue. Deseja ser redirecionado para a página de login?"
        type="warning"
        showCancel={true}
        confirmText="Ir para Login"
        cancelText="Cancelar"
      />

      <CustomModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setAppointmentToDelete(null);
        }}
        onConfirm={confirmDeleteAppointment}
        title="Excluir Agendamento"
        message="Tem certeza que deseja excluir este agendamento? Esta ação não pode ser desfeita."
        type="error"
        showCancel={true}
        confirmText="Excluir"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default Home;
