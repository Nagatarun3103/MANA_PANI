import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import heroBackground from "@/assets/hero-background.jpg";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-primary/30"></div>
      </div>
      
      <div className="relative text-center text-white space-y-8 px-4 max-w-4xl z-10">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
            MANA_PANI
          </h1>
          <p className="text-xl md:text-2xl font-light opacity-90">
            Transform Your Life Through Personal Development
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button
            size="lg"
            className="bg-primary text-white hover:bg-primary-light text-lg px-8 py-6 rounded-full shadow-[0_0_30px_rgba(251,146,60,0.5)] hover:shadow-[0_0_40px_rgba(251,146,60,0.7)] transition-all font-bold"
            onClick={() => navigate("/auth")}
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-2 border-primary text-white hover:bg-primary/20 text-lg px-8 py-6 rounded-full hover:border-primary-light transition-all"
            onClick={() => navigate("/auth")}
          >
            Sign In
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
          <div className="space-y-2">
            <div className="text-5xl">🎯</div>
            <h3 className="text-xl font-semibold">Track Goals</h3>
            <p className="text-sm opacity-80">Set and achieve your personal and financial goals</p>
          </div>
          <div className="space-y-2">
            <div className="text-5xl">💪</div>
            <h3 className="text-xl font-semibold">Stay Healthy</h3>
            <p className="text-sm opacity-80">Access health information and wellness tips</p>
          </div>
          <div className="space-y-2">
            <div className="text-5xl">📅</div>
            <h3 className="text-xl font-semibold">Plan Better</h3>
            <p className="text-sm opacity-80">Organize your schedule and manage time effectively</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
