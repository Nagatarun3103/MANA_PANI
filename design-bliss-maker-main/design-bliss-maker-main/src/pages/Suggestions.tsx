import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, TrendingUp, Heart, Target, Lightbulb, CheckCircle } from "lucide-react";

const Suggestions = () => {
  const navigate = useNavigate();

  const suggestions = [
    {
      icon: Target,
      title: "Set SMART Goals",
      description: "Make your goals Specific, Measurable, Achievable, Relevant, and Time-bound for better success rates.",
      category: "Goal Management",
      priority: "High"
    },
    {
      icon: Heart,
      title: "Regular Health Monitoring",
      description: "Track your vitals and health metrics weekly to identify trends and take preventive measures early.",
      category: "Health",
      priority: "High"
    },
    {
      icon: TrendingUp,
      title: "Review Progress Weekly",
      description: "Schedule time every week to review your progress and adjust your strategies accordingly.",
      category: "Productivity",
      priority: "Medium"
    },
    {
      icon: Lightbulb,
      title: "Break Down Large Goals",
      description: "Divide major objectives into smaller milestones to maintain momentum and celebrate wins.",
      category: "Goal Management",
      priority: "Medium"
    },
    {
      icon: CheckCircle,
      title: "Maintain Consistency",
      description: "Focus on building sustainable habits rather than seeking perfection in your daily routine.",
      category: "Habits",
      priority: "High"
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-accent bg-accent/10 border-accent/20";
      case "Medium":
        return "text-primary bg-primary/10 border-primary/20";
      default:
        return "text-muted-foreground bg-muted/10 border-muted/20";
    }
  };

  return (
    <div className="min-h-screen p-6 lg:p-10 bg-muted">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <Button
          onClick={() => navigate("/dashboard")}
          variant="ghost"
          className="mb-6 gap-2 hover:bg-muted/50 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        <div className="flex items-center gap-4 mb-2">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-accent-foreground" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">AI Suggestions</h1>
        </div>
        <p className="text-muted-foreground ml-14">Personalized recommendations for your success</p>
      </div>

      {/* Suggestions List */}
      <div className="max-w-5xl mx-auto space-y-4">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;
          return (
            <div
              key={index}
              className="card-minimal p-6 lg:p-8 shadow-md bg-background hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      {suggestion.title}
                    </h3>
                    <div className="flex gap-2 flex-shrink-0">
                      <span className="text-xs px-3 py-1 rounded-full border bg-primary/5 text-primary border-primary/20 font-medium">
                        {suggestion.category}
                      </span>
                      <span className={`text-xs px-3 py-1 rounded-full border font-medium ${getPriorityColor(suggestion.priority)}`}>
                        {suggestion.priority}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {suggestion.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* AI Coming Soon Section */}
        <div className="card-minimal p-8 lg:p-10 shadow-md mt-10 bg-background text-center">
          <div className="w-14 h-14 rounded-lg bg-primary flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-7 h-7 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-foreground">
            Advanced AI Recommendations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our AI engine is learning from your patterns to provide even more personalized insights.
            Soon you'll receive real-time suggestions based on your goals, health data, and progress trends.
          </p>
          <div className="mt-6">
            <Button className="rounded-lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
