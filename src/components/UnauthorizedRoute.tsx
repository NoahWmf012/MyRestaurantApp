import { useEffect } from 'react'
import { useAppSelector } from '../redux/store';
import { useNavigate } from 'react-router-dom';

interface UnauthorizedRouteProps {
    children: React.ReactNode;
}

export const UnauthorizedRoute: React.FC<UnauthorizedRouteProps> = ({ children }) => {
    const { accessToken } = useAppSelector(state => state.authState);
    const navigate = useNavigate();
    const isAuthenticated = !!accessToken;

    useEffect(() => {
        if (isAuthenticated) {
            // If user is already authenticated, redirect to home page
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    // If user is authenticated, don't render the login/signup page
    if (isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
