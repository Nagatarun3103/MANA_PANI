import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, User, Lock, Eye, EyeOff } from "lucide-react";
import loginHero from "@/assets/login-minimal.jpg";
import { AuthContext } from "@/context/AuthContext";
import api from "@/services/api";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// DEV-ONLY SAFEGUARD: The hardcoded admin credentials below are for development and testing purposes only.
// For production, this should be removed and admin users should be managed through a secure backend interface.
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("user");
  const [error, setError] = useState('');
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
        const response = await api.post('/api/auth/login', { username, password, userType });
        const data = response.data; 

        if (!data || !data.token) {
            throw new Error("No token returned from login API");
        }

        const { token, user, role } = data;
        localStorage.setItem('auth_token', token);
        setAuth({ token, user, role });
        toast({
          title: "Welcome back!",
          description: "Login successful",
        });
        try {
            navigate('/dashboard', { replace: true });
        } catch (e) {
            console.error("Navigation failed, falling back to window.location.assign", e);
            window.location.assign('/dashboard');
        }
    } catch (error: any) {
        if (error.response?.status === 401) {
            setError('Invalid username or password');
            toast({
              title: "Error",
              description: "Invalid username or password",
              variant: "destructive",
            });
        } else {
            setError('Server unavailable. Try again later.');
            toast({
              title: "Error",
              description: "Server unavailable. Try again later.",
              variant: "destructive",
            });
        }
    }
  };

  return (
    <div className="min-h-screen flex bg-muted">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Logo & Title */}
          <div className="text-center space-y-2">
            <div className="flex items-center gap-2 justify-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center animate-scale-in">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                MANA PANI
              </h1>
            </div>
            <p className="text-base text-muted-foreground">
              Track your goals with clarity
            </p>
          </div>

          {/* Login Form */}
          <div className="card-minimal p-8 shadow-md bg-background">
            <h2 className="text-xl font-semibold mb-6 text-foreground">
              Welcome back
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-11"
                  placeholder="Enter your username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pr-10"
                    placeholder="Enter your password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  Login as
                </Label>
                <RadioGroup
                  defaultValue="user"
                  value={userType}
                  onValueChange={setUserType}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="user" />
                    <Label htmlFor="user">User</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin">Admin</Label>
                  </div>
                </RadioGroup>
              </div>

              {error && <p className="text-sm font-medium text-destructive">{error}</p>}

              <Button
                type="submit"
                className="w-full h-11 text-sm font-medium"
              >
                Sign in
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary hover:underline"
                >
                  Create one
                </Link>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                <Link to="/forgot-password" className="font-medium text-primary hover:underline">
                  Forgot Password?
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Hero Image */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <img
          src={loginHero}
          alt="Minimalist workspace"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/40 to-transparent" />
        <div className="absolute bottom-16 left-16 right-16 text-foreground space-y-3">
          <h2 className="text-4xl font-bold">
            Simple. Clean. Effective.
          </h2>
          <p className="text-lg text-muted-foreground max-w-md">
            Track your health and fitness goals with a minimalist approach
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;