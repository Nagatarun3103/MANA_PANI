import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Target, Heart, Sparkles, LogOut, TrendingUp, Activity } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Active Goals", value: "12", change: "+3", icon: Target },
    { label: "Health Score", value: "87%", change: "+5%", icon: Heart },
    { label: "Streak Days", value: "24", change: "+1", icon: TrendingUp },
  ];

  const cards = [
    {
      title: "Goal Management",
      icon: Target,
      description: "Track and achieve your objectives with smart goal setting",
      path: "/goal-domain",
      stats: "8 Active"
    },
    {
      title: "Health Tracking",
      icon: Heart,
      description: "Monitor your wellbeing and optimize your fitness journey",
      path: "/health-domain",
      stats: "3 Metrics"
    },
    {
      title: "AI Suggestions",
      icon: Sparkles,
      description: "Get personalized insights powered by artificial intelligence",
      path: "/suggestions",
      stats: "5 New Tips"
    },
  ];

  return (
    <div className="min-h-screen p-6 lg:p-10 bg-muted">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                Dashboard
              </h1>
            </div>
            <p className="text-muted-foreground text-base ml-14">Welcome back! Here's your progress overview.</p>
          </div>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="gap-2 rounded-lg"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="card-minimal p-6 shadow-md bg-background hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</span>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-bold text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-base font-medium text-green-600 mb-2">{stat.change}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Cards */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-foreground">
          <Activity className="w-5 h-5 text-primary" />
          Your Domains
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group cursor-pointer animate-slide-up"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
                onClick={() => navigate(card.path)}
              >
                <div className="card-minimal p-8 shadow-md bg-background hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                      {card.stats}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {card.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {card.description}
                  </p>

                  <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                    Explore
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
