import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, ExternalLink, Instagram, Facebook, Linkedin, LogIn } from 'lucide-react';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const scrollToSection = (sectionId: string) => {
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
    // Use React Router's navigate instead of direct window.location change
    navigate('/login');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ascom via-ascom-light to-ascom"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-ascom/10 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-ascom/10 blur-3xl"></div>
      
      <div className="ascom-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img 
                src="/logo.png" 
                alt="Ascom Traz Comunidade" 
                className="h-16 mb-4 hover:opacity-90 transition-opacity" 
              />
            </Link>
            <p className="text-gray-300 leading-relaxed">
              A Ascom é a Associação Comunitária de Desenvolvimento à Vida Humana, reconhecida oficialmente pela Prefeitura de Vila Velha como entidade de utilidade pública.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-ascom transition-colors duration-300">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-ascom transition-colors duration-300">
                <Facebook size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-ascom transition-colors duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2 flex items-center">
              <ExternalLink size={18} className="mr-2 text-ascom-light" />
              Links Úteis
            </h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('sobre')} 
                  className="text-gray-300 hover:text-ascom-light transition-colors flex items-center"
                >
                  <span className="mr-2">›</span> Quem Somos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('entregadores')} 
                  className="text-gray-300 hover:text-ascom-light transition-colors flex items-center"
                >
                  <span className="mr-2">›</span> Para Entregadores
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('comercios')} 
                  className="text-gray-300 hover:text-ascom-light transition-colors flex items-center"
                >
                  <span className="mr-2">›</span> Para Comércios
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('impacto')} 
                  className="text-gray-300 hover:text-ascom-light transition-colors flex items-center"
                >
                  <span className="mr-2">›</span> Nosso Impacto
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('como-funciona')} 
                  className="text-gray-300 hover:text-ascom-light transition-colors flex items-center"
                >
                  <span className="mr-2">›</span> Como Funciona
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2 flex items-center">
              <Phone size={18} className="mr-2 text-ascom-light" />
              Contato
            </h3>
            <div className="space-y-4">
              <p className="flex items-center text-gray-300 hover:text-white transition-colors">
                <Phone className="h-5 w-5 mr-3 text-ascom-light flex-shrink-0" />
                <span>Suporte via WhatsApp</span>
              </p>
              <p className="flex items-center text-gray-300 hover:text-white transition-colors">
                <Mail className="h-5 w-5 mr-3 text-ascom-light flex-shrink-0" />
                <span>contato@ascomtrazcomunidade.com.br</span>
              </p>
              <p className="flex items-center text-gray-300 hover:text-white transition-colors">
                <MapPin className="h-5 w-5 mr-3 text-ascom-light flex-shrink-0" />
                <span>Vila Velha, ES</span>
              </p>
              <div className="pt-4 mt-4 border-t border-gray-700">
                <button 
                  onClick={handleLoginClick} 
                  className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-ascom to-ascom-light hover:from-ascom-light hover:to-ascom text-white transition-colors text-sm font-medium gap-2"
                >
                  <LogIn size={16} />
                  Área Restrita
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Ascom Traz Comunidade. Todos os direitos reservados.</p>
          <p className="mt-2">
            <Link to="/politica-privacidade" className="hover:text-ascom-light transition-colors">Política de Privacidade</Link>
            {' '} | {' '}
            <Link to="/termos" className="hover:text-ascom-light transition-colors">Termos de Uso</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
