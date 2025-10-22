import { useCallback, useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import MainIcon from "../../assets/icons/main.png"
import LoginIcon from "../../assets/icons/user-interface.png"
import SettingIcon from "../../assets/icons/setting-lines.png"
import MoreIcon from "../../assets/icons/more.png"
import SearchBar from "../../components/searchBar/SearchBar"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { showRouletteModal, showVoteModal } from "../../redux/reducers/modalVisibleSlice"
import { useLogout } from "../../hooks/useLogout"

function Toolbar() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Authentication state
    const { accessToken } = useAppSelector(state => state.authState)
    const { userName } = useAppSelector(state => state.userInfoState)
    const { logout } = useLogout()
    const isAuthenticated = !!accessToken

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }

        // Only add listener when dropdown is open
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isDropdownOpen])

    const handleHomeClick = useCallback(() => {
        navigate("/")
    }, [navigate])

    const handleSpinWheel = useCallback(() => {
        dispatch(showRouletteModal())
        setIsDropdownOpen(false)
    }, [dispatch])

    const handleVote = useCallback(() => {
        dispatch(showVoteModal())
        setIsDropdownOpen(false)
    }, [dispatch])

    const toggleDropdown = useCallback(() => {
        setIsDropdownOpen(prev => !prev)
    }, [])

    const handleLogout = useCallback(() => {
        logout()
        setIsDropdownOpen(false)
    }, [logout])

    const handleSettingsClick = useCallback(() => {
        navigate("/settings")
        setIsDropdownOpen(false)
    }, [navigate])

    const handleProfileClick = useCallback(() => {
        navigate("/profile")
        setIsDropdownOpen(false)
    }, [navigate])

    return (
        <div className="toolbar-container d-flex justify-content-between align-items-center">
            {/* Home button */}
            <div className="toolbar-section">
                <button
                    className="home-button"
                    onClick={handleHomeClick}
                    aria-label="Go to home page"
                >
                    <img
                        src={MainIcon}
                        alt=""
                        className="title-icon"
                        id="home-button"
                    />
                </button>
            </div>

            {/* Search field */}
            <div className="toolbar-section toolbar-section--search">
                <SearchBar suggestions={[]} />
            </div>

            <div className="toolbar-section d-flex">
                {isAuthenticated ? (
                    <>
                        {/* Settings button (only shown when logged in) */}
                        <button
                            className="title-btn settings-button mx-1"
                            aria-label="Open settings"
                            onClick={handleSettingsClick}
                        >
                            <img src={SettingIcon} alt="" className="title-icon" />
                            <span>Settings</span>
                        </button>

                        {/* User welcome message */}
                        <button
                            className="title-btn user-welcome mx-1"
                            onClick={handleProfileClick}
                        >
                            <img src={LoginIcon} alt="" className="title-icon" />
                            <span>Hi, {userName || 'User'}!</span>
                        </button>
                    </>
                ) : (
                    /* Log in button (only shown when not logged in) */
                    <button
                        className="title-btn login-button mx-1"
                        aria-label="Log in to your account"
                        onClick={() => navigate("/login")}
                    >
                        <img src={LoginIcon} alt="" className="title-icon" />
                        <span>Log In</span>
                    </button>
                )}

                {/* More dropdown */}
                <div className="dropdown" ref={dropdownRef}>
                    <button
                        className={`title-btn more-button mx-1 ${isDropdownOpen ? 'dropdown-active' : ''}`}
                        type="button"
                        onClick={toggleDropdown}
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="true"
                        aria-label="More options"
                    >
                        <img src={MoreIcon} alt="" className="title-icon" />
                        <span>More</span>
                        <svg
                            className={`dropdown-chevron ${isDropdownOpen ? 'dropdown-chevron--rotated' : ''}`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isDropdownOpen && (
                        <div className="dropdown-menu show">
                            <button
                                className="dropdown-item modern-dropdown-item"
                                onClick={handleSpinWheel}
                            >
                                <svg className="dropdown-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
                                </svg>
                                <div>
                                    <div className="dropdown-item-title">Spin Wheel</div>
                                    <div className="dropdown-item-desc">Let chance decide your restaurant</div>
                                </div>
                            </button>

                            <button
                                className="dropdown-item modern-dropdown-item"
                                onClick={handleVote}
                            >
                                <svg className="dropdown-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <div>
                                    <div className="dropdown-item-title">Vote</div>
                                    <div className="dropdown-item-desc">Vote for your favorite restaurant</div>
                                </div>
                            </button>

                            {/* Logout button (only shown when authenticated) */}
                            {isAuthenticated && (
                                <>
                                    <div className="dropdown-divider"></div>
                                    <button
                                        className="dropdown-item modern-dropdown-item"
                                        onClick={handleLogout}
                                    >
                                        <svg className="dropdown-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <div>
                                            <div className="dropdown-item-title">Logout</div>
                                            <div className="dropdown-item-desc">Sign out of your account</div>
                                        </div>
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Toolbar
