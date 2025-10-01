import React from 'react';
import LoginForm from '@/components/LoginForm';
import { ArrowRight, Star, Users, Trophy } from 'lucide-react';
import fitnessHeroBg from '@/assets/fitness-hero-bg.jpg';

const Index = () => {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${fitnessHeroBg})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 hero-overlay" />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Hero Content */}
        <div className="flex-1 flex items-center justify-center px-6 lg:px-12">
          <div className="max-w-2xl text-center lg:text-left space-y-8 animate-float">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 text-sm font-medium text-primary">
              <Star className="w-4 h-4" />
              #1 Fitness Platform
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="hero-title">
                Build Your
                <br />
                <span className="text-gradient-primary">Body Strong</span>
              </h1>
              <p className="hero-subtitle max-w-xl">
                Push harder than yesterday if you want a different tomorrow.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-4">
              <div className="text-center">
                <div className="flex items-center gap-2 text-2xl font-bold text-foreground">
                  <Users className="w-6 h-6 text-primary" />
                  50K+
                </div>
                <p className="text-sm text-muted-foreground">Active Members</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 text-2xl font-bold text-foreground">
                  <Trophy className="w-6 h-6 text-primary" />
                  1M+
                </div>
                <p className="text-sm text-muted-foreground">Workouts Completed</p>
              </div>
            </div>

            {/* CTA Buttons - Hidden on smaller screens to avoid clutter */}
            <div className="hidden lg:flex gap-4 pt-4">
              <button className="btn-hero inline-flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn-secondary">
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-6 lg:px-12 py-12">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Mobile CTA - Show only on smaller screens */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-20">
        <button className="btn-hero w-full inline-flex items-center justify-center gap-2">
          Start Free Trial
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </main>
  );
};

export default Index;