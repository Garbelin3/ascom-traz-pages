
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CallToActionButton from "../components/CallToActionButton";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-20">
        <div className="text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-ascom mb-6">404</h1>
          <p className="text-2xl md:text-3xl text-gray-700 mb-8">Oops! Página não encontrada</p>
          <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto">
            Parece que você está tentando acessar uma página que não existe ou foi removida.
          </p>
          <CallToActionButton
            text="Voltar para a Página Inicial"
            href="/"
            primary={true}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
