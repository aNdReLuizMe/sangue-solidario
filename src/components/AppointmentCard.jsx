import React from 'react';

const AppointmentCard = ({ appointment, onEdit, onDelete }) => {
  // Formatar data para exibição
  const formatDate = (dateString) => {
    // Criar data local para evitar problemas de fuso horário
    const [year, month, day] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    
    const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

    return {
      weekDay: weekDays[date.getDay()],
      day: date.getDate(),
      month: months[date.getMonth()],
      year: date.getFullYear()
    };
  };

  // Formatar local
  const formatLocation = (location) => {
    const locations = {
      'hemocentro': 'Hemocentro Regional de Três Lagoas',
      'ufms': 'Campus UFMS'
    };
    return locations[location] || location;
  };

  // Formatar status
  const getStatusInfo = (status) => {
    const statusMap = {
      'agendado': { color: 'bg-blue-100 text-blue-800', text: 'Agendado', icon: 'fa-calendar-check' },
      'confirmado': { color: 'bg-green-100 text-green-800', text: 'Confirmado', icon: 'fa-check-circle' },
      'realizado': { color: 'bg-purple-100 text-purple-800', text: 'Realizado', icon: 'fa-heart' },
      'cancelado': { color: 'bg-red-100 text-red-800', text: 'Cancelado', icon: 'fa-times-circle' }
    };
    return statusMap[status] || statusMap['agendado'];
  };

  const { weekDay, day, month, year } = formatDate(appointment.date);
  const statusInfo = getStatusInfo(appointment.status);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500 mb-8">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Agendamento de Doação</h3>
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color} mt-1`}>
            <i className={`fas ${statusInfo.icon} mr-1`}></i>
            {statusInfo.text}
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(appointment)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Editar agendamento"
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            onClick={() => {
              console.log('Clicou para excluir agendamento:', appointment.id);
              onDelete(appointment.id);
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Excluir agendamento"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Data */}
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
            <i className="fas fa-calendar text-green-600"></i>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Data</p>
            <p className="text-sm font-semibold text-gray-800">
              {weekDay}, {day} de {month} de {year}
            </p>
          </div>
        </div>

        {/* Horário */}
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <i className="fas fa-clock text-blue-600"></i>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Horário</p>
            <p className="text-sm font-semibold text-gray-800">{appointment.time}</p>
          </div>
        </div>

        {/* Local */}
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
            <i className="fas fa-map-marker-alt text-purple-600"></i>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Local</p>
            <p className="text-sm font-semibold text-gray-800">
              {formatLocation(appointment.location)}
            </p>
          </div>
        </div>
      </div>

      {/* Notificações */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 transition-colors ${appointment.phoneNotifications
                ? 'bg-green-100 border-2 border-green-300'
                : 'bg-gray-100 border-2 border-gray-300'
                }`}>
                <i className={`fas fa-sms text-sm ${appointment.phoneNotifications ? 'text-green-600' : 'text-gray-400'
                  }`}></i>
              </div>
              <div className="flex flex-col">
                <span className={`text-xs font-medium ${appointment.phoneNotifications ? 'text-green-600' : 'text-gray-500'
                  }`}>
                  SMS
                </span>
                <span className={`text-xs ${appointment.phoneNotifications ? 'text-green-500' : 'text-gray-400'
                  }`}>
                  {appointment.phoneNotifications ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 transition-colors ${appointment.emailNotifications
                ? 'bg-green-100 border-2 border-green-300'
                : 'bg-gray-100 border-2 border-gray-300'
                }`}>
                <i className={`fas fa-envelope text-sm ${appointment.emailNotifications ? 'text-green-600' : 'text-gray-400'
                  }`}></i>
              </div>
              <div className="flex flex-col">
                <span className={`text-xs font-medium ${appointment.emailNotifications ? 'text-green-600' : 'text-gray-500'
                  }`}>
                  Email
                </span>
                <span className={`text-xs ${appointment.emailNotifications ? 'text-green-500' : 'text-gray-400'
                  }`}>
                  {appointment.emailNotifications ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-500">
            Agendado em {new Date(appointment.createdAt).toLocaleDateString('pt-BR')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
