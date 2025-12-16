import { useCallback, useEffect, useRef } from 'react';
import { hideErrModal } from '../../redux/reducers/modalVisibleSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store'
import './CommonStyle.style.scss';
import { modalCallbackManager } from '../../utils/modalCallbackManager';

function MsgModal() {
    const { visible, title, message, type } = useAppSelector((state) => state.showErrModalState);
    const dispatch = useAppDispatch();
    const dismissTimerRef = useRef<NodeJS.Timeout | null>(null);

    const onClose = useCallback(() => {
        // Execute callback if exists
        modalCallbackManager.execute();

        dispatch(hideErrModal());
        if (dismissTimerRef.current) {
            clearTimeout(dismissTimerRef.current);
            dismissTimerRef.current = null;
        }
    }, [dispatch]);

    // Handle click outside to start dismiss timer
    useEffect(() => {
        if (!visible) return;

        const handleClickOutside = (event: MouseEvent) => {
            const toastElement = document.querySelector('.toast');
            if (toastElement && !toastElement.contains(event.target as Node)) {
                // Clear any existing timer
                if (dismissTimerRef.current) {
                    clearTimeout(dismissTimerRef.current);
                }

                dismissTimerRef.current = setTimeout(() => {
                    onClose();
                }, 1500);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (dismissTimerRef.current) {
                clearTimeout(dismissTimerRef.current);
            }
        };
    }, [visible, onClose]);

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

export default MsgModal;