import { useCallback } from 'react';
import { hideErrModal } from '../../redux/reducers/modalVisibleSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store'
import './CommonStyle.style.scss';

function ErrModal() {
    const { visible, title, message, type } = useAppSelector((state) => state.showErrModalState);
    const dispatch = useAppDispatch();

    const onClose = useCallback(() => {
        dispatch(hideErrModal());
    }, [dispatch]);

    // Auto-dismiss after 5 seconds
    // useEffect(() => {
    //     if (visible) {
    //         const timer = setTimeout(() => {
    //             onClose();
    //         }, 5000);

    //         return () => clearTimeout(timer);
    //     }
    // }, [visible, onClose]);

    if (!visible) return null;

    // Icon based on type
    const getIcon = () => {
        switch (type) {
            case 'error':
                return '❌';
            case 'warning':
                return '⚠️';
            case 'info':
                return 'ℹ️';
            case 'success':
                return '✅';
            default:
                return '❌';
        }
    };

    // Color class based on type
    const getTypeClass = () => {
        switch (type) {
            case 'error':
                return 'toast-error';
            case 'warning':
                return 'toast-warning';
            case 'info':
                return 'toast-info';
            case 'success':
                return 'toast-success';
            default:
                return 'toast-error';
        }
    };

    return (
        <div className="toast-container">
            <div className={`toast ${getTypeClass()}`} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <span className="toast-icon">{getIcon()}</span>
                    <strong className="toast-title">{title || 'Notification'}</strong>
                    <button
                        type="button"
                        className="toast-close-btn"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>
                <div className="toast-body">
                    {message}
                </div>
            </div>
        </div>
    );
}

export default ErrModal;