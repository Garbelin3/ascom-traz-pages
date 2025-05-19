
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Linktree from "./pages/Linktree";
import CadastroEntregador from "./pages/CadastroEntregador";
import CadastroComercio from "./pages/CadastroComercio";
import CadastroSucesso from "./pages/CadastroSucesso";
import AdminDashboard from "./pages/admin/Dashboard";
import EntregadorDashboard from "./pages/entregador/Dashboard";
import ComercioDashboard from "./pages/comercio/Dashboard";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Rotas públicas */}
                <Route path="/" element={<Index />} />
                <Route path="/links" element={<Linktree />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro-entregador" element={<CadastroEntregador />} />
                <Route path="/cadastro-comercio" element={<CadastroComercio />} />
                <Route path="/cadastro-sucesso" element={<CadastroSucesso />} />
                
                {/* Rotas protegidas para administradores */}
                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Route>
                
                {/* Rotas protegidas para entregadores */}
                <Route element={<ProtectedRoute allowedRoles={["entregador"]} />}>
                  <Route path="/entregador/dashboard" element={<EntregadorDashboard />} />
                </Route>
                
                {/* Rotas protegidas para comércios */}
                <Route element={<ProtectedRoute allowedRoles={["comercio"]} />}>
                  <Route path="/comercio/dashboard" element={<ComercioDashboard />} />
                </Route>
                
                {/* Rota de fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
