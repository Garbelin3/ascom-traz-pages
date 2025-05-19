
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="ascom-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img 
              src="/logo.png" 
              alt="Ascom Traz Comunidade" 
              className="h-14 mb-4" 
            />
            <p className="text-gray-300 mt-4">
              A Ascom é a Associação Comunitária de Desenvolvimento à Vida Humana, reconhecida oficialmente pela Prefeitura de Vila Velha como entidade de utilidade pública.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Links Úteis</h3>
            <ul className="space-y-2">
              <li><Link to="/#sobre" className="text-gray-300 hover:text-ascom-light transition-colors">Quem Somos</Link></li>
              <li><Link to="/#entregadores" className="text-gray-300 hover:text-ascom-light transition-colors">Para Entregadores</Link></li>
              <li><Link to="/#comercios" className="text-gray-300 hover:text-ascom-light transition-colors">Para Comércios</Link></li>
              <li><Link to="/#impacto" className="text-gray-300 hover:text-ascom-light transition-colors">Nosso Impacto</Link></li>
              <li><Link to="/#como-funciona" className="text-gray-300 hover:text-ascom-light transition-colors">Como Funciona</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Contato</h3>
            <p className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-ascom-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Suporte via WhatsApp
            </p>
            <p className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-ascom-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              contato@ascomtrazcomunidade.com.br
            </p>
            <p className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-ascom-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Vila Velha, ES
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Ascom Traz Comunidade. Todos os direitos reservados.</p>
          <p className="mt-1">
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
