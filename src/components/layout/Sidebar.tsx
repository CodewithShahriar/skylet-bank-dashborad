
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  CreditCard, 
  BadgeDollarSign, 
  History, 
  PieChart, 
  MessageSquare, 
  Settings, 
  LogOut, 
  X 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center px-4 py-3 rounded-lg transition-colors duration-150",
      isActive 
        ? "bg-blue-50 text-blue-600 font-medium" 
        : "text-gray-600 hover:bg-gray-50"
    )}
  >
    <span className="mr-3">{icon}</span>
    <span>{label}</span>
  </Link>
);

const Sidebar = ({ isOpen, onClose, isMobile }: SidebarProps) => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-30 h-screen bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out",
          isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full", 
          isMobile ? "z-50" : "",
        )}
      >
        {/* Logo and close button */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-transparent bg-clip-text">
              SKYLET BANK LTD
            </span>
          </div>
          {isMobile && (
            <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="p-4 space-y-1">
          <NavItem 
            to="/dashboard" 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            isActive={isActive('/dashboard')}
          />
          <NavItem 
            to="/dashboard/cards" 
            icon={<CreditCard size={20} />} 
            label="Cards" 
            isActive={isActive('/dashboard/cards')}
          />
          <NavItem 
            to="/dashboard/payments" 
            icon={<BadgeDollarSign size={20} />} 
            label="Payments" 
            isActive={isActive('/dashboard/payments')}
          />
          <NavItem 
            to="/dashboard/history" 
            icon={<History size={20} />} 
            label="History" 
            isActive={isActive('/dashboard/history')}
          />
          <NavItem 
            to="/dashboard/reports" 
            icon={<PieChart size={20} />} 
            label="Reports" 
            isActive={isActive('/dashboard/reports')}
          />
          <NavItem 
            to="/dashboard/support" 
            icon={<MessageSquare size={20} />} 
            label="Support" 
            isActive={isActive('/dashboard/support')}
          />
          
          <div className="pt-4 mt-4 border-t border-gray-200">
            <NavItem 
              to="/dashboard/settings" 
              icon={<Settings size={20} />} 
              label="Settings" 
              isActive={isActive('/dashboard/settings')}
            />
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-150"
            >
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
