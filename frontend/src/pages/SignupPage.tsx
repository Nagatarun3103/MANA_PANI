import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/auth/signup', { username, email, password, roles: ['user'] });
            navigate('/login');
        } catch (err) {
            setError('Failed to sign up. Please try a different username or email.');
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen font-sans">
            {/* Left Side - Image */}
            <div className="flex-1 relative flex items-center justify-center bg-cover bg-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop')" }}>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 text-center p-5">
                    <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
                        JOIN THE CREW
                    </h1>
                    <p className="text-xl md:text-2xl font-medium text-muted-foreground leading-relaxed mt-4">
                        Start your journey with us
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center bg-background p-6">
                <Card className="w-full max-w-md mx-auto glass-card">
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-3xl font-bold text-foreground">Create Account</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSignup} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Choose a username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            
                            {error && <p className="text-sm font-medium text-destructive">{error}</p>}

                            <Button type="submit" className="w-full btn-hero">
                                Sign Up
                            </Button>
                        </form>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="underline text-primary">
                                Login
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SignupPage;