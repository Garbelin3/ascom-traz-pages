
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoadingScreen from '../LoadingScreen';

interface ProtectedRouteProps {
  allowedRoles?: string[];
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles = [],
  redirectPath = '/login'
}) => {
  const { user, userDetails, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  // Se não houver papéis especificados ou o papel do usuário estiver entre os permitidos
  if (allowedRoles.length === 0 || (userDetails && allowedRoles.includes(userDetails.role))) {
    return <Outlet />;
  }

  // Redirecionar para a página apropriada com base no papel
  if (userDetails) {
    switch (userDetails.role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'motorista':
        return <Navigate to="/motorista/dashboard" replace />;
      case 'passageiro':
        return <Navigate to="/passageiro/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
