import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, TrendingUp, Heart, Target } from "lucide-react";

const Suggestions = () => {
  const navigate = useNavigate();

  const suggestions = [
    {
      icon: Target,
      title: "Stay Focused",
      description: "Break down your goals into smaller, manageable tasks for better progress tracking.",
      gradient: "from-purple-500 to-purple-700"
    },
    {
      icon: Heart,
      title: "Health First",
      description: "Regular exercise and a balanced diet are key to maintaining optimal health.",
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your daily achievements and celebrate small wins along the way.",
      gradient: "from-pink-500 to-purple-600"
    },
  ];

  return (
    <div className="min-h-screen p-6 md:p-10">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <Button
          onClick={() => navigate("/dashboard")}
          variant="ghost"
          className="mb-6 gap-2 hover:bg-muted rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="w-10 h-10 text-accent" />
            <h1 className="text-4xl md:text-5xl font-bold">
              SUGGESTIONS
            </h1>
          </div>
          <div className="w-24 h-1 gradient-accent mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Suggestions List */}
      <div className="max-w-5xl mx-auto space-y-6">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;
          return (
            <div
              key={index}
              className="glass-card p-6 md:p-8 rounded-3xl shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${suggestion.gradient} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    {suggestion.title}
                  </h3>
                  <p className="text-muted-foreground text-base md:text-lg">
                    {suggestion.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Personalized Section */}
        <div className="glass-card p-8 md:p-10 rounded-3xl shadow-card mt-8">
          <h2 className="text-2xl font-bold mb-4 text-center">
            More Personalized Suggestions Coming Soon
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            We're working on AI-powered recommendations based on your goals and health data
            to help you achieve your ambitions more effectively.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
