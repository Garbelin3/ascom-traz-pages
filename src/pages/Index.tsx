
import React from 'react';
import ModernNavBar from '../components/modern/ModernNavBar';
import ModernCTAButton from '../components/modern/ModernCTAButton';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Bike, User, MapPin, Sparkles } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Modern Navbar */}
      <ModernNavBar />

      {/* Hero Section */}
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
                  Peça Corridas,
                </span>
                <span className="block text-3xl md:text-4xl lg:text-5xl font-normal text-gray-600 mt-2">
                  Transforme Sua Comunidade!
                </span>
              </h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Plataforma que conecta entregadores das periferias com pessoas que precisam de corridas e entregas na comunidade.
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
                  text="Quero Pedir uma Corrida"
                  href="/cadastro-passageiro"
                  primary={false}
                  size="lg"
                  icon={<User size={24} />}
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
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 bg-white">
        <div className="ascom-container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Como Funciona</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simples e direto: conectamos quem precisa com quem pode ajudar na sua comunidade.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <div className="bg-ascom text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Cadastre-se</h3>
              <p className="text-gray-600">Se inscreva como entregador ou usuário em poucos cliques.</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-ascom text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Conecte-se</h3>
              <p className="text-gray-600">Entregadores recebem solicitações de corridas da região.</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-ascom text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Transforme</h3>
              <p className="text-gray-600">Gere renda e fortaleça a economia da sua comunidade.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="ascom-container">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para Começar?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Faça parte dessa rede que movimenta e transforma comunidades.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ModernCTAButton
                text="Sou Entregador"
                href="/cadastro-entregador"
                variant="gradient"
                size="lg"
                icon={<Bike size={24} />}
                className="w-full sm:w-auto"
              />
              <ModernCTAButton
                text="Quero Pedir uma Corrida"
                href="/cadastro-passageiro"
                primary={false}
                size="lg"
                icon={<User size={24} />}
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
