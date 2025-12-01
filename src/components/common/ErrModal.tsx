import { hideErrModal } from '../../redux/reducers/modalVisibleSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store'
import BaseModal from './BaseModal';

function ErrModal() {
    const show = useAppSelector((state) => state.showErrModalState.visible);

    const dispatch = useAppDispatch();

    const onClose = () => {
        dispatch(hideErrModal());
    };

    if (!show) return null;

    function ErrModalContent() {
        return (
            <div>
                <p>An unexpected error has occurred. Please try again later.</p>
            </div>
        )
    }

    return (
        <>
            <BaseModal
                title="Warning"
                onClose={onClose}
            >
                <ErrModalContent />
            </BaseModal>
        </>
    )
}

export default ErrModal