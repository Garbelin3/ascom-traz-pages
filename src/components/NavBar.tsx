import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <nav 
      className={`fixed w-full z-30 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="ascom-container flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="logo.png" 
            alt="Ascom Traz Comunidade" 
            className="h-12 md:h-14" 
          />
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6 text-ascom" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <a href="#sobre" className="text-gray-700 hover:text-ascom transition-colors">Quem Somos</a>
          <a href="#entregadores" className="text-gray-700 hover:text-ascom transition-colors">Entregadores</a>
          <a href="#comercios" className="text-gray-700 hover:text-ascom transition-colors">Comércios</a>
          <a href="#impacto" className="text-gray-700 hover:text-ascom transition-colors">Impacto</a>
          <a href="#como-funciona" className="text-gray-700 hover:text-ascom transition-colors">Como Funciona</a>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full animate-fade-in">
          <div className="flex flex-col px-4 pt-2 pb-4">
            <a 
              href="#sobre" 
              className="py-2 text-gray-700 hover:text-ascom transition-colors border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Quem Somos
            </a>
            <a 
              href="#entregadores" 
              className="py-2 text-gray-700 hover:text-ascom transition-colors border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Entregadores
            </a>
            <a 
              href="#comercios" 
              className="py-2 text-gray-700 hover:text-ascom transition-colors border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Comércios
            </a>
            <a 
              href="#impacto" 
              className="py-2 text-gray-700 hover:text-ascom transition-colors border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Impacto
            </a>
            <a 
              href="#como-funciona" 
              className="py-2 text-gray-700 hover:text-ascom transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Como Funciona
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
