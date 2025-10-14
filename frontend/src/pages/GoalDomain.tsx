import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Clock, Plus } from "lucide-react";

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
    // Handle goal submission
    setIsModalOpen(false);
    setGoalName("");
    setDescription("");
  };

  return (
    <div className="min-h-screen p-6 md:p-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <Button
          onClick={() => navigate("/dashboard")}
          variant="ghost"
          className="mb-6 gap-2 hover:bg-muted rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            GOAL DOMAIN
          </h1>
          <div className="w-24 h-1 gradient-primary mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Calendar Section */}
        <div className="glass-card p-6 md:p-8 rounded-3xl shadow-card">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Schedule
          </h3>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-2xl border-border"
          />
        </div>

        {/* Goals Section */}
        <div className="space-y-6">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {goalTypes.map((type) => (
              <Button
                key={type}
                onClick={() => setSelectedGoalType(type)}
                variant={selectedGoalType === type ? "default" : "outline"}
                className={`rounded-xl transition-all ${
                  selectedGoalType === type
                    ? "gradient-primary shadow-glow"
                    : "border-border hover:border-primary"
                }`}
              >
                {type}
              </Button>
            ))}
          </div>

          {/* Add Goal Button */}
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full h-14 text-lg font-semibold gradient-primary hover:opacity-90 transition-opacity rounded-xl gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Goal
          </Button>

          {/* Goals List Placeholder */}
          <div className="glass-card p-8 rounded-3xl shadow-card min-h-[300px] flex items-center justify-center">
            <p className="text-muted-foreground text-center">
              No goals yet. Click "Add New Goal" to get started!
            </p>
          </div>
        </div>
      </div>

      {/* Add Goal Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-card border-border rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Add New Goal</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="goalName">Goal Name</Label>
              <Input
                id="goalName"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                className="bg-input border-border rounded-xl"
                placeholder="Enter goal name"
              />
            </div>

            <div className="space-y-2">
              <Label>Goal Type</Label>
              <div className="flex flex-col gap-2">
                {["Short goal", "Financial goal", "Important work"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setGoalType(type)}
                    className={`p-3 rounded-xl text-left transition-all ${
                      goalType === type
                        ? "gradient-primary text-white"
                        : "bg-input hover:bg-muted"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-input border-border rounded-xl min-h-[100px]"
                placeholder="Describe your goal"
              />
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <p className="text-sm text-muted-foreground">
                {date?.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleAddGoal}
                className="flex-1 gradient-primary hover:opacity-90 rounded-xl"
              >
                Add Goal
              </Button>
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="outline"
                className="flex-1 border-border hover:border-primary rounded-xl"
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
