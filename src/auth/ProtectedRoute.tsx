import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from './useAuth';

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return <p>Checking authentication...</p>;

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const AdminOnlyRoute = () => {
    const { isAdmin } = useAuth();

    if (isAdmin === null) return <p>Loading...</p>;
    return isAdmin ? <Outlet /> : <Navigate to="/profile" />;
};

export {ProtectedRoute, AdminOnlyRoute};
