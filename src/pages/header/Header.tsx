import RoulettePopup from '../../components/spinWheel/RoulettePopup'
import VoteModal from '../../components/vote/VoteModal'
import Toolbar from './Toolbar'

function Header() {
    return (
        <div className='header-container'>
            <Toolbar />

            {/* Popup Modals */}
            <RoulettePopup />
            <VoteModal />
        </div>
    )
}

export default Header