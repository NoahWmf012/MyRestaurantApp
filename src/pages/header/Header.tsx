import RoulettePopup from '../../components/spinWheel/RoulettePopup'
import VoteModal from '../../components/vote/VoteModal'
import { useAppSelector } from '../../redux/store';
import Toolbar from './Toolbar'

function Header() {
    const showVoteModal = useAppSelector((state) => state.showVoteModalState.visible);
    return (
        <div className='header-container'>
            <Toolbar />

            {/* Popup Modals */}
            <RoulettePopup />
            {showVoteModal && <VoteModal />}
        </div>
    )
}

export default Header