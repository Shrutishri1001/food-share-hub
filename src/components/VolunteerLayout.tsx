import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { 
  LogOut, User, Menu,
  LayoutDashboard, Clock, ClipboardList, Navigation, CheckCircle2
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface VolunteerLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/volunteer' },
  { icon: Clock, label: 'Availability', path: '/volunteer/availability' },
  { icon: ClipboardList, label: 'Assignments', path: '/volunteer/assignments' },
  { icon: Navigation, label: 'Active Pickup', path: '/volunteer/active' },
  { icon: CheckCircle2, label: 'Completed', path: '/volunteer/completed' },
];

const VolunteerLayout: React.FC<VolunteerLayoutProps> = ({ children, title, subtitle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-primary
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Logo size="sm" showText={false} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-primary-foreground">FoodShare</h1>
                <p className="text-xs text-primary-foreground/70">Volunteer Portal</p>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 px-3 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left
                    transition-all duration-200
                    ${isActive 
                      ? 'bg-primary-foreground text-primary font-medium' 
                      : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground'
                    }
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-primary-foreground/20">
            <div className="flex items-center gap-3 p-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <User className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary-foreground truncate">{user.fullName}</p>
                <p className="text-xs text-primary-foreground/70 truncate">Volunteer</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-card border-b border-border">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              <div>
                <h1 className="text-xl font-bold text-foreground">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-muted-foreground">{subtitle}</p>
                )}
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
              className="gap-2 text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default VolunteerLayout;
