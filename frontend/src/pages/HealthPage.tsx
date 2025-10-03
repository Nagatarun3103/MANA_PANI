import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Flame, Apple, BrainCircuit } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// --- Admin View Component ---
const AdminHealthView = () => {
  const [diseases, setDiseases] = useState<any[]>([]);
  
  // Form states
  const [diseaseName, setDiseaseName] = useState("");
  const [diseaseDescription, setDiseaseDescription] = useState("");
  const [causeSelectedDisease, setCauseSelectedDisease] = useState("");
  const [causeExplanation, setCauseExplanation] = useState("");
  const [foodSelectedDisease, setFoodSelectedDisease] = useState("");
  const [foodName, setFoodName] = useState("");
  const [foodReason, setFoodReason] = useState("");
  const [exerciseSelectedDisease, setExerciseSelectedDisease] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseDuration, setExerciseDuration] = useState("");

  useEffect(() => {
    // Fetch existing diseases to populate dropdowns
    const fetchDiseases = async () => {
      try {
        const response = await api.get("/api/health");
        const diseaseList = response.data.filter((item: any) => item.category === "Common Disease");
        setDiseases(diseaseList);
      } catch (error) {
        console.error("Failed to fetch diseases", error);
      }
    };
    fetchDiseases();
  }, []);

  const handleSubmit = async (payload: any) => {
    try {
      await api.post("/api/health", payload);
      alert(`Health information for "${payload.category}" has been saved.`);
      // Refresh disease list if a new one was added
      if (payload.category === "Common Disease") {
        setDiseases([...diseases, { ...payload, id: Date.now() }]);
        setDiseaseName("");
        setDiseaseDescription("");
      }
    } catch (error) {
      console.error("Failed to save health info", error);
      alert("Error: Could not save the information.");
    }
  };

  return (
    <Tabs defaultValue="common-disease" className="w-full">
      <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <TabsTrigger value="common-disease">Disease</TabsTrigger>
        <TabsTrigger value="common-cause">Causes</TabsTrigger>
        <TabsTrigger value="food-to-avoid">Food</TabsTrigger>
        <TabsTrigger value="exercise">Exercise</TabsTrigger>
      </TabsList>

      {/* Add Disease Form */}
      <TabsContent value="common-disease">
        <Card className="glass-card mt-6">
          <CardHeader><CardTitle>Add New Common Disease</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit({ category: "Common Disease", title: diseaseName, content: diseaseDescription }); }} className="space-y-6">
              <div className="space-y-2"><Label>Disease Name</Label><Input value={diseaseName} onChange={(e) => setDiseaseName(e.target.value)} /></div>
              <div className="space-y-2"><Label>Short Description</Label><Textarea value={diseaseDescription} onChange={(e) => setDiseaseDescription(e.target.value)} /></div>
              <div className="space-y-2"><Label>Disease Image</Label><Input type="file" className="input-modern" /></div>
              <Button type="submit" className="w-full btn-hero">Save Disease</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Add Cause Form */}
      <TabsContent value="common-cause">
        <Card className="glass-card mt-6">
          <CardHeader><CardTitle>Add Common Cause</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit({ category: "Common Cause", diseaseAssociation: causeSelectedDisease, content: causeExplanation, title: "Cause" }); }} className="space-y-6">
              <div className="space-y-2"><Label>Select Disease</Label><Select onValueChange={setCauseSelectedDisease}><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent>{diseases.map(d => <SelectItem key={d.id} value={d.title}>{d.title}</SelectItem>)}</SelectContent></Select></div>
              <div className="space-y-2"><Label>Detailed Explanation</Label><Textarea value={causeExplanation} onChange={(e) => setCauseExplanation(e.target.value)} /></div>
              <Button type="submit" className="w-full btn-hero">Save Cause</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Add Food Form */}
      <TabsContent value="food-to-avoid">
        <Card className="glass-card mt-6">
          <CardHeader><CardTitle>Add Food to Avoid</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit({ category: "Food to Avoid", diseaseAssociation: foodSelectedDisease, title: foodName, content: foodReason }); }} className="space-y-6">
              <div className="space-y-2"><Label>Select Disease</Label><Select onValueChange={setFoodSelectedDisease}><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent>{diseases.map(d => <SelectItem key={d.id} value={d.title}>{d.title}</SelectItem>)}</SelectContent></Select></div>
              <div className="space-y-2"><Label>Food Name</Label><Input value={foodName} onChange={(e) => setFoodName(e.target.value)} /></div>
              <div className="space-y-2"><Label>Reason to Avoid</Label><Textarea value={foodReason} onChange={(e) => setFoodReason(e.target.value)} /></div>
              <div className="space-y-2"><Label>Food Image</Label><Input type="file" className="input-modern" /></div>
              <Button type="submit" className="w-full btn-hero">Save Food</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Add Exercise Form */}
      <TabsContent value="exercise">
        <Card className="glass-card mt-6">
          <CardHeader><CardTitle>Add Recommended Exercise</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit({ category: "Exercise", diseaseAssociation: exerciseSelectedDisease, title: exerciseName, content: exerciseDuration }); }} className="space-y-6">
              <div className="space-y-2"><Label>Select Disease</Label><Select onValueChange={setExerciseSelectedDisease}><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent>{diseases.map(d => <SelectItem key={d.id} value={d.title}>{d.title}</SelectItem>)}</SelectContent></Select></div>
              <div className="space-y-2"><Label>Exercise Name</Label><Input value={exerciseName} onChange={(e) => setExerciseName(e.target.value)} /></div>
              <div className="space-y-2"><Label>Duration/Frequency</Label><Input value={exerciseDuration} onChange={(e) => setExerciseDuration(e.target.value)} /></div>
              <div className="space-y-2"><Label>Exercise Image/GIF</Label><Input type="file" accept="image/*,image/gif" className="input-modern" /></div>
              <Button type="submit" className="w-full btn-hero">Save Exercise</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

