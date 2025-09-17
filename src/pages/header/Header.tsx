import RoulettePopup from '../../components/spinWheel/RoulettePopup'
import Toolbar from './Toolbar'

function Header() {
    return (
        <div className='header-container'>
            <Toolbar />

            {/* Popup Modals */}
            <RoulettePopup />
        </div>
    )
}

export default Header