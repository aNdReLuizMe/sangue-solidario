import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const RegisterModal = ({ isOpen, onClose, onLoginClick }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    bloodType: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validações
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    if (!termsAccepted) {
      setError('Você deve aceitar os termos de uso');
      setIsLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...userData } = formData;
      await register(userData);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-8">
          <i className="fas fa-user-plus text-5xl text-red-600 mb-4"></i>
          <h2 className="text-3xl font-bold text-gray-800">Junte-se a nós!</h2>
          <p className="text-gray-600 mt-2">Cadastre-se e comece a salvar vidas</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Telefone *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="(67) 99999-9999"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Data de Nascimento *
              </label>
              <input
                type="date"
                name="birthDate"
                required
                value={formData.birthDate}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Tipo Sanguíneo
              </label>
              <select
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Selecione</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Senha *
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="••••••••"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">
                Confirmar Senha *
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 mr-3"
            />
            <label className="text-sm text-gray-600">
              Concordo com os termos de uso e política de privacidade (LGPD)
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-3 text-lg"
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Cadastrando...
              </>
            ) : (
              'Cadastrar'
            )}
          </button>

          <div className="text-center">
            <p className="text-gray-600">
              Já tem uma conta?{' '}
              <button
                type="button"
                onClick={onLoginClick}
                className="text-red-600 font-semibold hover:underline"
              >
                Faça login
              </button>
            </p>
          </div>
        </form>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;
