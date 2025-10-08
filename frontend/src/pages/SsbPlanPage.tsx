import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ssbPlanData from "../data/ssbPlanData.json"; // Import the plan data

interface DayPlan {
  day: number;
  week: number;
  focus: string;
  dailyRoutine: string[];
  tasks: string[];
}

const SSB_PLAN_STORAGE_KEY = "ssbPlanCurrentDay";

const SsbPlanPage = () => {
  const navigate = useNavigate();
  const [currentDay, setCurrentDay] = useState<number>(() => {
    const storedDay = localStorage.getItem(SSB_PLAN_STORAGE_KEY);
    return storedDay ? parseInt(storedDay) : 1;
  });

  const currentDayPlan: DayPlan | undefined = ssbPlanData.find((plan) => plan.day === currentDay);
  const isPlanComplete = currentDay > ssbPlanData.length;

  useEffect(() => {
    localStorage.setItem(SSB_PLAN_STORAGE_KEY, currentDay.toString());
  }, [currentDay]);

  const handleMarkDayComplete = () => {
    if (currentDay <= ssbPlanData.length) {
      setCurrentDay(currentDay + 1);
    }
  };

  const handleResetPlan = () => {
    if (window.confirm("Are you sure you want to reset your SSB preparation plan?")) {
      setCurrentDay(1);
      localStorage.removeItem(SSB_PLAN_STORAGE_KEY);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/goals")}
          className="mb-8 flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Goal Domain
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-wide inline-block">
            SSB Tech Prep Plan
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-primary to-primary-glow mx-auto mt-4 rounded-full" />
        </div>

        {isPlanComplete ? (
          <Card className="glass-card text-center p-8">
            <CardTitle className="text-3xl text-green-500 mb-4">Plan Completed! 🎉</CardTitle>
            <CardDescription className="text-lg">Congratulations on completing your 30-day SSB preparation plan!</CardDescription>
            <Button onClick={handleResetPlan} className="mt-6">
              <RotateCcw className="w-4 h-4 mr-2" /> Start Again
            </Button>
          </Card>
        ) : (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl">Day {currentDay} / {ssbPlanData.length}</CardTitle>
              <CardDescription>Week {currentDayPlan?.week}: {currentDayPlan?.focus}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Daily Routine:</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  {currentDayPlan?.dailyRoutine.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Tasks:</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  {currentDayPlan?.tasks.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between items-center pt-4">
                <Button onClick={handleMarkDayComplete} className="btn-hero">
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Mark Day {currentDay} Complete
                </Button>
                <Button variant="outline" onClick={handleResetPlan}>
                  <RotateCcw className="w-4 h-4 mr-2" /> Reset Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SsbPlanPage;
