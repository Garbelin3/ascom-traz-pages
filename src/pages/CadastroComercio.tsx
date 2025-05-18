
import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ComercioForm from '../components/forms/ComercioForm';

const CadastroComercio = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 bg-gradient-to-br from-white via-blue-50 to-blue-100 py-12">
        <div className="ascom-container max-w-4xl mx-auto px-4">
          <ComercioForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CadastroComercio;
