import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
const ModernNavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navItems = [{
    name: 'Início',
    href: '/',
    section: 'home'
  }, {
    name: 'Sobre',
    href: '/#sobre',
    section: 'sobre'
  }, {
    name: 'Entregadores',
    href: '/#entregadores',
    section: 'entregadores'
  }, {
    name: 'Comércios',
    href: '/#comercios',
    section: 'comercios'
  }, {
    name: 'Como Funciona',
    href: '/#como-funciona',
    section: 'como-funciona'
  }];
  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };
  return <>
      {/* Main Navigation */}
      <motion.nav initial={{
      y: -100,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass backdrop-blur-xl bg-white/80 shadow-lg' : 'bg-transparent'}`}>
        <div className="ascom-container">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <motion.div className="flex items-center space-x-3" whileHover={{
            scale: 1.05
          }} transition={{
            duration: 0.2
          }}>
              <Link to="/" className="flex items-center space-x-3">
                <motion.img src="/logo.png" alt="ASCOM Traz Comunidade" whileHover={{
                rotate: [0, -5, 5, 0]
              }} transition={{
                duration: 0.5
              }} className="h-16" />
                <div className="hidden sm:block">
                  
                  
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => <motion.button key={item.name} onClick={() => scrollToSection(item.section)} className="relative px-4 py-2 text-gray-700 hover:text-ascom transition-colors duration-200 rounded-lg group" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} initial={{
              opacity: 0,
              y: -20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: index * 0.1
            }}>
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Hover Background */}
                  <motion.div className="absolute inset-0 bg-ascom/10 rounded-lg opacity-0 group-hover:opacity-100" layoutId="navHover" transition={{
                duration: 0.2
              }} />
                  
                  {/* Active Indicator */}
                  <motion.div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-ascom group-hover:w-3/4 transition-all duration-300" />
                </motion.button>)}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <Link to="/cadastro-entregador" className="btn-modern px-6 py-2 bg-gradient-to-r from-ascom to-ascom-light text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                  Sou Entregador
                </Link>
              </motion.div>
              
              <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <Link to="/cadastro-comercio" className="px-6 py-2 border-2 border-ascom text-ascom rounded-xl font-medium hover:bg-ascom hover:text-white transition-all duration-300">
                  Tenho Comércio
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} whileTap={{
            scale: 0.95
          }}>
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? <motion.div key="close" initial={{
                rotate: -90,
                opacity: 0
              }} animate={{
                rotate: 0,
                opacity: 1
              }} exit={{
                rotate: 90,
                opacity: 0
              }} transition={{
                duration: 0.2
              }}>
                    <X size={24} />
                  </motion.div> : <motion.div key="menu" initial={{
                rotate: 90,
                opacity: 0
              }} animate={{
                rotate: 0,
                opacity: 1
              }} exit={{
                rotate: -90,
                opacity: 0
              }} transition={{
                duration: 0.2
              }}>
                    <Menu size={24} />
                  </motion.div>}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && <>
            {/* Backdrop */}
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />

            {/* Menu Panel */}
            <motion.div initial={{
          x: '100%',
          opacity: 0
        }} animate={{
          x: 0,
          opacity: 1
        }} exit={{
          x: '100%',
          opacity: 0
        }} transition={{
          type: "spring",
          damping: 25,
          stiffness: 200
        }} className="fixed top-20 right-0 bottom-0 w-80 max-w-sm glass backdrop-blur-xl bg-white/90 z-50 lg:hidden overflow-y-auto">
              <div className="p-6 space-y-6">
                
                {/* Navigation Items */}
                <div className="space-y-2">
                  {navItems.map((item, index) => <motion.button key={item.name} onClick={() => scrollToSection(item.section)} className="w-full text-left px-4 py-3 text-gray-700 hover:text-ascom hover:bg-ascom/10 rounded-xl transition-all duration-200" initial={{
                x: 50,
                opacity: 0
              }} animate={{
                x: 0,
                opacity: 1
              }} transition={{
                delay: index * 0.1
              }} whileTap={{
                scale: 0.95
              }}>
                      {item.name}
                    </motion.button>)}
                </div>

                {/* Mobile CTA Buttons */}
                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <Link to="/cadastro-entregador" className="block w-full btn-modern px-6 py-3 bg-gradient-to-r from-ascom to-ascom-light text-white rounded-xl font-medium text-center" onClick={() => setIsMobileMenuOpen(false)}>
                    Sou Entregador
                  </Link>
                  
                  <Link to="/cadastro-comercio" className="block w-full px-6 py-3 border-2 border-ascom text-ascom rounded-xl font-medium text-center hover:bg-ascom hover:text-white transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>Quero uma corrida!</Link>
                </div>

                {/* Contact Info */}
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Fale conosco:</p>
                  <a href="mailto:ascomtrazcomunidade@gmail.com" className="text-sm text-ascom hover:underline">
                    ascomtrazcomunidade@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>
    </>;
};
export default ModernNavBar;