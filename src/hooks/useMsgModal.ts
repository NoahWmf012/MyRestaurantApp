import { useAppDispatch } from '../redux/store';
import { showErrModal } from '../redux/reducers/modalVisibleSlice';

export const useMsgModal = () => {
    const dispatch = useAppDispatch();

    const showError = (message: string, title?: string) => {
        dispatch(showErrModal({
            message,
            title: title || 'Error',
            type: 'error'
        }));
    };

    const showWarning = (message: string, title?: string) => {
        dispatch(showErrModal({
            message,
            title: title || 'Warning',
            type: 'warning'
        }));
    };

    const showInfo = (message: string, title?: string) => {
        dispatch(showErrModal({
            message,
            title: title || 'Information',
            type: 'info'
        }));
    };

    const showSuccess = (message: string, title?: string) => {
        dispatch(showErrModal({
            message,
            title: title || 'Success',
            type: 'success'
        }));
    };

    return {
        showError,
        showWarning,
        showInfo,
        showSuccess
    };
};
