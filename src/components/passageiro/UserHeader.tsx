
import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

interface UserHeaderProps {
  onLogout: () => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({ onLogout }) => {
  return (
    <header className="bg-ascom text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <User className="h-8 w-8" />
          <h1 className="text-xl font-bold">Dashboard Passageiro</h1>
        </div>
        <Button variant="ghost" className="text-white hover:bg-ascom-dark" onClick={onLogout}>
          Sair
        </Button>
      </div>
    </header>
  );
};

export default UserHeader;
