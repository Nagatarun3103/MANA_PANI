import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import api from "@/services/api";

const signupSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(50, { message: "Username must be less than 50 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password must be less than 100 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
});

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = signupSchema.safeParse({ username, email, password });

    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    try {
        await api.post('/auth/signup', { username, email, password, roles: ['user'] });
        toast({
            title: "Account created successfully!",
            description: "Welcome to MANA PANI",
        });
        navigate('/');
    } catch (err: any) {
        if (err.response?.data?.message) {
            setErrors({ api: err.response.data.message });
        } else {
            setErrors({ api: 'Failed to sign up. Please try a different username or email.'});
        }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-elevated">
        {/* Left side - Image and Text */}
        <div
          className="relative hidden lg:block min-h-[600px] bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 to-blue-900/60 flex flex-col items-center justify-center p-12 text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              JOIN THE CREW
            </h2>
            <p className="text-xl md:text-2xl text-white/90 font-light">
              Start your journey with us
            </p>
          </div>
        </div>

        {/* Right side - Signup Form */}
        <div className="glass-card p-8 md:p-12 lg:rounded-l-none animate-slide-up">
          <h2 className="text-3xl font-bold mb-8">Create Account</h2>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-base">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`h-12 bg-input border-border rounded-xl text-base ${
                  errors.username ? "border-destructive" : ""
                }`}
                placeholder="Choose a username"
              />
              {errors.username && (
                <p className="text-sm text-destructive">{errors.username}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`h-12 bg-input border-border rounded-xl text-base ${
                  errors.email ? "border-destructive" : ""
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-base">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`h-12 bg-input border-border rounded-xl text-base ${
                  errors.password ? "border-destructive" : ""
                }`}
                placeholder="Create a strong password"
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            {errors.api && (
                <p className="text-sm text-destructive">{errors.api}</p>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold gradient-primary hover:opacity-90 transition-opacity rounded-xl"
            >
              Sign Up
            </Button>

            <div className="text-center pt-4">
              <span className="text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="text-accent hover:text-accent/80 transition-colors font-semibold"
                >
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
