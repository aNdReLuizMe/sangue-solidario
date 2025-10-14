import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Sobre o Projeto */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Sobre o Projeto Sangue Solidário
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            O projeto Sangue Solidário é uma iniciativa desenvolvida em parceria com o Hemosul Três Lagoas e a
            UFMS (Universidade Federal de Mato Grosso do Sul), com o objetivo de modernizar e facilitar o
            processo de doação de sangue na região através de uma plataforma digital intuitiva e eficiente.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Através desta plataforma, buscamos aumentar o número de doadores regulares, reduzir as taxas de não
            comparecimento aos agendamentos e promover uma cultura de solidariedade na comunidade, contribuindo
            para a manutenção dos estoques de sangue e salvando vidas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-6 bg-red-50 rounded-lg">
              <i className="fas fa-target text-4xl text-red-600 mb-3"></i>
              <h4 className="font-bold text-gray-800 mb-2">Nosso Objetivo</h4>
              <p className="text-sm text-gray-600">Aumentar em 25% o número de doadores regulares na região</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <i className="fas fa-chart-line text-4xl text-green-600 mb-3"></i>
              <h4 className="font-bold text-gray-800 mb-2">Meta de Eficiência</h4>
              <p className="text-sm text-gray-600">Reduzir em 30% a taxa de não comparecimento aos agendamentos</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <i className="fas fa-users text-4xl text-blue-600 mb-3"></i>
              <h4 className="font-bold text-gray-800 mb-2">Público-Alvo</h4>
              <p className="text-sm text-gray-600">Jovens entre 18 e 35 anos da região de Três Lagoas</p>
            </div>
          </div>
        </div>

        {/* Sobre o Hemosul */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <i className="fas fa-hospital text-4xl text-red-600 mr-4"></i>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Hemosul Três Lagoas</h2>
              <p className="text-gray-600">Hemocentro Regional de Mato Grosso do Sul</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4 leading-relaxed">
              O <strong>Hemosul (Hemocentro Coordenador de Mato Grosso do Sul)</strong> de Três Lagoas faz
              parte da Rede Hemosul MS, que é responsável pelos serviços de hemoterapia em todo o estado de
              Mato Grosso do Sul. A unidade de Três Lagoas desempenha um papel fundamental no atendimento à
              demanda de sangue da região.
            </p>

            <p className="mb-4 leading-relaxed">
              Localizado na <strong>Rua Manoel Rodrigues Artez, 520, no bairro Jardim Primaveril
              (Colinos)</strong>, o Hemosul Três Lagoas atende não apenas a cidade, mas também municípios
              vizinhos como Água Clara e Brasilândia, sendo referência regional em coleta e distribuição de
              sangue para hospitais públicos e particulares.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Missão e Importância</h3>
            <p className="mb-4 leading-relaxed">
              A unidade recebe em média <strong>250 doações por mês</strong>, volume essencial para atender a
              demanda dos serviços de saúde regionais. O trabalho de captação de doadores é contínuo e
              enfrenta desafios como o preconceito e os mitos relacionados à doação de sangue.
            </p>

            <p className="mb-4 leading-relaxed">
              Como destacado pela equipe do Hemosul: <em>"Uma bolsa de sangue salva até quatro vidas"</em>. Os
              doadores assíduos são considerados os pilares de sustentação do serviço de hemoterapia,
              permitindo que os estoques estejam sempre em condições adequadas.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Rede Hemosul MS</h3>
            <p className="mb-4 leading-relaxed">
              O Hemosul faz parte de uma rede estadual que inclui unidades em Campo Grande, Dourados, Ponta
              Porã, Paranaíba e Coxim, todas coordenadas pelo Hemocentro Coordenador localizado na capital do
              estado. Esta estrutura garante a cobertura de todo o território sul-mato-grossense com serviços
              de qualidade em hemoterapia.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
              <h4 className="font-bold text-gray-800 mb-2">
                <i className="fas fa-info-circle text-blue-600 mr-2"></i>
                Você Sabia?
              </h4>
              <p className="text-gray-700 text-sm mb-2">
                O Hemosul Três Lagoas ampliou seu horário de atendimento para incluir os sábados,
                funcionando de <strong>segunda a sábado, das 7h às 12h</strong>, facilitando ainda mais o
                acesso dos doadores.
              </p>
              <p className="text-gray-700 text-sm">
                A unidade possui toda a infraestrutura necessária para garantir a segurança e o conforto dos
                doadores, seguindo rigorosos protocolos de biossegurança estabelecidos pela ANVISA e pelo
                Ministério da Saúde.
              </p>
            </div>
          </div>
        </div>

        {/* Por que doar */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Por que Doar Sangue?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                <i className="fas fa-heart text-2xl text-red-600"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Salva Vidas</h4>
                <p className="text-gray-600 text-sm">Uma única doação pode salvar até 4 vidas através de
                  diferentes componentes do sangue</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <i className="fas fa-shield-alt text-2xl text-green-600"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Seguro e Controlado</h4>
                <p className="text-gray-600 text-sm">Todo o processo utiliza materiais descartáveis e estéreis,
                  com rigoroso controle de qualidade</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <i className="fas fa-clock text-2xl text-blue-600"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Rápido</h4>
                <p className="text-gray-600 text-sm">O procedimento completo leva cerca de 40 minutos, incluindo
                  triagem e lanche</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <i className="fas fa-hand-holding-medical text-2xl text-purple-600"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Solidariedade</h4>
                <p className="text-gray-600 text-sm">Um gesto simples que demonstra empatia e cuidado com o
                  próximo</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-3 text-center">Requisitos para Doar</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <i className="fas fa-user-check text-3xl text-red-600 mb-2"></i>
                <p className="font-semibold text-gray-800">Idade</p>
                <p className="text-gray-600">Entre 16 e 69 anos</p>
              </div>
              <div className="text-center">
                <i className="fas fa-weight text-3xl text-red-600 mb-2"></i>
                <p className="font-semibold text-gray-800">Peso</p>
                <p className="text-gray-600">Acima de 51 kg</p>
              </div>
              <div className="text-center">
                <i className="fas fa-heartbeat text-3xl text-red-600 mb-2"></i>
                <p className="font-semibold text-gray-800">Saúde</p>
                <p className="text-gray-600">Estar bem de saúde</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