// --- User View Component ---
const UserHealthView = () => {
  const [allHealthInfo, setAllHealthInfo] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDisease, setSelectedDisease] = useState<any | null>(null);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/health");
        setAllHealthInfo(response.data || []);
      } catch (error) {
        console.error("Failed to fetch health data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHealthData();
  }, []);

  const diseases = allHealthInfo.filter(info => info.category === 'Common Disease');
  const relatedInfo = selectedDisease ? allHealthInfo.filter(info => info.diseaseAssociation === selectedDisease.title) : [];
  const causes = relatedInfo.filter(info => info.category === 'Common Cause');
  const foods = relatedInfo.filter(info => info.category === 'Food to Avoid');
  const exercises = relatedInfo.filter(info => info.category === 'Exercise');

  if (loading) {
    return <p className="text-center text-muted-foreground">Loading health information...</p>;
  }

  return (
    <div className="space-y-8">
      {!selectedDisease ? (
        <Card className="glass-card">
          <CardHeader><CardTitle>Select a Disease</CardTitle><CardDescription>Select a disease to see detailed information.</CardDescription></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {diseases.length > 0 ? diseases.map(d => (
              <button key={d.id} onClick={() => setSelectedDisease(d)} className="text-left p-4 rounded-lg bg-background/50 hover:bg-primary/10 border transition-colors">
                <h3 className="font-bold text-primary">{d.title}</h3>
                <p className="text-sm text-muted-foreground">{d.content}</p>
              </button>
            )) : <p className="text-muted-foreground">No diseases have been added by the administrator yet.</p>}
          </CardContent>
        </Card>
      ) : (
        <div>
          <Button onClick={() => setSelectedDisease(null)} variant="outline" className="mb-6"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Disease List</Button>
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader><CardTitle className="text-3xl text-primary">{selectedDisease.title}</CardTitle></CardHeader>
              <CardContent><p className="text-muted-foreground">{selectedDisease.content}</p></CardContent>
            </Card>

            {causes.length > 0 && <Card className="glass-card"><CardHeader><CardTitle className="flex items-center"><BrainCircuit className="mr-2 text-primary"/> Common Causes</CardTitle></CardHeader><CardContent><p>{causes[0].content}</p></CardContent></Card>}
            
            {foods.length > 0 && <Card className="glass-card"><CardHeader><CardTitle className="flex items-center"><Apple className="mr-2 text-primary"/> Foods to Avoid</CardTitle></CardHeader><CardContent><ul className="list-disc pl-5 space-y-2">{foods.map(f => <li key={f.id}><b>{f.title}:</b> {f.content}</li>)}</ul></CardContent></Card>}

            {exercises.length > 0 && <Card className="glass-card"><CardHeader><CardTitle className="flex items-center"><Flame className="mr-2 text-primary"/> Recommended Exercises</CardTitle></CardHeader><CardContent><ul className="list-disc pl-5 space-y-2">{exercises.map(e => <li key={e.id}><b>{e.title}:</b> {e.content}</li>)}</ul></CardContent></Card>}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main Page Component ---
const HealthPage = () => {
  const navigate = useNavigate();
  const { authTokens } = useContext(AuthContext);
  const isAdmin = authTokens.user?.roles?.includes('ROLE_ADMIN');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-8 flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-wide inline-block">
            HEALTH DOMAIN
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-primary to-primary-glow mx-auto mt-4 rounded-full" />
        </div>

        {isAdmin ? <AdminHealthView /> : <UserHealthView />}
      </div>
    </div>
  );
};

export default HealthPage;
