import { useNavigate } from "react-router-dom";
import { Target, Heart } from "lucide-react";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button } from '@/components/ui/button';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const domains = [
    { title: "Goal", icon: Target, path: "/goals" },
    { title: "Health", icon: Heart, path: "/health" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Dashboard
          </h1>
          <Button onClick={handleLogout} variant="destructive">Logout</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {domains.map((domain) => (
            <button
              key={domain.title}
              onClick={() => navigate(domain.path)}
              className="group relative bg-black rounded-3xl p-12 h-64 flex flex-col items-center justify-center gap-6 
                       border border-border/20 overflow-hidden
                       transition-all duration-300 ease-out
                       hover:scale-105 hover:shadow-[0_0_40px_rgba(255,107,53,0.4)]
                       hover:border-primary/50"
            >
              <domain.icon className="w-16 h-16 text-destructive transition-all duration-300 group-hover:text-primary group-hover:scale-110" />
              <h2 className="text-3xl font-bold text-destructive transition-colors duration-300 group-hover:text-primary">
                {domain.title}
              </h2>
              
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
