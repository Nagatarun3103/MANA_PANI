import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, ArrowLeft, CheckCircle2, Circle, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Goal {
  id: string;
  name: string;
  description: string | null;
  deadline: string | null;
  goal_type: string;
  status: string;
  created_at: string;
}

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    deadline: "",
    goal_type: "Personal",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuthAndLoadGoals();
  }, []);

  const checkAuthAndLoadGoals = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    await loadGoals();
  };

  const loadGoals = async () => {
    try {
      const { data, error } = await supabase
        .from("goals")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setGoals(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading goals",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGoal = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("goals").insert({
        user_id: user.id,
        name: formData.name,
        description: formData.description || null,
        deadline: formData.deadline || null,
        goal_type: formData.goal_type,
        status: "To Finish",
      });

      if (error) throw error;

      toast({
        title: "Goal created!",
        description: "Your new goal has been added successfully.",
      });

      setIsDialogOpen(false);
      setFormData({ name: "", description: "", deadline: "", goal_type: "Personal" });
      loadGoals();
    } catch (error: any) {
      toast({
        title: "Error creating goal",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleGoalStatus = async (goalId: string, currentStatus: string) => {
    const newStatus = currentStatus === "To Finish" ? "Completed" : "To Finish";

    try {
      const { error } = await supabase
        .from("goals")
        .update({ 
          status: newStatus,
          completed_at: newStatus === "Completed" ? new Date().toISOString() : null
        })
        .eq("id", goalId);

      if (error) throw error;

      toast({
        title: newStatus === "Completed" ? "Goal completed! 🎉" : "Goal reopened",
        description: newStatus === "Completed" ? "Great job on completing your goal!" : "Goal moved back to active",
      });

      loadGoals();
    } catch (error: any) {
      toast({
        title: "Error updating goal",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteGoal = async (goalId: string) => {
    try {
      const { error } = await supabase.from("goals").delete().eq("id", goalId);

      if (error) throw error;

      toast({
        title: "Goal deleted",
        description: "Goal has been removed successfully.",
      });

      loadGoals();
    } catch (error: any) {
      toast({
        title: "Error deleting goal",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      "Short goal": "bg-primary/10 text-primary border-primary/20",
      "Financial goal": "bg-success/10 text-success border-success/20",
      "Important work": "bg-destructive/10 text-destructive border-destructive/20",
      "Personal": "bg-secondary/10 text-secondary border-secondary/20",
      "Other": "bg-muted text-muted-foreground border-muted",
    };
    return colors[type] || colors["Other"];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading goals...</p>
        </div>
      </div>
    );
  }

  const activeGoals = goals.filter(g => g.status === "To Finish");
  const completedGoals = goals.filter(g => g.status === "Completed");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              My Goals
            </h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary-light">
                <Plus className="h-4 w-4 mr-2" />
                New Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Goal</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateGoal} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Goal Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Save $5000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Details about your goal..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal_type">Goal Type *</Label>
                  <Select
                    value={formData.goal_type}
                    onValueChange={(value) => setFormData({ ...formData, goal_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Short goal">Short goal</SelectItem>
                      <SelectItem value="Financial goal">Financial goal</SelectItem>
                      <SelectItem value="Important work">Important work</SelectItem>
                      <SelectItem value="Personal">Personal</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="datetime-local"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary-light">
                  Create Goal
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Active Goals */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Circle className="h-6 w-6 text-primary" />
            Active Goals ({activeGoals.length})
          </h2>
          {activeGoals.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No active goals. Click "New Goal" to get started!
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeGoals.map((goal) => (
                <Card key={goal.id} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg">{goal.name}</CardTitle>
                      <Badge className={`${getTypeColor(goal.goal_type)} border`}>
                        {goal.goal_type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {goal.description && (
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    )}
                    {goal.deadline && (
                      <p className="text-xs text-muted-foreground">
                        Due: {new Date(goal.deadline).toLocaleDateString()}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => toggleGoalStatus(goal.id, goal.status)}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Complete
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                        onClick={() => deleteGoal(goal.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-success" />
              Completed Goals ({completedGoals.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedGoals.map((goal) => (
                <Card key={goal.id} className="opacity-75 hover:opacity-100 transition-opacity">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg line-through">{goal.name}</CardTitle>
                      <Badge className="bg-success/10 text-success border-success/20 border">
                        Completed
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {goal.description && (
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    )}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => toggleGoalStatus(goal.id, goal.status)}
                      >
                        <Circle className="h-4 w-4 mr-2" />
                        Reopen
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                        onClick={() => deleteGoal(goal.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
