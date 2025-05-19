import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import EntregadorForm from '../components/forms/EntregadorForm';
const CadastroEntregador = () => {
  return <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <NavBar />
      <div className="flex-1 py-12">
        <div className="ascom-container max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-xl border border-blue-100 p-6 md:p-8 mx-0 my-[30px]">
            
            
            <EntregadorForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>;
};
export default CadastroEntregador;