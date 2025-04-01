
import React, { ReactNode, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  Home, 
  LogOut, 
  Plus, 
  FileText, 
  Settings,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Logo from '@/components/Logo';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userRole = localStorage.getItem('userRole') || '';
  const userEmail = localStorage.getItem('userEmail') || '';

  useEffect(() => {
    // Check if user is logged in
    if (!userRole) {
      toast({
        variant: "destructive",
        title: "Access denied",
        description: "Please login to access this page.",
      });
      navigate('/login');
      return;
    }

    // If we're in the admin dashboard, check admin permissions
    if (window.location.pathname.startsWith('/admin') && 
        userRole !== 'admin' && userRole !== 'superadmin') {
      toast({
        variant: "destructive",
        title: "Access denied",
        description: "You don't have permission to access the admin dashboard.",
      });
      navigate('/dashboard');
    }
  }, [userRole, navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
    { name: 'Add Expense', icon: <Plus size={20} />, path: '/add-expense' },
    { name: 'Reports', icon: <FileText size={20} />, path: '/reports' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
    { name: 'Profile', icon: <User size={20} />, path: '/profile' },
  ];

  // Add admin dashboard link for admins
  if (userRole === 'admin' || userRole === 'superadmin') {
    menuItems.push({ 
      name: 'Admin Dashboard', 
      icon: <BarChart3 size={20} />, 
      path: '/admin/dashboard' 
    });
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
        <div className="mb-8">
          <Logo />
        </div>
        <nav className="flex-grow">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-primary-50 hover:text-primary transition-colors"
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-4">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-start px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span className="ml-3">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm h-16 flex items-center px-6">
          <h1 className="text-xl font-semibold text-gray-800">
            XpenseS Dashboard
          </h1>
          <div className="ml-auto flex items-center space-x-2">
            {/* Show user information */}
            <div className="text-sm text-gray-600 mr-2">
              {userEmail} ({userRole})
            </div>
            {/* Profile avatar placeholder - in a real app this would be dynamic */}
            <div className="h-10 w-10 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-bold">
              {userRole === 'admin' ? 'A' : userRole === 'superadmin' ? 'S' : 'U'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
