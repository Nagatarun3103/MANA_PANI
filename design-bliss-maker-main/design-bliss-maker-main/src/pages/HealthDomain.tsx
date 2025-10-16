import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Heart, Upload, Activity } from "lucide-react";

const HealthDomain = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Disease");

  const tabs = ["Disease", "Causes", "Food", "Exercise"];

  const renderForm = () => {
    switch (activeTab) {
      case "Disease":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Add Common Disease</h2>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="diseaseName" className="text-sm font-medium">Disease Name</Label>
              <Input
                id="diseaseName"
                className="h-11"
                placeholder="Enter disease name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diseaseDesc" className="text-sm font-medium">Description</Label>
              <Textarea
                id="diseaseDesc"
                className="min-h-[100px]"
                placeholder="Provide a detailed description"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diseaseImage" className="text-sm font-medium">Disease Image</Label>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Choose File
                </Button>
                <span className="text-sm text-muted-foreground">No file selected</span>
              </div>
            </div>

            <Button className="w-full h-11 font-medium">
              Save Disease
            </Button>
          </div>
        );

      case "Causes":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Add Disease Cause</h2>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="selectDisease" className="text-sm font-medium">Select Disease</Label>
              <Select>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Choose a disease..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diabetes">Diabetes</SelectItem>
                  <SelectItem value="hypertension">Hypertension</SelectItem>
                  <SelectItem value="obesity">Obesity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="explanation" className="text-sm font-medium">Detailed Explanation</Label>
              <Textarea
                id="explanation"
                className="min-h-[100px]"
                placeholder="Explain the primary causes"
              />
            </div>

            <Button className="w-full h-11 font-medium">
              Save Cause
            </Button>
          </div>
        );

      case "Food":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Add Food to Avoid</h2>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="selectDiseaseFood" className="text-sm font-medium">Select Disease</Label>
              <Select>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Choose a disease..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diabetes">Diabetes</SelectItem>
                  <SelectItem value="hypertension">Hypertension</SelectItem>
                  <SelectItem value="obesity">Obesity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="foodName" className="text-sm font-medium">Food Name</Label>
              <Input
                id="foodName"
                className="h-11"
                placeholder="Enter food item"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reasonAvoid" className="text-sm font-medium">Reason to Avoid</Label>
              <Textarea
                id="reasonAvoid"
                className="min-h-[100px]"
                placeholder="Explain why this food should be avoided"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="foodImage" className="text-sm font-medium">Food Image</Label>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Choose File
                </Button>
                <span className="text-sm text-muted-foreground">No file selected</span>
              </div>
            </div>

            <Button className="w-full h-11 font-medium">
              Save Food Item
            </Button>
          </div>
        );

      case "Exercise":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Add Recommended Exercise</h2>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="selectDiseaseExercise" className="text-sm font-medium">Select Disease</Label>
              <Select>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Choose a disease..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diabetes">Diabetes</SelectItem>
                  <SelectItem value="hypertension">Hypertension</SelectItem>
                  <SelectItem value="obesity">Obesity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="exerciseName" className="text-sm font-medium">Exercise Name</Label>
              <Input
                id="exerciseName"
                className="h-11"
                placeholder="Enter exercise name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm font-medium">Duration & Frequency</Label>
              <Input
                id="duration"
                className="h-11"
                placeholder="e.g., 30 minutes, 5 times per week"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="exerciseImage" className="text-sm font-medium">Exercise Image/GIF</Label>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Choose File
                </Button>
                <span className="text-sm text-muted-foreground">No file selected</span>
              </div>
            </div>

            <Button className="w-full h-11 font-medium">
              Save Exercise
            </Button>
          </div>
        );

      default:
        return null;
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
            <Heart className="w-6 h-6 text-accent-foreground" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Health Tracking</h1>
        </div>
        <p className="text-muted-foreground ml-14">Monitor diseases, nutrition, and fitness</p>
      </div>

      {/* Tabs and Form */}
      <div className="max-w-5xl mx-auto">
        {/* Tabs */}
        <div className="card-minimal p-2 shadow-md mb-6 flex flex-wrap gap-2 bg-background">
          {tabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              variant={activeTab === tab ? "default" : "ghost"}
              className="flex-1 min-w-[120px] rounded-lg"
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Form */}
        <div className="card-minimal p-8 lg:p-10 shadow-md bg-background">
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default HealthDomain;
