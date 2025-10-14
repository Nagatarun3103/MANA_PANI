import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Goal {
  id: number;
  goalName: string;
  type: string;
  description: string;
  status: string;
}

const TaskSurveyPage = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    const storedGoals = localStorage.getItem("goals");
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals));
    }
  }, []);

  const handleStatusChange = (id: number, status: string) => {
    const updatedGoals = goals.map(goal =>
      goal.id === id ? { ...goal, status } : goal
    );
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  const toFinishGoals = goals.filter(goal => goal.status === "To Finish");
  const completedGoals = goals.filter(goal => goal.status === "Completed");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/goals")}
          className="mb-8 flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Goal Domain
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-wide inline-block">
            Task Completion Survey
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-primary to-primary-glow mx-auto mt-4 rounded-full" />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">To Finish</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toFinishGoals.map(goal => (
              <div key={goal.id} className="bg-black rounded-2xl p-6 border border-border/20">
                <h3 className="text-xl font-bold text-primary mb-2">{goal.goalName}</h3>
                <p className="text-muted-foreground mb-2">{goal.type}</p>
                <p>{goal.description}</p>
                <div className="mt-4">
                  <Button onClick={() => handleStatusChange(goal.id, "Completed")}>Mark as Completed</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Completed Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedGoals.map(goal => (
              <div key={goal.id} className="bg-black rounded-2xl p-6 border border-border/20">
                <h3 className="text-xl font-bold text-green-500 mb-2">{goal.goalName}</h3>
                <p className="text-muted-foreground mb-2">{goal.type}</p>
                <p>{goal.description}</p>
                <div className="mt-4">
                  <Button variant="secondary" onClick={() => handleStatusChange(goal.id, "To Finish")}>Mark as To Finish</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskSurveyPage;