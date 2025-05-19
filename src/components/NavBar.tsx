
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Fecha o menu quando mudar de rota
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Função para rolagem suave ao clicar nos links de navegação
  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    
    // Se já estiver na página inicial, faça uma rolagem suave
    if (location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Se não estiver na página inicial, redirecione e depois role
      navigate(`/#${sectionId}`);
    }
  };

  const handleLoginClick = () => {
    // Navigate directly to login page without any conditions
    window.location.href = '/login';
  };

  return (
    <nav 
      className={`fixed w-full z-30 transition-all duration-500 ${
        isScrolled || location.pathname !== '/' ? 
        'bg-gradient-to-r from-white/90 via-blue-50/90 to-blue-100/90 backdrop-blur-md shadow-lg py-2' : 
        'bg-transparent py-4'
      }`}
    >
      <div className="ascom-container flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Ascom Traz Comunidade" 
            className="h-12 md:h-14 transition-transform hover:scale-105" 
          />
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden focus:outline-none rounded-full p-2 hover:bg-gray-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <Menu className="w-6 h-6 text-ascom" />
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {location.pathname === '/' ? (
            <>
              <button onClick={() => scrollToSection('sobre')} className="text-gray-700 font-medium hover:text-ascom transition-colors border-b-2 border-transparent hover:border-ascom">Quem Somos</button>
              <button onClick={() => scrollToSection('entregadores')} className="text-gray-700 font-medium hover:text-ascom transition-colors border-b-2 border-transparent hover:border-ascom">Entregadores</button>
              <button onClick={() => scrollToSection('comercios')} className="text-gray-700 font-medium hover:text-ascom transition-colors border-b-2 border-transparent hover:border-ascom">Comércios</button>
              <button onClick={() => scrollToSection('impacto')} className="text-gray-700 font-medium hover:text-ascom transition-colors border-b-2 border-transparent hover:border-ascom">Impacto</button>
              <button onClick={() => scrollToSection('como-funciona')} className="text-gray-700 font-medium hover:text-ascom transition-colors border-b-2 border-transparent hover:border-ascom">Como Funciona</button>
            </>
          ) : (
            <Link to="/" className="text-gray-700 hover:text-ascom transition-colors font-medium">Início</Link>
          )}
          <Button 
            onClick={handleLoginClick}
            className="bg-gradient-to-r from-ascom to-ascom-light hover:from-ascom-light hover:to-ascom text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 rounded-full px-6 py-2 flex items-center gap-2"
          >
            <LogIn size={18} />
            <span>Entrar</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-xl absolute w-full animate-fade-in border-t border-gray-100">
          <div className="flex flex-col px-4 pt-2 pb-4">
            {location.pathname === '/' ? (
              <>
                <button 
                  onClick={() => scrollToSection('sobre')} 
                  className="py-3 text-gray-700 hover:text-ascom transition-colors border-b border-gray-100 font-medium"
                >
                  Quem Somos
                </button>
                <button 
                  onClick={() => scrollToSection('entregadores')} 
                  className="py-3 text-gray-700 hover:text-ascom transition-colors border-b border-gray-100 font-medium"
                >
                  Entregadores
                </button>
                <button 
                  onClick={() => scrollToSection('comercios')} 
                  className="py-3 text-gray-700 hover:text-ascom transition-colors border-b border-gray-100 font-medium"
                >
                  Comércios
                </button>
                <button 
                  onClick={() => scrollToSection('impacto')} 
                  className="py-3 text-gray-700 hover:text-ascom transition-colors border-b border-gray-100 font-medium"
                >
                  Impacto
                </button>
                <button 
                  onClick={() => scrollToSection('como-funciona')} 
                  className="py-3 text-gray-700 hover:text-ascom transition-colors border-b border-gray-100 font-medium"
                >
                  Como Funciona
                </button>
              </>
            ) : (
              <Link 
                to="/" 
                className="py-3 text-gray-700 hover:text-ascom transition-colors border-b border-gray-100 font-medium"
              >
                Início
              </Link>
            )}
            <Button 
              onClick={handleLoginClick}
              className="mt-4 bg-gradient-to-r from-ascom to-ascom-light hover:from-ascom-light hover:to-ascom text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 rounded-full px-6 py-2 flex items-center justify-center gap-2"
            >
              <LogIn size={18} />
              <span>Entrar</span>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
