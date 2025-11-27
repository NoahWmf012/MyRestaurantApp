import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/store';
import { useAuthRedirect } from '../hooks/authHooks';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requireAuth = true
}) => {
    const { accessToken } = useAppSelector(state => state.authState);
    const { redirectToLogin } = useAuthRedirect();
    const location = useLocation();

    const isAuthenticated = !!accessToken && accessToken.trim() !== '';

    useEffect(() => {
        if (requireAuth && !isAuthenticated) {
            // Pass the full path (including search params and hash) to preserve complete state
            const fullPath = location.pathname + location.search + location.hash;
            redirectToLogin(fullPath);
        }
    }, [requireAuth, isAuthenticated, redirectToLogin, location]);

    if (requireAuth && !isAuthenticated) {
        return null;
    }

    return <>{children}</>;
};
