import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              MANA_PANI
            </h1>
            <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>

      {/* Right side - Motivational gradient */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 bg-[length:cover] bg-center relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, hsl(0 0% 5%) 0%, hsl(20 90% 20%) 50%, hsl(25 95% 53%) 100%)'
      }}>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative text-center text-white space-y-6 max-w-lg z-10">
          <h2 className="text-4xl font-bold">Transform Your Life</h2>
          <p className="text-lg opacity-90">
            Set goals, track progress, and achieve your personal and health milestones with MANA_PANI.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold">📊</div>
              <p className="text-sm mt-2">Track Goals</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">💪</div>
              <p className="text-sm mt-2">Stay Healthy</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">🎯</div>
              <p className="text-sm mt-2">Achieve More</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
