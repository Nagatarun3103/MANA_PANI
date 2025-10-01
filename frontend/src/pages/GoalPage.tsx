import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const GoalPage = () => {
  const navigate = useNavigate();

  const goalCards = [
    "Short goal",
    "Financial goal",
    "Important work",
    "Task complition survey",
    "Time Table",
    "Ideas",
    "Suggestions",
    "counting days and time with sec",
    "Enquiry and review box",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-8 flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-wide inline-block">
            GOAL DOMAIN
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-primary to-primary-glow mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {goalCards.map((card, index) => (
            <button
              key={index}
              className="group relative bg-black rounded-2xl p-8 min-h-[160px] flex items-center justify-center
                       border border-border/20 overflow-hidden
                       transition-all duration-300 ease-out
                       hover:scale-105 hover:shadow-[0_0_30px_rgba(255,107,53,0.4)]
                       hover:border-primary/50"
            >
              <h3 className="text-xl font-bold text-destructive text-center transition-colors duration-300 
                           group-hover:text-primary z-10 relative">
                {card}
              </h3>
              
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoalPage;