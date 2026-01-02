import { useCallback } from 'react';
import { useLogoutMutation } from '../redux/services/api/authAPI';
import { useAppDispatch } from '../redux/store';
import { clearAuthInfo } from '../redux/reducers/authSlice';
import { clearUserInfo } from '../redux/reducers/userInfoSlice';
import { useAuthRedirect } from './authHooks';

export const useLogout = () => {
    const [triggerLogout] = useLogoutMutation();
    const dispatch = useAppDispatch();
    const { redirectAfterLogout } = useAuthRedirect();

    const logout = useCallback(async (showSuccessMessage = true) => {
        try {
            // Call logout API
            await triggerLogout().unwrap();
        } catch (error) {
            console.error('Logout API error:', error);
        } finally {
            dispatch(clearAuthInfo());
            dispatch(clearUserInfo());

            redirectAfterLogout();

            if (showSuccessMessage) {
                console.log('Successfully logged out');
            }
        }
    }, [triggerLogout, dispatch, redirectAfterLogout]);

    return { logout };
};
