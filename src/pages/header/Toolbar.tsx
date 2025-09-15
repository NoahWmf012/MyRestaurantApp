import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import MainIcon from "../../assets/icons/main.png"
import LoginIcon from "../../assets/icons/user-interface.png"
import SettingIcon from "../../assets/icons/setting-lines.png"
import SearchBar from "../../components/searchBar/SearchBar"

function Toolbar() {
    const navigate = useNavigate()

    const handleHomeClick = useCallback(() => {
        navigate("/")
    }, [navigate])

    return (
        <div className="toolbar-container d-flex justify-content-between align-items-center">
            {/* Home button */}
            <div>
                <img src={MainIcon} alt="Main Icon" className="title-icon main-icon mx-3" id="home-button" onClick={handleHomeClick} />
            </div>

            {/* Search field */}
            <SearchBar suggestions={[]} />


            <div className="d-flex mx-3">
                {/* Settings button */}
                <button className="title-btn settings-button mx-1">
                    <img src={SettingIcon} alt="Settings Icon" className="title-icon settings-icon mx-2" />
                    <span>Settings</span>
                </button>

                {/* Log in button */}
                <button className="title-btn login-button mx-1">
                    <img src={LoginIcon} alt="Login Icon" className="title-icon login-icon mx-2" />
                    <span>Log In</span>
                </button>
            </div>
        </div>
    )
}

export default Toolbar