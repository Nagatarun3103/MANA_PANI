import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
        <div className="flex flex-col md:flex-row min-h-screen font-sans">
            {/* Left Side */}
            <div className="flex-1 relative flex items-center justify-center bg-cover bg-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599058917212-d750089bc07d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')" }}>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 text-center p-5">
                    <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
                        MANA PANI
                    </h1>
                    <p className="text-xl md:text-2xl font-medium text-muted-foreground leading-relaxed mt-4">
                        Hydrate Your Ambition
                    </p>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex-1 flex items-center justify-center bg-background p-6">
                <Card className="w-full max-w-md mx-auto glass-card">
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-3xl font-bold text-foreground">Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            
                            {error && <p className="text-sm font-medium text-destructive">{error}</p>}

                            <Button type="submit" className="w-full btn-hero">
                                Login
                            </Button>
                        </form>
                        <div className="mt-4 text-center text-sm">
                            <Link to="/forgot-password" className="underline text-muted-foreground hover:text-primary">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don't have an account?{' '}
                            <Link to="/signup" className="underline text-primary">
                                Sign up
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
