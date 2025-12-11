import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';

const AdminProtectedRoute = () => {
    const { isAdmin } = useContext(AuthContext);

    return isAdmin ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default AdminProtectedRoute;
