import { useEffect } from 'react'
import { useAppSelector } from '../redux/store';
import { useAuthRedirect } from '../hooks/useAuthRedirect';

interface UnauthorizedRouteProps {
    children: React.ReactNode;
}

export const UnauthorizedRoute: React.FC<UnauthorizedRouteProps> = ({ children }) => {
    const { accessToken } = useAppSelector(state => state.authState);
    const { redirectAfterLogin } = useAuthRedirect();
    const isAuthenticated = !!accessToken;

    useEffect(() => {
        if (isAuthenticated) {
            redirectAfterLogin();
        }
    }, [isAuthenticated, redirectAfterLogin]);

    if (isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
