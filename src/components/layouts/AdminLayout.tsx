
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  User, 
  LogOut, 
  Home,
  LayoutDashboard,
  Users,
  Settings,
  Store
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { signOut, userDetails } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar para desktop */}
      <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
            <span className="font-bold">Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4">
          <p className="text-xs text-gray-400 mb-3">MENU</p>
          <ul className="space-y-2">
            <li>
              <Link to="/admin/dashboard" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/entregadores" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800">
                <Users size={18} />
                <span>Entregadores</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/comercios" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800">
                <Store size={18} />
                <span>Comércios</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
              <User size={18} />
            </div>
            <div>
              <p className="font-medium">Administrador</p>
              <p className="text-xs text-gray-400">{userDetails?.email}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-center gap-2 text-white hover:bg-gray-800" 
            onClick={handleLogout}
          >
            <LogOut size={16} />
            <span>Sair</span>
          </Button>
        </div>
      </aside>
      
      {/* Mobile navbar */}
      <div className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          <span className="font-bold">Admin</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="text-white" onClick={handleLogout}>
            <LogOut size={20} />
          </Button>
        </div>
      </div>
      
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
