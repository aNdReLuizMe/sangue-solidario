import React, { useState } from 'react';
import CustomModal from '../components/CustomModal';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular envio de mensagem
    setShowSuccessModal(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Entre em Contato
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Envie uma Mensagem</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Nome</label>
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
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
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
                <label className="block text-gray-700 font-semibold mb-2">Telefone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="(67) 99999-9999"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Mensagem</label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Sua mensagem..."
                ></textarea>
              </div>
              <button type="submit" className="w-full btn-primary">
                <i className="fas fa-paper-plane mr-2"></i>
                Enviar Mensagem
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Informações de Contato</h3>
              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-map-marker-alt text-xl text-red-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Endereço</h4>
                    <p className="text-gray-600">Rua Manoel Rodrigues Artez, 520</p>
                    <p className="text-gray-600">Jardim Primaveril (Colinos)</p>
                    <p className="text-gray-600">Três Lagoas - MS, 79620-230</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-phone text-xl text-green-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Telefone</h4>
                    <p className="text-gray-600">(67) 3522-7959</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="fab fa-whatsapp text-xl text-green-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">WhatsApp</h4>
                    <p className="text-gray-600">(67) 98163-2387</p>
                    <p className="text-gray-600">(67) 99270-0312</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-globe text-xl text-blue-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Website</h4>
                    <a
                      href="https://www.hemosul.ms.gov.br"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      www.hemosul.ms.gov.br
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-envelope text-xl text-purple-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                    <p className="text-gray-600">contato@hemosul.ms.gov.br</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Horário de Atendimento</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Segunda a Sexta</span>
                  <span className="font-bold text-red-600">7h às 12h</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Sábado</span>
                  <span className="font-bold text-red-600">7h às 12h</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 font-medium">Domingo</span>
                  <span className="font-bold text-gray-400">Fechado</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <i className="fas fa-info-circle text-blue-600 mr-2"></i>
                  <strong>Importante:</strong> Recomendamos agendamento prévio para evitar tempo de
                  espera.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800">
              <i className="fas fa-map-marked-alt text-red-600 mr-2"></i>
              Nossa Localização
            </h3>
            <p className="text-gray-600 mt-2">Hemosul Três Lagoas - Rua Manoel Rodrigues Artez, 520</p>
          </div>
          <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.1937856948786!2d-51.69684!3d-20.751896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9499d5dbd6d28a37%3A0x7e0e3d0f8f0e3d0!2sR.%20Manoel%20Rodrigues%20Artez%2C%20520%20-%20Jardim%20Primaveril%2C%20Tr%C3%AAs%20Lagoas%20-%20MS%2C%2079620-230!5e0!3m2!1spt-BR!2sbr!4v1234567890"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do Hemosul Três Lagoas"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <CustomModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Mensagem Enviada!"
        message="Sua mensagem foi enviada com sucesso! Entraremos em contato em breve."
        type="success"
        showCancel={false}
        confirmText="OK"
      />
    </div>
  );
};

export default Contact;
