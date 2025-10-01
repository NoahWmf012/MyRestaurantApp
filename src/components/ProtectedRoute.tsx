import { useEffect } from 'react';
import { useAppSelector } from '../redux/store';
import { useAuthRedirect } from '../hooks/useAuthRedirect';

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

    const isAuthenticated = !!accessToken && accessToken.trim() !== '';

    useEffect(() => {
        if (requireAuth && !isAuthenticated) {
            redirectToLogin();
        }
    }, [requireAuth, isAuthenticated, redirectToLogin]);

    if (requireAuth && !isAuthenticated) {
        return null;
    }

    return <>{children}</>;
};
