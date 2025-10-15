import React from 'react';

const CustomModal = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  type = 'info',
  showCancel = false,
  onConfirm,
  confirmText = 'OK',
  cancelText = 'Cancelar'
}) => {
  if (!isOpen) return null;

  const getIconAndColors = () => {
    switch (type) {
      case 'success':
        return {
          icon: 'fas fa-check-circle',
          iconColor: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-700',
          buttonColor: 'bg-green-600 hover:bg-green-700'
        };
      case 'warning':
        return {
          icon: 'fas fa-exclamation-triangle',
          iconColor: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-700',
          buttonColor: 'bg-yellow-600 hover:bg-yellow-700'
        };
      case 'error':
        return {
          icon: 'fas fa-times-circle',
          iconColor: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-700',
          buttonColor: 'bg-red-600 hover:bg-red-700'
        };
      default:
        return {
          icon: 'fas fa-info-circle',
          iconColor: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-700',
          buttonColor: 'bg-blue-600 hover:bg-blue-700'
        };
    }
  };

  const { icon, iconColor, bgColor, borderColor, textColor, buttonColor } = getIconAndColors();

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 ease-in-out scale-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <i className={`${icon} text-2xl ${iconColor} mr-3`}></i>
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {/* Message */}
        <div className={`${bgColor} ${borderColor} border rounded-lg p-4 mb-6`}>
          <p className={`${textColor} leading-relaxed`}>{message}</p>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          {showCancel && (
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={handleConfirm}
            className={`px-6 py-2 text-white rounded-lg transition-colors ${buttonColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
