import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

export const useAuthRedirect = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getRedirectPath = useCallback(() => {
        const urlParams = new URLSearchParams(location.search);
        const redirectTo = urlParams.get('redirectTo');

        const stateRedirect = (location.state as { from?: { pathname: string } })?.from?.pathname;

        const redirectPath = redirectTo || stateRedirect || '/';

        return redirectPath;
    }, [location]);

    const redirectAfterLogin = useCallback(() => {
        const redirectPath = getRedirectPath();

        // Restore any previous state that was saved
        const previousState = (location.state as { previousState?: unknown })?.previousState;

        navigate(redirectPath, {
            replace: true,
            state: previousState // Restore the original state
        });
    }, [navigate, getRedirectPath, location.state]);

    const redirectToLogin = useCallback((currentPath?: string) => {
        const from = currentPath || location.pathname;


        if (from === '/login' || from === '/signup' || from === '/guest-login') {
            navigate('/login', { replace: true });
            return;
        }

        const loginUrl = `/login?redirectTo=${encodeURIComponent(from)}`;

        navigate(loginUrl, {
            state: {
                from: { pathname: from },
                // Preserve any existing location state
                previousState: location.state
            },
            replace: true
        });
    }, [navigate, location.pathname, location.state]);

    const redirectAfterLogout = useCallback(() => {
        navigate('/', { replace: true });
    }, [navigate]);

    return {
        redirectAfterLogin,
        redirectToLogin,
        redirectAfterLogout,
        getRedirectPath
    };
};
