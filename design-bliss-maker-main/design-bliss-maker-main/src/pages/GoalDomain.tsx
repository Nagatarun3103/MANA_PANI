import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calendar as CalendarIcon, Plus, Target, TrendingUp } from "lucide-react";

const GoalDomain = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goalName, setGoalName] = useState("");
  const [goalType, setGoalType] = useState("Short goal");
  const [description, setDescription] = useState("");
  const [selectedGoalType, setSelectedGoalType] = useState("All");

  const goalTypes = ["All", "Short goal", "Financial goal", "Important work"];

  const handleAddGoal = () => {
    setIsModalOpen(false);
    setGoalName("");
    setDescription("");
  };

  return (
    <div className="min-h-screen p-6 lg:p-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <Button
          onClick={() => navigate("/dashboard")}
          variant="ghost"
          className="mb-6 gap-2 hover:bg-muted/50 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        <div className="flex items-center gap-4 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Target className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Goal Management</h1>
        </div>
        <p className="text-muted-foreground ml-14">Track and achieve your professional objectives</p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
        {/* Calendar Section */}
        <div className="card-minimal p-6 lg:p-8 shadow-md bg-background">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-foreground">
            <CalendarIcon className="w-5 h-5 text-primary" />
            Schedule Overview
          </h3>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-xl"
          />
          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm font-medium text-primary mb-1">Selected Date</p>
            <p className="text-foreground">
              {date?.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Goals Section */}
        <div className="space-y-6">
          {/* Filter Buttons */}
          <div className="card-minimal p-4 shadow-md bg-background">
            <p className="text-sm font-medium text-muted-foreground mb-3">Filter by Type</p>
            <div className="flex flex-wrap gap-2">
              {goalTypes.map((type) => (
                <Button
                  key={type}
                  onClick={() => setSelectedGoalType(type)}
                  variant={selectedGoalType === type ? "default" : "outline"}
                  size="sm"
                  className="rounded-lg"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Add Goal Button */}
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full h-11 font-medium rounded-lg gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New Goal
          </Button>

          {/* Goals List */}
          <div className="card-minimal p-8 shadow-md bg-background min-h-[300px] flex flex-col items-center justify-center">
            <TrendingUp className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center mb-2">No goals created yet</p>
            <p className="text-sm text-muted-foreground text-center">
              Click "Create New Goal" to start tracking your objectives
            </p>
          </div>
        </div>
      </div>

      {/* Add Goal Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-card border-border rounded-lg max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Create New Goal</DialogTitle>
          </DialogHeader>

          <div className="space-y-5 pt-4">
            <div className="space-y-2">
              <Label htmlFor="goalName" className="text-sm font-medium">Goal Name</Label>
              <Input
                id="goalName"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                className="bg-input border-border rounded-lg"
                placeholder="Enter goal name"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Goal Type</Label>
              <div className="flex flex-col gap-2">
                {["Short goal", "Financial goal", "Important work"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setGoalType(type)}
                    className={`p-3 rounded-lg text-left text-sm transition-all ${
                      goalType === type
                        ? "gradient-primary text-white font-medium"
                        : "bg-input hover:bg-muted border border-border"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-input border-border rounded-lg min-h-[100px]"
                placeholder="Describe your goal and objectives"
              />
            </div>

            <div className="p-3 bg-accent/5 rounded-lg border border-accent/20">
              <p className="text-xs font-medium text-accent mb-1">Target Date</p>
              <p className="text-sm text-foreground">
                {date?.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleAddGoal}
                className="flex-1 gradient-primary hover:opacity-90 rounded-lg"
              >
                Create Goal
              </Button>
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="outline"
                className="flex-1 border-border hover:border-accent rounded-lg"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GoalDomain;
