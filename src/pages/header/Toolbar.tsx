import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import MainIcon from "../../assets/icons/main.png"
import LoginIcon from "../../assets/icons/user-interface.png"
import SettingIcon from "../../assets/icons/setting-lines.png"
import MoreIcon from "../../assets/icons/more.png"
import SearchBar from "../../components/searchBar/SearchBar"
import { useAppDispatch } from "../../redux/store"
import { showRouletteModal, showVoteModal } from "../../redux/reducers/modalVisibleSlice"

function Toolbar() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleHomeClick = useCallback(() => {
        navigate("/")
    }, [navigate])

    return (
        <div className="toolbar-container d-flex justify-content-between align-items-center">
            {/* Home button */}
            <div>
                <img
                    src={MainIcon}
                    alt="Main Icon"
                    className="title-icon mx-3"
                    id="home-button"
                    onClick={handleHomeClick}
                />
            </div>

            {/* Search field */}
            <SearchBar suggestions={[]} />

            <div className="d-flex mx-3">
                {/* Settings button */}
                <button className="title-btn settings-button mx-1">
                    <img src={SettingIcon} alt="Settings Icon" className="title-icon mx-2" />
                    <span>Settings</span>
                </button>

                {/* Log in button */}
                <button className="title-btn login-button mx-1">
                    <img src={LoginIcon} alt="Login Icon" className="title-icon mx-2" />
                    <span>Log In</span>
                </button>

                {/* More dropdown */}
                <div className="dropdown">
                    <button
                        className="title-btn more-button mx-1 dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img src={MoreIcon} alt="More Icon" className="title-icon mx-2" />
                        <span>More</span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li>
                            <button className="spinwheel-button spinwheel-button-primary" onClick={() => dispatch(showRouletteModal())}>Spin a wheel</button>
                        </li>
                        <li>
                            {/* Vote Button */}
                            <button className="spinwheel-button spinwheel-button-primary" onClick={() => dispatch(showVoteModal())}>Vote</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Toolbar
