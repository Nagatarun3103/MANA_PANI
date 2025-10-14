import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import api from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const tokenFromUrl = searchParams.get('token');
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        } else {
            setError("Invalid or missing reset token.");
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!token) {
            setError("Invalid or missing reset token.");
            return;
        }

        try {
            const response = await api.post('/auth/reset-password', { token, newPassword });
            setMessage(response.data.message);
            setTimeout(() => {
                navigate('/');
            }, 3000); // Redirect to login after 3 seconds
        } catch (err) {
            setError('Failed to reset password. The token might be invalid or expired.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
            <Card className="w-full max-w-md mx-auto glass-card">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-3xl font-bold text-foreground">Reset Password</CardTitle>
                    <CardDescription>
                        Enter your new password below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {token ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    placeholder="Enter your new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            
                            {message && <p className="text-sm font-medium text-green-500">{message}</p>}
                            {error && <p className="text-sm font-medium text-destructive">{error}</p>}

                            <Button type="submit" className="w-full">
                                Reset Password
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center">
                            <p className="text-sm font-medium text-destructive">{error || "No reset token provided."}</p>
                            <div className="mt-4 text-center text-sm">
                                <Link to="/" className="underline text-primary">
                                    Back to Login
                                </Link>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ResetPasswordPage;
