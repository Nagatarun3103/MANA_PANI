import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar as CalendarIcon, Edit, Trash2, Timer, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, intervalToDuration } from "date-fns";
import { cn } from "@/lib/utils";
import api from "../services/api"; // Import the configured api instance

const isValidDate = (date: any): date is Date => {
  return date instanceof Date && !isNaN(date.getTime());
};

const GoalPage = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState<any[]>([]);
  const [form, setForm] = useState({ goalName: "", deadline: null as Date | null, description: "", type: "", status: "To Finish" });
  const [modalOpen, setModalOpen] = useState(false);
  const [goalType, setGoalType] = useState<string | null>(null);
  const [editingGoalId, setEditingGoalId] = useState<number | null>(null);
  const [globalSelectedGoalId, setGlobalSelectedGoalId] = useState<number | null>(null);
  const [globalCountdown, setGlobalCountdown] = useState<any>(null);

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
      setGlobalSelectedGoalId(parseInt(storedGlobalGoalId));
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const globalGoal = goals.find(g => g.id === globalSelectedGoalId);

    if (globalGoal && globalGoal.deadline) {
      const targetDate = new Date(globalGoal.deadline);
      if (!isValidDate(targetDate)) {
        console.error("Invalid date for global selected goal:", globalGoal.deadline);
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

  const handleDateChange = (date: Date | undefined) => {
    setForm({ ...form, deadline: date || null });
  };

  const resetForm = () => {
    setForm({ goalName: "", deadline: null, description: "", type: "", status: "To Finish" });
    setGoalType(null);
    setEditingGoalId(null);
  };

  const handleSubmit = async () => {
    if (!form.goalName || !form.deadline || !form.description) {
      alert("Please fill out all fields: Goal, Deadline, and Description.");
      return;
    }
    const goalData = { ...form, type: goalType, deadline: form.deadline.toISOString() };

    try {
      if (editingGoalId) {
        const response = await api.put(`/api/goals/${editingGoalId}`, goalData);
        setGoals(goals.map((g) => (g.id === editingGoalId ? response.data : g)));
      } else {
        const response = await api.post("/api/goals", goalData);
        setGoals([...goals, response.data]);
      }
      setModalOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving goal:", error);
      alert("Failed to save goal. See console for details.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/goals/${id}`);
      const newGoals = goals.filter((goal) => goal.id !== id);
      setGoals(newGoals);
      localStorage.setItem("goals", JSON.stringify(newGoals));
      if (globalSelectedGoalId === id) {
        setGlobalSelectedGoalId(null);
        localStorage.removeItem("globalSelectedGoalId");
      }
    } catch (error) {
      console.error("Error deleting goal:", error);
      alert("Failed to delete goal. See console for details.");
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
    setGoalType(goalToEdit.type);
    setModalOpen(true);
  };

  const handleSetGlobalTimer = (id: number) => {
    setGlobalSelectedGoalId(id);
    localStorage.setItem("globalSelectedGoalId", id.toString());
  };

  const openModal = (type: string) => {
    resetForm();
    setGoalType(type);
    setModalOpen(true);
  };

  const goalCards = [
    { title: "Short goal", type: "form" },
    { title: "Financial goal", type: "form" },
    { title: "Important work", type: "form" },
    { title: "Task complition survey", type: "navigate", path: "/survey" },
  ];

  const renderForm = () => {
    let dateConstraint: any = {};
    if (goalType === "Short goal") {
      const oneMonthFromNow = new Date();
      oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
      dateConstraint = { fromDate: oneMonthFromNow };
    } else if (goalType === "Financial goal") {
      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
      dateConstraint = { fromDate: oneYearFromNow };
    } else if (goalType === "Important work") {
      const oneMonthFromNow = new Date();
      oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
      dateConstraint = { toDate: oneMonthFromNow };
    }

    return (
      <div className="space-y-4">
        <Input name="goalName" placeholder="Goal" value={form.goalName} onChange={handleFormChange} />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !form.deadline && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {form.deadline ? format(form.deadline, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={form.deadline}
              onSelect={handleDateChange}
              initialFocus
              {...dateConstraint}
            />
          </PopoverContent>
        </Popover>
        <Textarea name="description" placeholder="Description" value={form.description} onChange={handleFormChange} />
        <Button onClick={handleSubmit}>{editingGoalId ? "Update Goal" : "Add Goal"}</Button>
      </div>
    );
  };

  const globalGoal = goals.find(g => g.id === globalSelectedGoalId);

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

        {globalSelectedGoalId && globalCountdown && globalGoal && isValidDate(new Date(globalGoal.deadline)) && (
          <div className="fixed top-4 right-4 bg-black/70 backdrop-blur-sm text-white p-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
            <Timer className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-bold">{globalGoal.goalName}</p>
              <p className="text-xs">
                {globalCountdown.days}d {globalCountdown.hours}h {globalCountdown.minutes}m {globalCountdown.seconds}s
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => {
              setGlobalSelectedGoalId(null);
              localStorage.removeItem("globalSelectedGoalId");
            }} className="text-white hover:bg-white/20">
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {goalCards.map((card, index) => (
              card.type === "form" ? (
                <DialogTrigger asChild key={index}>
                  <button
                    onClick={() => openModal(card.title)}
                    className="group relative bg-black rounded-2xl p-8 min-h-[160px] flex items-center justify-center
                             border border-border/20 overflow-hidden
                             transition-all duration-300 ease-out
                             hover:scale-105 hover:shadow-[0_0_30px_rgba(255,107,53,0.4)]
                             hover:border-primary/50"
                  >
                    <h3 className="text-xl font-bold text-destructive text-center transition-colors duration-300
                                 group-hover:text-primary z-10 relative">
                      {card.title}
                    </h3>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0
                                  group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </DialogTrigger>
              ) : (
                <button
                  key={index}
                  onClick={() => navigate(card.path!)}
                  className="group relative bg-black rounded-2xl p-8 min-h-[160px] flex items-center justify-center
                           border border-border/20 overflow-hidden
                           transition-all duration-300 ease-out
                           hover:scale-105 hover:shadow-[0_0_30px_rgba(255,107,53,0.4)]
                           hover:border-primary/50"
                >
                  <h3 className="text-xl font-bold text-destructive text-center transition-colors duration-300
                               group-hover:text-primary z-10 relative">
                    {card.title}
                  </h3>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0
                                group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              )
            ))}
          </div>
          <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
            <DialogHeader>
              <DialogTitle>{editingGoalId ? `Edit ${goalType}` : `Add ${goalType}`}</DialogTitle>
            </DialogHeader>
            {renderForm()}
            <DialogClose asChild>
              <Button variant="secondary" onClick={resetForm}>Cancel</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>

        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Saved Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map(goal => (
              <div key={goal.id} className="bg-black rounded-2xl p-6 border border-border/20">
                <h3 className="text-xl font-bold text-primary mb-2">{goal.goalName}</h3>
                <p className="text-muted-foreground mb-2">{goal.type}</p>
                <p className="text-muted-foreground mb-2">{goal.deadline ? format(new Date(goal.deadline), "PPP") : "N/A"}</p>
                <p>{goal.description}</p>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(goal)}>
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(goal.id)}>
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => handleSetGlobalTimer(goal.id)}>
                    <Timer className="h-4 w-4 mr-2" /> Set Timer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalPage;