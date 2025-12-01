import { useAppSelector } from '../../redux/store'

function ErrModal() {
    const show = useAppSelector((state) => state.showErrModalState.visible);

    if (!show) return null;

    return (
        <div>ErrModal</div>
    )
}

export default ErrModal