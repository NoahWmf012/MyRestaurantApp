import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

export const useAuthRedirect = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getRedirectPath = useCallback(() => {
        const urlParams = new URLSearchParams(location.search);
        const redirectTo = urlParams.get('redirectTo');

        const stateRedirect = (location.state as { from?: { pathname: string } })?.from?.pathname;

        return redirectTo || stateRedirect || '/';
    }, [location]);

    const redirectAfterLogin = useCallback(() => {
        const redirectPath = getRedirectPath();
        navigate(redirectPath, { replace: true });
    }, [navigate, getRedirectPath]);

    const redirectToLogin = useCallback((currentPath?: string) => {
        const from = currentPath || location.pathname;

        if (from === '/login' || from === '/signup') {
            navigate('/login', { replace: true });
            return;
        }

        navigate(`/login?redirectTo=${encodeURIComponent(from)}`, {
            state: { from: { pathname: from } },
            replace: true
        });
    }, [navigate, location.pathname]);

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
