import React from 'react';
import NavBar from '../components/NavBar';
import CallToActionButton from '../components/CallToActionButton';
import BenefitCard from '../components/BenefitCard';
import StepCard from '../components/StepCard';
import Footer from '../components/Footer';
import { Bike, ShoppingCart, Home, MapPin, UserPlus, Check, Truck, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <NavBar />

      {/* Hero Section */}
      <section className="pt-28 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-white via-blue-50 to-blue-100">
        <div className="ascom-container">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
                Conecte-se, Entregue, Transforme Sua Renda e Sua Quebrada!
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Valorizamos entregadores das periferias, conectando talentos locais com oportunidades reais de renda e fortalecendo o comércio da sua região.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <CallToActionButton
                  text="Sou Entregador, Quero me Cadastrar"
                  href="/cadastro-entregador"
                  primary={true}
                  className="w-full sm:w-auto"
                />
                <CallToActionButton
                  text="Sou Comércio, Preciso de Entregas"
                  href="/cadastro-comercio"
                  primary={false}
                  className="w-full sm:w-auto"
                />
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="/img.jpg" 
                alt="Entregador em ação"
                className="rounded-lg shadow-xl w-full max-w-md object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quem Somos / Nossa Missão Section */}
      <section id="sobre" className="py-20 bg-white">
        <div className="ascom-container">
          <div className="text-center mb-16">
            <h2 className="section-title">Fortalecendo Comunidades, Gerando Oportunidades</h2>
            <p className="section-subtitle">
              A Ascom é a Associação Comunitária de Desenvolvimento à Vida Humana. 
              Nosso trabalho é reconhecido oficialmente pela Prefeitura de Vila Velha como entidade de utilidade pública.
            </p>
          </div>
          
          <div className="bg-ascom bg-opacity-5 rounded-xl p-8 border border-ascom border-opacity-20 mb-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold text-ascom mb-4">Nossa Missão</h3>
                <p className="text-gray-700 mb-4">
                  Criamos a plataforma Traz Comunidade para valorizar entregadores das periferias, 
                  conectando talentos locais com oportunidades reais. Nossa missão é revolucionar 
                  o modelo de entregas nas comunidades, gerando renda e fortalecendo a economia local.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-ascom">
                  <div className="flex items-center mb-4">
                    <Check size={24} className="text-ascom mr-2" />
                    <h4 className="text-xl font-bold text-gray-800">Reconhecimento Oficial</h4>
                  </div>
                  <p className="text-gray-600">
                    A Ascom é reconhecida oficialmente pela Prefeitura de Vila Velha como entidade de utilidade pública,
                    o que reforça nosso compromisso com a transformação das comunidades periféricas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios para Entregadores Section */}
      <section id="entregadores" className="py-20 bg-gray-50">
        <div className="ascom-container">
          <div className="text-center mb-16">
            <h2 className="section-title">Entregador, Seu Corre Vale Mais Aqui!</h2>
            <p className="section-subtitle">
              Na Ascom Traz Comunidade, você, motoboy, biker ou autônomo, encontra oportunidades reais 
              de trabalho dentro da sua comunidade, onde os aplicativos comuns não chegam. 
              Chega de ser invisível. Aqui, você é protagonista do seu próprio faturamento.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <BenefitCard 
              icon={<MapPin />}
              title="Trabalhe Perto de Casa"
              description="Faça entregas na sua própria comunidade, economize tempo e combustível."
            />
            <BenefitCard 
              icon={<Bike />}
              title="Comissões Melhores"
              description="Ganhe mais por entrega comparado aos aplicativos tradicionais."
            />
            <BenefitCard 
              icon={<Home />}
              title="Renda Extra ou Principal"
              description="Você decide quanto e quando trabalhar, com total flexibilidade."
            />
            <BenefitCard 
              icon={<UserPlus />}
              title="Cadastro Seguro"
              description="Processo simples e transparente para começar a trabalhar."
            />
            <BenefitCard 
              icon={<Check />}
              title="Autonomia"
              description="Seja seu próprio chefe e organize seu horário como preferir."
            />
            <BenefitCard 
              icon={<Check />}
              title="Suporte Direto"
              description="Atendimento pelo WhatsApp para resolver qualquer questão."
            />
          </div>
          
          <div className="mt-12 text-center">
            <CallToActionButton 
              text="Cadastre-se como Entregador Agora!"
              href="/cadastro-entregador"
              primary={true}
            />
          </div>
        </div>
      </section>

      {/* Benefícios para Comércios Locais Section */}
      <section id="comercios" className="py-20 bg-white">
        <div className="ascom-container">
          <div className="text-center mb-16">
            <h2 className="section-title">Comércio Local, Entregas Rápidas e que Fortalecem o Bairro!</h2>
            <p className="section-subtitle">
              Empresas que precisam de entregas no bairro ou nas redondezas encontram na Ascom Traz Comunidade 
              uma solução ágil, sem complicação e que ainda contribui para a economia local.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <BenefitCard 
              icon={<Truck />}
              title="Entregas Rápidas"
              description="Entregadores próximos garantem mais agilidade nas suas entregas."
            />
            <BenefitCard 
              icon={<ShoppingCart />}
              title="Tecnologia Acessível"
              description="Sistema simples e intuitivo para solicitar entregas."
            />
            <BenefitCard 
              icon={<UserPlus />}
              title="Entregadores Comprometidos"
              description="Contrate profissionais da própria comunidade, que conhecem bem a região."
            />
            <BenefitCard 
              icon={<Check />}
              title="Fortaleça a Economia Local"
              description="Ao contratar nossos serviços, você mantém a renda na comunidade."
            />
            <BenefitCard 
              icon={<Check />}
              title="Suporte Dedicado"
              description="Atendimento personalizado para o seu negócio."
            />
            <BenefitCard 
              icon={<Check />}
              title="Preços Competitivos"
              description="Valores justos para entregas, sem taxas abusivas."
            />
          </div>
          
          <div className="mt-12 text-center">
            <CallToActionButton 
              text="Solicite Entregas para seu Comércio!"
              href="/cadastro-comercio"
              primary={true}
            />
          </div>
        </div>
      </section>

      {/* Por Que Somos Diferentes / Nosso Impacto Section */}
      <section id="impacto" className="py-20 bg-gradient-to-br from-ascom to-ascom-light text-white">
        <div className="ascom-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">A Diferença que Faz a Diferença na Sua Comunidade</h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Não somos apenas mais um aplicativo de entregas. Somos um movimento de transformação local.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Check size={28} className="mr-2" /> Por Que Somos Diferentes
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <ArrowRight size={20} className="mr-2 mt-1 flex-shrink-0" />
                  <span>Atuação focada nas comunidades onde outros aplicativos não chegam</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight size={20} className="mr-2 mt-1 flex-shrink-0" />
                  <span>Entregadores locais garantem entregas mais rápidas</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight size={20} className="mr-2 mt-1 flex-shrink-0" />
                  <span>Cadastro seguro e transparente dos profissionais</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight size={20} className="mr-2 mt-1 flex-shrink-0" />
                  <span>Suporte direto pelo WhatsApp para todos os usuários</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight size={20} className="mr-2 mt-1 flex-shrink-0" />
                  <span>Tecnologia simples e acessível para todos</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Check size={28} className="mr-2" /> Nosso Impacto Real
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <ArrowRight size={20} className="mr-2 mt-1 flex-shrink-0" />
                  <span>Entregas realizadas todos os dias nas favelas e bairros periféricos</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight size={20} className="mr-2 mt-1 flex-shrink-0" />
                  <span>Geração de renda para famílias inteiras nas comunidades</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight size={20} className="mr-2 mt-1 flex-shrink-0" />
                  <span>União entre comércios locais e entregadores autônomos</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight size={20} className="mr-2 mt-1 flex-shrink-0" />
                  <span>Fortalecimento da economia da quebrada, mantendo a renda circulando localmente</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight size={20} className="mr-2 mt-1 flex-shrink-0" />
                  <span>Comunidades mais fortes, autônomas e economicamente ativas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona / Junte-se à Mudança Section */}
      <section id="como-funciona" className="py-20 bg-white">
        <div className="ascom-container">
          <div className="text-center mb-16">
            <h2 className="section-title">Destaque Sua Quebrada. Faça Parte da Mudança!</h2>
            <p className="section-subtitle">
              Em apenas 3 passos simples, você pode começar a transformar sua comunidade e sua renda.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard 
              number={1}
              title="Cadastre-se"
              description="O primeiro passo para transformar sua renda e sua comunidade. Preencha um formulário simples e rápido."
            />
            <StepCard 
              number={2}
              title="Conecte-se"
              description="Faça parte da nossa rede de entregadores e comércios parceiros. Comece a receber ou solicitar entregas."
            />
            <StepCard 
              number={3}
              title="Transforme"
              description="Movimente a economia local, gere renda e mude a realidade da sua comunidade conosco."
            />
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="py-20 bg-gray-50">
        <div className="ascom-container">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para Começar?</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Cadastre-se agora e comece a fazer parte dessa rede que movimenta e transforma.
              Junte-se a nós e seja protagonista dessa mudança!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CallToActionButton
                text="Sou Entregador"
                href="/cadastro-entregador"
                primary={true}
                className="w-full sm:w-auto px-10"
              />
              <CallToActionButton
                text="Tenho um Comércio"
                href="/cadastro-comercio"
                primary={false}
                className="w-full sm:w-auto px-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
