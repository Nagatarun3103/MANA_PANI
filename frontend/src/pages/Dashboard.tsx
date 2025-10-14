import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Target, Heart, Sparkles, LogOut, Droplets } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "GOAL",
      icon: Target,
      gradient: "from-purple-500 to-purple-700",
      path: "/goal-domain",
      description: "Track and achieve your ambitions"
    },
    {
      title: "HEALTH",
      icon: Heart,
      gradient: "from-cyan-500 to-blue-600",
      path: "/health-domain",
      description: "Monitor your wellbeing"
    },
    {
      title: "SUGGESTIONS",
      icon: Sparkles,
      gradient: "from-pink-500 to-purple-600",
      path: "/suggestions",
      description: "Personalized recommendations"
    },
  ];

  return (
    <div className="min-h-screen p-6 md:p-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Droplets className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              MANA_PANI
            </h1>
          </div>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="gap-2 border-border hover:border-primary transition-colors rounded-xl"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 md:gap-8">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="group cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => navigate(card.path)}
            >
              <div className="glass-card p-8 rounded-3xl shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-primary/30 h-full">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-3xl font-bold mb-3 text-foreground">
                  {card.title}
                </h2>
                
                <p className="text-muted-foreground text-base">
                  {card.description}
                </p>

                <div className={`mt-6 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-full bg-gradient-to-r ${card.gradient}`}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
