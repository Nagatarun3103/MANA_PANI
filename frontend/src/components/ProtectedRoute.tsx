import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';

const ProtectedRoute = () => {
    const { authTokens } = useContext(AuthContext);

    return authTokens.token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
