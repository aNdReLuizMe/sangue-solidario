import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Appointment = ({ onPageChange, editingAppointment = null }) => {
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    if (editingAppointment) {
      setIsEditMode(true);
      const [year, month, day] = editingAppointment.date.split('-');
      const appointmentDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

      setFormData({
        location: editingAppointment.location,
        date: editingAppointment.date,
        time: editingAppointment.time,
        phoneNotifications: editingAppointment.phoneNotifications,
        emailNotifications: editingAppointment.emailNotifications
      });
      setSelectedDate(appointmentDate);
      setCurrentDate(new Date(appointmentDate.getFullYear(), appointmentDate.getMonth()));
    }
  }, [editingAppointment]);
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
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
      const isDisabled = isPast || isFuture || date.getDay() === 0;

      days.push({
        date,
        isCurrentMonth,
        isDisabled,
        isSelected: selectedDate && date.toDateString() === selectedDate.toDateString()
      });
    }

    return days;
  };


  const generateTimeSlots = () => {
    return [
      '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
      '10:00', '10:30', '11:00', '11:30', '12:00'
    ];
  };

  const handleDateSelect = (date) => {
    if (!date.isDisabled) {
      setSelectedDate(date.date);
      const year = date.date.getFullYear();
      const month = String(date.date.getMonth() + 1).padStart(2, '0');
      const day = String(date.date.getDate()).padStart(2, '0');
      const localDateString = `${year}-${month}-${day}`;

      setFormData({
        ...formData,
        date: localDateString
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

      if (isEditMode) {
        const updatedAppointments = user.appointments.map(apt =>
          apt.id === editingAppointment.id
            ? {
              ...apt,
              date: formData.date,
              time: formData.time,
              location: formData.location,
              phoneNotifications: formData.phoneNotifications,
              emailNotifications: formData.emailNotifications,
              updatedAt: new Date().toISOString()
            }
            : apt
        );

        const updatedUser = {
          ...user,
          appointments: updatedAppointments
        };

        await updateUser(updatedUser);
        setSuccess('Agendamento atualizado com sucesso!');
      } else {
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

        const updatedUser = {
          ...user,
          appointments: [...(user.appointments || []), appointment]
        };

        await updateUser(updatedUser);
        setSuccess('Agendamento criado com sucesso!');
      }


      setCountdown(2);
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            onPageChange('home');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
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
          {isEditMode && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <i className="fas fa-edit text-blue-600 text-xl mr-3"></i>
                <div>
                  <h4 className="font-semibold text-blue-800">Modo de Edição</h4>
                  <p className="text-blue-600 text-sm">Você está editando um agendamento existente</p>
                </div>
              </div>
            </div>
          )}

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {isEditMode ? 'Editar Agendamento' : 'Agendar Doação'}
          </h2>
          <p className="text-gray-600 mb-8">
            {isEditMode
              ? 'Altere os dados do seu agendamento conforme necessário.'
              : 'Escolha uma data, horário e local para sua doação de sangue.'
            }
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              {error}
            </div>
          )}

          {success && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center transform animate-scaleIn">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <i className="fas fa-check-circle text-6xl text-green-600"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {isEditMode ? 'Agendamento Atualizado!' : 'Agendamento Realizado!'}
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  {isEditMode ? 'Agendamento editado com sucesso!' : 'Agendamento criado com sucesso!'}
                </p>


                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <h4 className="font-semibold text-gray-800 mb-3 text-center">
                    {isEditMode ? 'Alterações Salvas' : 'Programação Feita'}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Data:</span>
                      <span className="font-medium">{selectedDate?.toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Horário:</span>
                      <span className="font-medium">{formData.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Local:</span>
                      <span className="font-medium">
                        {formData.location === 'hemocentro' ? 'Hemocentro Regional de Três Lagoas' : 'Campus UFMS'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">SMS:</span>
                      <span className={`font-medium ${formData.phoneNotifications ? 'text-green-600' : 'text-gray-500'}`}>
                        {formData.phoneNotifications ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className={`font-medium ${formData.emailNotifications ? 'text-green-600' : 'text-gray-500'}`}>
                        {formData.emailNotifications ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  </div>
                </div>


                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                </div>

                <div className="flex items-center justify-center text-gray-500 mb-4">
                  <div className="flex space-x-1 mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm">
                    Redirecionando em {countdown} segundo{countdown !== 1 ? 's' : ''}...
                  </span>
                </div>


                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center text-green-700 text-sm">
                    <i className="fas fa-save mr-2"></i>
                    <span>
                      {isEditMode ? 'Suas alterações foram salvas com sucesso!' : 'Seu agendamento foi criado com sucesso!'}
                    </span>
                  </div>
                </div>
              </div>
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
                      className={`py-2 rounded transition-colors ${day.isDisabled
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
                    className={`py-2 px-4 rounded-lg border transition-colors ${formData.time === time
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
                  className="mr-3 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="phoneNotifications" className="text-gray-700 cursor-pointer">
                  Permite enviar notificações para seu celular (SMS)?
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  name="emailNotifications"
                  checked={formData.emailNotifications}
                  onChange={handleChange}
                  className="mr-3 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="emailNotifications" className="text-gray-700 cursor-pointer">
                  Permite enviar notificações para seu email?
                </label>
              </div>


            </div>

            <div className="flex gap-4">
              {isEditMode && (
                <button
                  type="button"
                  onClick={() => onPageChange('home')}
                  className="flex-1 bg-gray-500 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-gray-600 transition"
                >
                  <i className="fas fa-times mr-2"></i>
                  Cancelar
                </button>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className={`${isEditMode ? 'flex-1' : 'w-full'} btn-primary py-4 text-lg`}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    {isEditMode ? 'Salvando...' : 'Agendando...'}
                  </>
                ) : (
                  <>
                    <i className={`fas ${isEditMode ? 'fa-save' : 'fa-check-circle'} mr-2`}></i>
                    {isEditMode ? 'Salvar Alterações' : 'Confirmar Agendamento'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
