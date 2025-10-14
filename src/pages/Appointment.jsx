import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Appointment = ({ onPageChange }) => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    location: '',
    date: '',
    time: '',
    phoneNotifications: false,
    emailNotifications: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Gerar dias do calendário
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = date.getMonth() === month;
      const isPast = date < today;
      const isFuture = date > maxDate;
      const isDisabled = isPast || isFuture || date.getDay() === 0; // Desabilitar domingos

      days.push({
        date,
        isCurrentMonth,
        isDisabled,
        isSelected: selectedDate && date.toDateString() === selectedDate.toDateString()
      });
    }

    return days;
  };

  // Gerar horários disponíveis
  const generateTimeSlots = () => {
    return [
      '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
      '10:00', '10:30', '11:00', '11:30', '12:00'
    ];
  };

  const handleDateSelect = (date) => {
    if (!date.isDisabled) {
      setSelectedDate(date.date);
      setFormData({
        ...formData,
        date: date.date.toISOString().split('T')[0]
      });
    }
  };

  const handleTimeSelect = (time) => {
    setFormData({
      ...formData,
      time
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!selectedDate || !formData.time) {
        throw new Error('Por favor, selecione uma data e horário');
      }

      const appointment = {
        id: Date.now().toString(),
        date: formData.date,
        time: formData.time,
        location: formData.location,
        phoneNotifications: formData.phoneNotifications,
        emailNotifications: formData.emailNotifications,
        status: 'agendado',
        createdAt: new Date().toISOString()
      };

      // Atualizar usuário com novo agendamento
      const updatedUser = {
        ...user,
        appointments: [...(user.appointments || []), appointment]
      };

      await updateUser(updatedUser);
      setSuccess('Agendamento realizado com sucesso!');
      
      setTimeout(() => {
        onPageChange('home');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <i className="fas fa-lock text-6xl text-gray-400 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Acesso Restrito</h2>
          <p className="text-gray-600 mb-6">Você precisa fazer login para agendar uma doação</p>
          <button
            onClick={() => onPageChange('home')}
            className="btn-primary"
          >
            Voltar para Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Agendar Doação</h2>
          <p className="text-gray-600 mb-8">
            Escolha uma data, horário e local para sua doação de sangue.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              <i className="fas fa-check-circle mr-2"></i>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Local</label>
              <select
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Selecione o local</option>
                <option value="hemocentro">Hemocentro Regional de Três Lagoas</option>
                <option value="ufms">Campus UFMS</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-4">Data</label>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <button
                    type="button"
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                    className="p-2 hover:bg-gray-200 rounded"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <span className="text-lg font-bold">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                    className="p-2 hover:bg-gray-200 rounded"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center">
                  {weekDays.map((day) => (
                    <div key={day} className="font-semibold text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                  {generateCalendarDays().map((day, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleDateSelect(day)}
                      disabled={day.isDisabled}
                      className={`py-2 rounded transition-colors ${
                        day.isDisabled
                          ? 'text-gray-300 cursor-not-allowed'
                          : day.isSelected
                          ? 'bg-red-600 text-white'
                          : day.isCurrentMonth
                          ? 'text-gray-700 hover:bg-red-100'
                          : 'text-gray-400'
                      }`}
                    >
                      {day.date.getDate()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Horário</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {generateTimeSlots().map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleTimeSelect(time)}
                    className={`py-2 px-4 rounded-lg border transition-colors ${
                      formData.time === time
                        ? 'bg-red-600 text-white border-red-600'
                        : 'border-gray-300 text-gray-700 hover:border-red-500'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Preferências de Notificação</h3>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="phoneNotifications"
                  name="phoneNotifications"
                  checked={formData.phoneNotifications}
                  onChange={handleChange}
                  className="mr-3"
                />
                <label htmlFor="phoneNotifications" className="text-gray-700">
                  Permite enviar notificações para seu celular?
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  name="emailNotifications"
                  checked={formData.emailNotifications}
                  onChange={handleChange}
                  className="mr-3"
                />
                <label htmlFor="emailNotifications" className="text-gray-700">
                  Permite enviar notificações para seu email?
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-4 text-lg"
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Agendando...
                </>
              ) : (
                <>
                  <i className="fas fa-check-circle mr-2"></i>
                  Confirmar Agendamento
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
