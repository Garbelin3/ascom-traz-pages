
import React from 'react';
import ModernNavBar from '../components/modern/ModernNavBar';
import ModernCTAButton from '../components/modern/ModernCTAButton';
import ModernBenefitCard from '../components/modern/ModernBenefitCard';
import ModernStepCard from '../components/modern/ModernStepCard';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Bike, ShoppingCart, Home, MapPin, UserPlus, Check, Truck, ArrowRight, Sparkles, Zap, Heart } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Modern Navbar */}
      <ModernNavBar />

      {/* Hero Section with Enhanced Design */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 bg-gradient-to-br from-white via-blue-50/50 to-blue-100/30 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-ascom/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-48 h-48 bg-ascom-light/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.6, 0.3, 0.6]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>

        <div className="ascom-container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Content */}
            <motion.div 
              className="lg:w-1/2 space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center px-4 py-2 bg-ascom/10 text-ascom rounded-full text-sm font-medium border border-ascom/20"
              >
                <Sparkles size={16} className="mr-2" />
                Transformando Comunidades
              </motion.div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 leading-tight">
                <span className="block">Conecte-se,</span>
                <span className="block bg-gradient-to-r from-ascom to-ascom-light bg-clip-text text-transparent">
                  Entregue,
                </span>
                <span className="block">Transforme</span>
                <span className="block text-3xl md:text-4xl lg:text-5xl font-normal text-gray-600 mt-2">
                  Sua Renda e Sua Quebrada!
                </span>
              </h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Valorizamos entregadores das periferias, conectando talentos locais com oportunidades reais de renda e fortalecendo o comércio da sua região.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <ModernCTAButton
                  text="Sou Entregador"
                  href="/cadastro-entregador"
                  primary={true}
                  variant="gradient"
                  size="lg"
                  icon={<Bike size={24} />}
                  className="w-full sm:w-auto"
                />
                <ModernCTAButton
                  text="Tenho Comércio"
                  href="/cadastro-comercio"
                  primary={false}
                  size="lg"
                  icon={<ShoppingCart size={24} />}
                  className="w-full sm:w-auto"
                />
              </motion.div>
            </motion.div>
            
            {/* Hero Image */}
            <motion.div 
              className="lg:w-1/2 flex justify-center"
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                <motion.img 
                  src="/img.jpg" 
                  alt="Entregador em ação"
                  className="rounded-3xl shadow-2xl w-full max-w-lg object-cover"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 glass p-4 rounded-2xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Zap className="text-ascom" size={24} />
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-4 -left-4 glass p-4 rounded-2xl"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Heart className="text-ascom-light" size={24} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nossa Missão Section */}
      <section id="sobre" className="py-24 bg-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-ascom/5 to-transparent"
          initial={{ x: "-100%" }}
          whileInView={{ x: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        <div className="ascom-container relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Fortalecendo Comunidades, Gerando Oportunidades</h2>
            <p className="section-subtitle">
              A Ascom é a Associação Comunitária de Desenvolvimento à Vida Humana. 
              Nosso trabalho é reconhecido oficialmente pela Prefeitura de Vila Velha como entidade de utilidade pública.
            </p>
          </motion.div>
          
          <motion.div 
            className="glass p-12 rounded-3xl border border-ascom/20 mb-12 backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 space-y-6">
                <h3 className="text-3xl font-bold text-ascom">Nossa Missão</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Criamos a plataforma Traz Comunidade para valorizar entregadores das periferias, 
                  conectando talentos locais com oportunidades reais. Nossa missão é revolucionar 
                  o modelo de entregas nas comunidades, gerando renda e fortalecendo a economia local.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="neuro p-8 border-l-4 border-ascom">
                  <div className="flex items-center mb-6">
                    <Check size={28} className="text-ascom mr-3" />
                    <h4 className="text-2xl font-bold text-gray-800">Reconhecimento Oficial</h4>
                  </div>
                  <p className="text-gray-600 text-lg">
                    A Ascom é reconhecida oficialmente pela Prefeitura de Vila Velha como entidade de utilidade pública,
                    o que reforça nosso compromisso com a transformação das comunidades periféricas.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefícios para Entregadores */}
      <section id="entregadores" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="ascom-container">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Entregador, Seu Corre Vale Mais Aqui!</h2>
            <p className="section-subtitle">
              Na Ascom Traz Comunidade, você, motoboy, biker ou autônomo, encontra oportunidades reais 
              de trabalho dentro da sua comunidade, onde os aplicativos comuns não chegam.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <ModernBenefitCard 
              icon={<MapPin />}
              title="Trabalhe Perto de Casa"
              description="Faça entregas na sua própria comunidade, economize tempo e combustível."
              delay={0}
            />
            <ModernBenefitCard 
              icon={<Bike />}
              title="Comissões Melhores"
              description="Ganhe mais por entrega comparado aos aplicativos tradicionais."
              delay={0.1}
            />
            <ModernBenefitCard 
              icon={<Home />}
              title="Renda Extra ou Principal"
              description="Você decide quanto e quando trabalhar, com total flexibilidade."
              delay={0.2}
            />
            <ModernBenefitCard 
              icon={<UserPlus />}
              title="Cadastro Seguro"
              description="Processo simples e transparente para começar a trabalhar."
              delay={0.3}
            />
            <ModernBenefitCard 
              icon={<Check />}
              title="Autonomia"
              description="Seja seu próprio chefe e organize seu horário como preferir."
              delay={0.4}
            />
            <ModernBenefitCard 
              icon={<Check />}
              title="Suporte Direto"
              description="Atendimento pelo WhatsApp para resolver qualquer questão."
              delay={0.5}
            />
          </div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <ModernCTAButton 
              text="Cadastre-se como Entregador Agora!"
              href="/cadastro-entregador"
              variant="gradient"
              size="lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-24 bg-white">
        <div className="ascom-container">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Destaque Sua Quebrada. Faça Parte da Mudança!</h2>
            <p className="section-subtitle">
              Em apenas 3 passos simples, você pode começar a transformar sua comunidade e sua renda.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <ModernStepCard 
              number={1}
              title="Cadastre-se"
              description="O primeiro passo para transformar sua renda e sua comunidade. Preencha um formulário simples e rápido."
              delay={0}
            />
            <ModernStepCard 
              number={2}
              title="Conecte-se"
              description="Faça parte da nossa rede de entregadores e comércios parceiros. Comece a receber ou solicitar entregas."
              delay={0.2}
            />
            <ModernStepCard 
              number={3}
              title="Transforme"
              description="Movimente a economia local, gere renda e mude a realidade da sua comunidade conosco."
              delay={0.4}
              isActive={true}
            />
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="ascom-container">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Pronto para Começar?</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Cadastre-se agora e comece a fazer parte dessa rede que movimenta e transforma.
              Junte-se a nós e seja protagonista dessa mudança!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <ModernCTAButton
                text="Sou Entregador"
                href="/cadastro-entregador"
                variant="gradient"
                size="lg"
                icon={<Bike size={24} />}
                className="w-full sm:w-auto"
              />
              <ModernCTAButton
                text="Tenho um Comércio"
                href="/cadastro-comercio"
                primary={false}
                size="lg"
                icon={<ShoppingCart size={24} />}
                className="w-full sm:w-auto"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
