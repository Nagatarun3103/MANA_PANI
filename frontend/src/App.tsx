import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import GoalPage from './pages/GoalPage';
import HealthPage from './pages/HealthPage';
import PublicPage from './pages/PublicPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import TaskSurveyPage from './pages/TaskSurveyPage';
import SuggestionsPage from './pages/SuggestionsPage';
import AnimatedBackground from './components/AnimatedBackground';

import ProtectedRoute from './components/ProtectedRoute';

// Force new build on Vercel
function App() {
    return (
        <AuthProvider>
            <div className="relative min-h-screen">
                <AnimatedBackground />
                <div className="relative z-10">
                    <Router>
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                            <Route path="/reset-password" element={<ResetPasswordPage />} />
                            <Route path="/public" element={<PublicPage />} />
                            <Route element={<ProtectedRoute />}>
                                <Route path="/dashboard" element={<DashboardPage />} />
                                <Route path="/goals" element={<GoalPage />} />
                                <Route path="/health" element={<HealthPage />} />
                                <Route path="/suggestions" element={<SuggestionsPage />} />
                                <Route path="/survey" element={<TaskSurveyPage />} />

                            </Route>
                            <Route path="*" element={<LoginPage />} />
                        </Routes>
                    </Router>
                </div>
            </div>
        </AuthProvider>
    );
}

export default App;
