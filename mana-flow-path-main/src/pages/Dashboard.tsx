import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@supabase/supabase-js";
import { Target, Heart, MessageSquare, Calendar, LogOut } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            MANA_PANI
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold">Welcome to Your Dashboard</h2>
            <p className="text-muted-foreground text-lg">
              Choose a domain to start your journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Goals Card */}
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-primary group"
              onClick={() => navigate("/goals")}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Goals</CardTitle>
                <CardDescription>
                  Track and achieve your personal goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  Manage Goals
                </Button>
              </CardContent>
            </Card>

            {/* Health Card */}
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-primary group"
              onClick={() => navigate("/health")}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-success to-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Health</CardTitle>
                <CardDescription>
                  Browse health information and tips
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  View Health Info
                </Button>
              </CardContent>
            </Card>

            {/* Suggestions Card */}
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-primary group"
              onClick={() => navigate("/suggestions")}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Suggestions</CardTitle>
                <CardDescription>
                  Share your feedback with us
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>

            {/* Schedule Card */}
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-primary group"
              onClick={() => navigate("/schedule")}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Schedule</CardTitle>
                <CardDescription>
                  Plan your week effectively
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  View Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
