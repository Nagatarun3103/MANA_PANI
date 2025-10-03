import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Inbox } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// --- User View: Submission Form ---
const UserSuggestionForm = () => {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setMessage("Suggestion cannot be empty.");
      return;
    }
    try {
      await api.post("/api/suggestions", { content });
      setMessage("Thank you! Your suggestion has been submitted.");
      setContent("");
    } catch (error) {
      console.error("Failed to submit suggestion", error);
      setMessage("Error: Could not submit your suggestion.");
    }
  };

  return (
    <Card className="glass-card mt-6">
      <CardHeader>
        <CardTitle>Submit a Suggestion</CardTitle>
        <CardDescription>We value your feedback. Let us know how we can improve.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="suggestionContent">Your Suggestion</Label>
            <Textarea
              id="suggestionContent"
              placeholder="Type your suggestion here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
            />
          </div>
          {message && <p className="text-sm text-muted-foreground text-center">{message}</p>}
          <Button type="submit" className="w-full btn-hero">
            <Send className="mr-2 h-4 w-4" /> Submit Suggestion
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// --- Admin View: Results List ---
const AdminSuggestionView = () => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/suggestions");
        setSuggestions(response.data);
      } catch (error) {
        console.error("Failed to fetch suggestions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSuggestions();
  }, []);

  return (
    <Card className="glass-card mt-6">
      <CardHeader>
        <CardTitle>User Suggestions</CardTitle>
        <CardDescription>Here are the suggestions submitted by users.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center text-muted-foreground">Loading suggestions...</p>
        ) : suggestions.length > 0 ? (
          <ul className="space-y-4">
            {suggestions.map(suggestion => (
              <li key={suggestion.id} className="border-b pb-4">
                <p className="text-foreground whitespace-pre-wrap">{suggestion.content}</p>
                {/* User info could be displayed here if the backend were adjusted to send it */}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            <Inbox className="mx-auto h-12 w-12" />
            <p className="mt-4">No suggestions have been submitted yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// --- Main Page Component ---
const SuggestionsPage = () => {
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
            SUGGESTIONS DOMAIN
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-primary to-primary-glow mx-auto mt-4 rounded-full" />
        </div>

        {isAdmin ? <AdminSuggestionView /> : <UserSuggestionForm />}
      </div>
    </div>
  );
};

export default SuggestionsPage;