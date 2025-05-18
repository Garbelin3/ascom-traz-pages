
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Send, Phone, Facebook, Instagram, Globe } from "lucide-react";
import Footer from '../components/Footer';

const Linktree = () => {
  const links = [
    { 
      title: "E-mail", 
      icon: <Mail className="w-5 h-5 mr-2" />, 
      url: "mailto:ascomtrazcomunidade@gmail.com", 
      color: "bg-red-500 hover:bg-red-600"
    },
    { 
      title: "WhatsApp", 
      icon: <Send className="w-5 h-5 mr-2" />, 
      url: "https://wa.me/5527999999999", 
      color: "bg-green-500 hover:bg-green-600"
    },
    { 
      title: "Telefone", 
      icon: <Phone className="w-5 h-5 mr-2" />, 
      url: "tel:+5527999999999", 
      color: "bg-blue-500 hover:bg-blue-600"
    },
    { 
      title: "Facebook", 
      icon: <Facebook className="w-5 h-5 mr-2" />, 
      url: "https://facebook.com/ascomtraz", 
      color: "bg-[#1877f2] hover:bg-[#0e65d9]"
    },
    { 
      title: "Instagram", 
      icon: <Instagram className="w-5 h-5 mr-2" />, 
      url: "https://instagram.com/ascomtrazcomunidade", 
      color: "bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-90"
    },
    { 
      title: "Site Oficial", 
      icon: <Globe className="w-5 h-5 mr-2" />, 
      url: "https://ascomtrazcomunidade.com.br", 
      color: "bg-ascom hover:bg-ascom-dark"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <div className="container max-w-md px-4 py-16 mx-auto">
        <div className="mb-10 text-center">
          <div className="flex justify-center mb-4">
            <img src="/logo.png" alt="Ascom Traz Comunidade" className="h-24 w-auto" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Ascom Traz Comunidade</h1>
          <p className="text-gray-600">Conectando entregadores e comércios locais</p>
        </div>
        
        <div className="space-y-4">
          {links.map((link, index) => (
            <a 
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block"
            >
              <Button 
                className={`w-full flex items-center justify-center text-white ${link.color} py-6 rounded-lg transition-all transform hover:scale-105`}
              >
                {link.icon}
                <span>{link.title}</span>
              </Button>
            </a>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-600">© 2025 Ascom Traz Comunidade</p>
          <p className="text-xs text-gray-500 mt-1">Todos os direitos reservados</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Linktree;
