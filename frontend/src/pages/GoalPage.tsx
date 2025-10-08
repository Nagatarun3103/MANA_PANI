
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar as CalendarIcon, Edit, Trash2, Timer, X, CheckCircle2, RotateCcw } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, intervalToDuration } from "date-fns";
import api from "../services/api";
import ssbPlanData from "../data/ssbPlanData.json";

const isValidDate = (date: any): date is Date => {
  return date instanceof Date && !isNaN(date.getTime());
};

// SSB Plan Component
const SsbPlanComponent = () => {
  const SSB_PLAN_STORAGE_KEY = "ssbPlanCurrentDay";
  const [currentDay, setCurrentDay] = useState<number>(() => {
    const storedDay = localStorage.getItem(SSB_PLAN_STORAGE_KEY);
    return storedDay ? parseInt(storedDay) : 1;
  });

  const currentDayPlan = ssbPlanData.find((plan) => plan.day === currentDay);
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
    }
  };

  if (isPlanComplete) {
    return (
      <div className="text-center p-8 bg-black rounded-2xl border border-border/20">
        <h3 className="text-3xl text-green-500 mb-4">Plan Completed! 🎉</h3>
        <p className="text-lg">Congratulations on completing your 30-day SSB preparation plan!</p>
        <Button onClick={handleResetPlan} className="mt-6">
          <RotateCcw className="w-4 h-4 mr-2" /> Start Again
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-black rounded-2xl p-6 border border-border/20">
      <div className="text-center mb-4">
        <h3 className="text-2xl">Day {currentDay} / {ssbPlanData.length}</h3>
        <p className="text-muted-foreground">Week {currentDayPlan?.week}: {currentDayPlan?.focus}</p>
      </div>
      <div className="space-y-6">
        <div>
          <h4 className="text-xl font-semibold mb-2">Daily Routine:</h4>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            {currentDayPlan?.dailyRoutine.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-2">Tasks:</h4>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            {currentDayPlan?.tasks.map((item, index) => <li key={index}>{item}</li>)}
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
      </div>
    </div>
  );
};


const GoalPage = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState<any[]>([]);
  const [form, setForm] = useState({ goalName: "", deadline: null as Date | null, description: "", type: "Short goal", status: "To Finish" });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [globalSelectedGoalId, setGlobalSelectedGoalId] = useState<string | null>(null);
  const [globalCountdown, setGlobalCountdown] = useState<any>(null);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await api.get("/api/goals");
        setGoals(response.data);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };
    fetchGoals();

    const storedGlobalGoalId = localStorage.getItem("globalSelectedGoalId");
    if (storedGlobalGoalId) {
      setGlobalSelectedGoalId(storedGlobalGoalId);
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const globalGoal = goals.find(g => g.id === globalSelectedGoalId);

    if (globalGoal && globalGoal.deadline) {
      const targetDate = new Date(globalGoal.deadline);
      if (!isValidDate(targetDate)) {
        setGlobalCountdown(null);
        return;
      }

      timer = setInterval(() => {
        const now = new Date();
        if (now >= targetDate) {
          clearInterval(timer);
          setGlobalCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          return;
        }
        const duration = intervalToDuration({ start: now, end: targetDate });
        setGlobalCountdown({ days: duration.days || 0, hours: duration.hours || 0, minutes: duration.minutes || 0, seconds: duration.seconds || 0 });
      }, 1000);
    } else {
      setGlobalCountdown(null);
    }

    return () => clearInterval(timer);
  }, [globalSelectedGoalId, goals]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleTypeChange = (value: string) => {
    setForm({ ...form, type: value });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setForm({ goalName: "", deadline: date, description: "", type: "Short goal", status: "To Finish" });
    setEditingGoalId(null);
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setForm({ goalName: "", deadline: null, description: "", type: "Short goal", status: "To Finish" });
    setEditingGoalId(null);
  };

  const handleSubmit = async () => {
    if (!form.goalName || !form.deadline) {
      alert("Please fill out all fields: Goal and Deadline.");
      return;
    }
    const goalData = { ...form, deadline: form.deadline.toISOString() };

    try {
      if (editingGoalId) {
        const response = await api.put(`/api/goals/${editingGoalId}`, goalData);
        setGoals(goals.map((g) => (g.id === editingGoalId ? response.data : g)));
      } else {
        const response = await api.post("/api/goals", goalData);
        setGoals([...goals, response.data]);
      }
      setIsFormOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving goal:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/api/goals/${id}`);
      setGoals(goals.filter((goal) => goal.id !== id));
      if (globalSelectedGoalId === id) {
        setGlobalSelectedGoalId(null);
        localStorage.removeItem("globalSelectedGoalId");
      }
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const handleEdit = (goalToEdit: any) => {
    setEditingGoalId(goalToEdit.id);
    setForm({ 
      goalName: goalToEdit.goalName, 
      deadline: new Date(goalToEdit.deadline), 
      description: goalToEdit.description, 
      type: goalToEdit.type, 
      status: goalToEdit.status 
    });
    setIsFormOpen(true);
  };

  const handleSetGlobalTimer = (id: string) => {
    setGlobalSelectedGoalId(id);
    localStorage.setItem("globalSelectedGoalId", id);
  };

  const filteredGoals = goals.filter(goal => {
    if (filter === "All") return true;
    return goal.type === filter;
  });

  const globalGoal = goals.find(g => g.id === globalSelectedGoalId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <button onClick={() => navigate("/dashboard")} className="mb-8 flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors duration-300">
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-wide inline-block">GOAL DOMAIN</h1>
          <div className="h-1 w-32 bg-gradient-to-r from-primary to-primary-glow mx-auto mt-4 rounded-full" />
        </div>

        {globalSelectedGoalId && globalCountdown && globalGoal && isValidDate(new Date(globalGoal.deadline)) && (
          <div className="fixed top-4 right-4 bg-black/70 backdrop-blur-sm text-white p-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
            <Timer className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-bold">{globalGoal.goalName}</p>
              <p className="text-xs">{globalCountdown.days}d {globalCountdown.hours}h {globalCountdown.minutes}m {globalCountdown.seconds}s</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => { setGlobalSelectedGoalId(null); localStorage.removeItem("globalSelectedGoalId"); }} className="text-white hover:bg-white/20">
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Calendar mode="single" onSelect={handleDateSelect} className="rounded-md border bg-black" />
          </div>
          <div className="md:col-span-2">
            <div className="flex space-x-2 mb-4">
              {["All", "Short goal", "Financial goal", "Important work"].map(f => (
                <Button key={f} variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)}>{f}</Button>
              ))}
            </div>
            
            {filter === "Important work" ? (
              <SsbPlanComponent />
            ) : (
              <div className="space-y-4">
                {filteredGoals.map(goal => (
                  <div key={goal.id} className="bg-black rounded-2xl p-4 border border-border/20 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-primary">{goal.goalName}</h3>
                      <p className="text-sm text-muted-foreground">{goal.type}</p>
                      <p className="text-xs text-muted-foreground">{goal.deadline ? format(new Date(goal.deadline), "PPP") : "N/A"}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(goal)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(goal.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleSetGlobalTimer(goal.id)}><Timer className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
            <DialogHeader>
              <DialogTitle>{editingGoalId ? "Edit Goal" : "Add New Goal"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input name="goalName" placeholder="Goal Name" value={form.goalName} onChange={handleFormChange} />
              <Select onValueChange={handleTypeChange} value={form.type}>
                <SelectTrigger>
                  <SelectValue placeholder="Select goal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Short goal">Short goal</SelectItem>
                  <SelectItem value="Financial goal">Financial goal</SelectItem>
                  <SelectItem value="Important work">Important work</SelectItem>
                </SelectContent>
              </Select>
              <Textarea name="description" placeholder="Description" value={form.description} onChange={handleFormChange} />
              <p className="text-sm text-muted-foreground">Date: {form.deadline ? format(form.deadline, "PPP") : "N/A"}</p>
              <Button onClick={handleSubmit}>{editingGoalId ? "Update Goal" : "Add Goal"}</Button>
            </div>
            <DialogClose asChild>
              <Button variant="secondary" onClick={resetForm}>Cancel</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default GoalPage;
