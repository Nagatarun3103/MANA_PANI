import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Upload } from "lucide-react";

const HealthDomain = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Disease");

  const tabs = ["Disease", "Causes", "Food", "Exercise"];

  const renderForm = () => {
    switch (activeTab) {
      case "Disease":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Add New Common Disease</h2>
            
            <div className="space-y-2">
              <Label htmlFor="diseaseName">Disease Name</Label>
              <Input
                id="diseaseName"
                className="bg-input border-border rounded-xl"
                placeholder="Enter disease name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diseaseDesc">Short Description</Label>
              <Textarea
                id="diseaseDesc"
                className="bg-input border-border rounded-xl min-h-[120px]"
                placeholder="Describe the disease"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diseaseImage">Disease Image</Label>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2 rounded-xl border-border hover:border-primary">
                  <Upload className="w-4 h-4" />
                  Choose File
                </Button>
                <span className="text-sm text-muted-foreground">No file chosen</span>
              </div>
            </div>

            <Button className="w-full gradient-primary hover:opacity-90 rounded-xl h-12 text-base">
              Save Disease
            </Button>
          </div>
        );

      case "Causes":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Add Common Cause</h2>
            
            <div className="space-y-2">
              <Label htmlFor="selectDisease">Select Disease</Label>
              <Select>
                <SelectTrigger className="bg-input border-border rounded-xl">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent className="bg-card border-border rounded-xl">
                  <SelectItem value="diabetes">Diabetes</SelectItem>
                  <SelectItem value="hypertension">Hypertension</SelectItem>
                  <SelectItem value="obesity">Obesity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="explanation">Detailed Explanation</Label>
              <Textarea
                id="explanation"
                className="bg-input border-border rounded-xl min-h-[120px]"
                placeholder="Explain the causes"
              />
            </div>

            <Button className="w-full gradient-primary hover:opacity-90 rounded-xl h-12 text-base">
              Save Cause
            </Button>
          </div>
        );

      case "Food":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Add Food to Avoid</h2>
            
            <div className="space-y-2">
              <Label htmlFor="selectDiseaseFood">Select Disease</Label>
              <Select>
                <SelectTrigger className="bg-input border-border rounded-xl">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent className="bg-card border-border rounded-xl">
                  <SelectItem value="diabetes">Diabetes</SelectItem>
                  <SelectItem value="hypertension">Hypertension</SelectItem>
                  <SelectItem value="obesity">Obesity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="foodName">Food Name</Label>
              <Input
                id="foodName"
                className="bg-input border-border rounded-xl"
                placeholder="Enter food name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reasonAvoid">Reason to Avoid</Label>
              <Textarea
                id="reasonAvoid"
                className="bg-input border-border rounded-xl min-h-[120px]"
                placeholder="Explain why to avoid this food"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="foodImage">Food Image</Label>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2 rounded-xl border-border hover:border-primary">
                  <Upload className="w-4 h-4" />
                  Choose File
                </Button>
                <span className="text-sm text-muted-foreground">No file chosen</span>
              </div>
            </div>

            <Button className="w-full gradient-primary hover:opacity-90 rounded-xl h-12 text-base">
              Save Food
            </Button>
          </div>
        );

      case "Exercise":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Add Recommended Exercise</h2>
            
            <div className="space-y-2">
              <Label htmlFor="selectDiseaseExercise">Select Disease</Label>
              <Select>
                <SelectTrigger className="bg-input border-border rounded-xl">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent className="bg-card border-border rounded-xl">
                  <SelectItem value="diabetes">Diabetes</SelectItem>
                  <SelectItem value="hypertension">Hypertension</SelectItem>
                  <SelectItem value="obesity">Obesity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="exerciseName">Exercise Name</Label>
              <Input
                id="exerciseName"
                className="bg-input border-border rounded-xl"
                placeholder="Enter exercise name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration/Frequency</Label>
              <Input
                id="duration"
                className="bg-input border-border rounded-xl"
                placeholder="e.g., 30 minutes daily"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="exerciseImage">Exercise Image/GIF</Label>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2 rounded-xl border-border hover:border-primary">
                  <Upload className="w-4 h-4" />
                  Choose File
                </Button>
                <span className="text-sm text-muted-foreground">No file chosen</span>
              </div>
            </div>

            <Button className="w-full gradient-primary hover:opacity-90 rounded-xl h-12 text-base">
              Save Exercise
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

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
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            HEALTH DOMAIN
          </h1>
          <div className="w-24 h-1 gradient-secondary mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Tabs and Form */}
      <div className="max-w-5xl mx-auto">
        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {tabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              variant={activeTab === tab ? "default" : "outline"}
              className={`rounded-xl transition-all ${
                activeTab === tab
                  ? "gradient-secondary shadow-glow"
                  : "border-border hover:border-secondary"
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Form */}
        <div className="glass-card p-8 md:p-10 rounded-3xl shadow-card">
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default HealthDomain;
