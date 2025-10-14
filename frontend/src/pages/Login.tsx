import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Droplets } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import api from "@/services/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
        const response = await api.post('/auth/login', { username, password });
        login(response.data.token);
        navigate('/dashboard');
    } catch (err) {
        setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="text-center md:text-left space-y-6 animate-fade-in">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Droplets className="w-12 h-12 text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              MANA PANI
            </h1>
          </div>
          <p className="text-2xl md:text-3xl text-muted-foreground font-light">
            Hydrate Your Ambition
          </p>
          <div className="w-32 h-1 gradient-primary mx-auto md:mx-0 rounded-full"></div>
        </div>

        {/* Right side - Login Form */}
        <div className="glass-card p-8 md:p-10 rounded-3xl shadow-elevated animate-slide-up">
          <h2 className="text-3xl font-bold mb-8">Login</h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-base">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 bg-input border-border rounded-xl text-base"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-base">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-input border-border rounded-xl text-base"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && <p className="text-sm font-medium text-destructive">{error}</p>}

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold gradient-primary hover:opacity-90 transition-opacity rounded-xl"
            >
              Login
            </Button>

            <div className="text-center space-y-3 pt-4">
              <Link
                to="/forgot-password"
                className="text-muted-foreground hover:text-foreground transition-colors underline"
              >
                Forgot password?
              </Link>
              <div className="text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-accent hover:text-accent/80 transition-colors font-semibold"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;