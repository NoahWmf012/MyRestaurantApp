import { ProtectedRoute } from "../../components/ProtectedRoute";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../redux/services/api/userAPI';
import './Settings.scss';

interface UserSettings {
    userName: string;
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface NotificationSettings {
    emailNotifications: boolean;
    pollUpdates: boolean;
    newReviews: boolean;
    weeklyDigest: boolean;
}

interface PrivacySettings {
    profileVisibility: 'public' | 'private';
    showEmail: boolean;
    showReviews: boolean;
    showFavorites: boolean;
}

function SettingsPage() {
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();
    const [activeSection, setActiveSection] = useState<'account' | 'notifications' | 'privacy' | 'preferences'>('account');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [userSettings, setUserSettings] = useState<UserSettings>({
        userName: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [notifications, setNotifications] = useState<NotificationSettings>({
        emailNotifications: true,
        pollUpdates: true,
        newReviews: false,
        weeklyDigest: true
    });

    const [privacy, setPrivacy] = useState<PrivacySettings>({
        profileVisibility: 'public',
        showEmail: false,
        showReviews: true,
        showFavorites: true
    });

    useEffect(() => {
        // Load user data from localStorage
        const authInfo = localStorage.getItem('authInfo');
        if (authInfo) {
            const parsed = JSON.parse(authInfo);
            setUserSettings(prev => ({
                ...prev,
                userName: parsed.userName || '',
                email: parsed.email || ''
            }));
        }
    }, []);

    const handleAccountUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement actual API call
        setSaveMessage({ type: 'success', text: 'Account information updated successfully!' });
        setTimeout(() => setSaveMessage(null), 3000);
    };

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();

        if (userSettings.newPassword !== userSettings.confirmPassword) {
            setSaveMessage({ type: 'error', text: 'New passwords do not match!' });
            setTimeout(() => setSaveMessage(null), 3000);
            return;
        }

        if (userSettings.newPassword.length < 8) {
            setSaveMessage({ type: 'error', text: 'Password must be at least 8 characters long!' });
            setTimeout(() => setSaveMessage(null), 3000);
            return;
        }

        // TODO: Implement actual API call
        setSaveMessage({ type: 'success', text: 'Password changed successfully!' });
        setUserSettings(prev => ({
            ...prev,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }));
        setTimeout(() => setSaveMessage(null), 3000);
    };

    const handleNotificationsSave = () => {
        // TODO: Implement actual API call
        setSaveMessage({ type: 'success', text: 'Notification preferences saved!' });
        setTimeout(() => setSaveMessage(null), 3000);
    };

    const handlePrivacySave = () => {
        // TODO: Implement actual API call
        setSaveMessage({ type: 'success', text: 'Privacy settings saved!' });
        setTimeout(() => setSaveMessage(null), 3000);
    };

    const handleDeleteAccount = async () => {
        // TODO: Implement actual API call for account deletion
        try {
            await logout().unwrap();
            localStorage.removeItem('authInfo');
            navigate('/');
        } catch (error) {
            console.error('Error deleting account:', error);
            setSaveMessage({ type: 'error', text: 'Failed to delete account. Please try again.' });
            setTimeout(() => setSaveMessage(null), 3000);
        }
    };

    return (
        <ProtectedRoute>
            <div className="settings-page">
                {/* Hero Section */}
                {/* <section className="settings-hero">
                    <div className="settings-hero-content">
                        <h1 className="settings-hero-title">Settings</h1>
                        <p className="settings-hero-subtitle">
                            Manage your account preferences and settings
                        </p>
                    </div>
                </section> */}

                {/* Main Content */}
                <div className="settings-container">
                    {/* Sidebar Navigation */}
                    <aside className="settings-sidebar">
                        <nav className="settings-nav">
                            <button
                                className={`nav-item ${activeSection === 'account' ? 'active' : ''}`}
                                onClick={() => setActiveSection('account')}
                            >
                                <span className="nav-icon">👤</span>
                                <span className="nav-text">Account</span>
                            </button>
                            <button
                                className={`nav-item ${activeSection === 'notifications' ? 'active' : ''}`}
                                onClick={() => setActiveSection('notifications')}
                            >
                                <span className="nav-icon">🔔</span>
                                <span className="nav-text">Notifications</span>
                            </button>
                            <button
                                className={`nav-item ${activeSection === 'privacy' ? 'active' : ''}`}
                                onClick={() => setActiveSection('privacy')}
                            >
                                <span className="nav-icon">🔒</span>
                                <span className="nav-text">Privacy</span>
                            </button>
                            <button
                                className={`nav-item ${activeSection === 'preferences' ? 'active' : ''}`}
                                onClick={() => setActiveSection('preferences')}
                            >
                                <span className="nav-icon">⚙️</span>
                                <span className="nav-text">Preferences</span>
                            </button>
                        </nav>
                    </aside>

                    {/* Main Content Area */}
                    <main className="settings-content">
                        {/* Success/Error Message */}
                        {saveMessage && (
                            <div className={`settings-message ${saveMessage.type}`}>
                                {saveMessage.type === 'success' ? '✓' : '⚠'} {saveMessage.text}
                            </div>
                        )}

                        {/* Account Section */}
                        {activeSection === 'account' && (
                            <div className="settings-section">
                                <h2 className="section-header">Account Information</h2>

                                {/* Profile Information */}
                                <form className="settings-form" onSubmit={handleAccountUpdate}>
                                    <div className="form-group">
                                        <label htmlFor="userName" className="form-label">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            id="userName"
                                            className="form-input"
                                            value={userSettings.userName}
                                            onChange={(e) => setUserSettings(prev => ({ ...prev, userName: e.target.value }))}
                                            placeholder="Enter your username"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email" className="form-label">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="form-input"
                                            value={userSettings.email}
                                            onChange={(e) => setUserSettings(prev => ({ ...prev, email: e.target.value }))}
                                            placeholder="your.email@example.com"
                                        />
                                    </div>

                                    <button type="submit" className="btn-save">
                                        Save Changes
                                    </button>
                                </form>

                                {/* Change Password */}
                                <div className="section-divider"></div>
                                <h3 className="subsection-header">Change Password</h3>

                                <form className="settings-form" onSubmit={handlePasswordChange}>
                                    <div className="form-group">
                                        <label htmlFor="currentPassword" className="form-label">
                                            Current Password
                                        </label>
                                        <input
                                            type="password"
                                            id="currentPassword"
                                            className="form-input"
                                            value={userSettings.currentPassword}
                                            onChange={(e) => setUserSettings(prev => ({ ...prev, currentPassword: e.target.value }))}
                                            placeholder="Enter current password"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="newPassword" className="form-label">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            id="newPassword"
                                            className="form-input"
                                            value={userSettings.newPassword}
                                            onChange={(e) => setUserSettings(prev => ({ ...prev, newPassword: e.target.value }))}
                                            placeholder="Enter new password (min 8 characters)"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="confirmPassword" className="form-label">
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            className="form-input"
                                            value={userSettings.confirmPassword}
                                            onChange={(e) => setUserSettings(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                            placeholder="Confirm new password"
                                        />
                                    </div>

                                    <button type="submit" className="btn-save">
                                        Update Password
                                    </button>
                                </form>

                                {/* Delete Account */}
                                <div className="section-divider"></div>
                                <div className="danger-zone">
                                    <h3 className="subsection-header danger">Danger Zone</h3>
                                    <p className="danger-text">
                                        Once you delete your account, there is no going back. Please be certain.
                                    </p>
                                    {!showDeleteConfirm ? (
                                        <button
                                            className="btn-danger"
                                            onClick={() => setShowDeleteConfirm(true)}
                                        >
                                            Delete Account
                                        </button>
                                    ) : (
                                        <div className="delete-confirm">
                                            <p className="confirm-text">Are you absolutely sure?</p>
                                            <div className="confirm-buttons">
                                                <button
                                                    className="btn-danger-confirm"
                                                    onClick={handleDeleteAccount}
                                                >
                                                    Yes, Delete My Account
                                                </button>
                                                <button
                                                    className="btn-cancel"
                                                    onClick={() => setShowDeleteConfirm(false)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Notifications Section */}
                        {activeSection === 'notifications' && (
                            <div className="settings-section">
                                <h2 className="section-header">Notification Preferences</h2>
                                <p className="section-description">
                                    Choose what notifications you'd like to receive
                                </p>

                                <div className="settings-list">
                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h4 className="setting-title">Email Notifications</h4>
                                            <p className="setting-desc">Receive email updates about your account</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={notifications.emailNotifications}
                                                onChange={(e) => setNotifications(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h4 className="setting-title">Poll Updates</h4>
                                            <p className="setting-desc">Get notified when polls you created receive votes</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={notifications.pollUpdates}
                                                onChange={(e) => setNotifications(prev => ({ ...prev, pollUpdates: e.target.checked }))}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h4 className="setting-title">New Reviews</h4>
                                            <p className="setting-desc">Be notified of new reviews on your favorite restaurants</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={notifications.newReviews}
                                                onChange={(e) => setNotifications(prev => ({ ...prev, newReviews: e.target.checked }))}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h4 className="setting-title">Weekly Digest</h4>
                                            <p className="setting-desc">Receive a weekly summary of trending restaurants</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={notifications.weeklyDigest}
                                                onChange={(e) => setNotifications(prev => ({ ...prev, weeklyDigest: e.target.checked }))}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                </div>

                                <button className="btn-save" onClick={handleNotificationsSave}>
                                    Save Preferences
                                </button>
                            </div>
                        )}

                        {/* Privacy Section */}
                        {activeSection === 'privacy' && (
                            <div className="settings-section">
                                <h2 className="section-header">Privacy Settings</h2>
                                <p className="section-description">
                                    Control your privacy and what others can see
                                </p>

                                <div className="form-group">
                                    <label className="form-label">Profile Visibility</label>
                                    <select
                                        className="form-select"
                                        value={privacy.profileVisibility}
                                        onChange={(e) => setPrivacy(prev => ({
                                            ...prev,
                                            profileVisibility: e.target.value as 'public' | 'private'
                                        }))}
                                    >
                                        <option value="public">Public - Anyone can view your profile</option>
                                        <option value="private">Private - Only you can view your profile</option>
                                    </select>
                                </div>

                                <div className="settings-list">
                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h4 className="setting-title">Show Email Address</h4>
                                            <p className="setting-desc">Allow others to see your email address</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={privacy.showEmail}
                                                onChange={(e) => setPrivacy(prev => ({ ...prev, showEmail: e.target.checked }))}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h4 className="setting-title">Show Reviews</h4>
                                            <p className="setting-desc">Display your reviews publicly</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={privacy.showReviews}
                                                onChange={(e) => setPrivacy(prev => ({ ...prev, showReviews: e.target.checked }))}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h4 className="setting-title">Show Favorites</h4>
                                            <p className="setting-desc">Let others see your favorite restaurants</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={privacy.showFavorites}
                                                onChange={(e) => setPrivacy(prev => ({ ...prev, showFavorites: e.target.checked }))}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                </div>

                                <button className="btn-save" onClick={handlePrivacySave}>
                                    Save Privacy Settings
                                </button>
                            </div>
                        )}

                        {/* Preferences Section */}
                        {activeSection === 'preferences' && (
                            <div className="settings-section">
                                <h2 className="section-header">App Preferences</h2>
                                <p className="section-description">
                                    Customize your GetherEat experience
                                </p>

                                <div className="preferences-grid">
                                    <div className="preference-card">
                                        <h4>🌍 Default Location</h4>
                                        <p>Set your preferred search location</p>
                                        <button className="btn-secondary">Update Location</button>
                                    </div>

                                    <div className="preference-card">
                                        <h4>📏 Distance Units</h4>
                                        <p>Choose between miles or kilometers</p>
                                        <select className="form-select">
                                            <option value="miles">Miles</option>
                                            <option value="km">Kilometers</option>
                                        </select>
                                    </div>

                                    <div className="preference-card">
                                        <h4>🍽️ Dietary Preferences</h4>
                                        <p>Set your dietary restrictions</p>
                                        <button className="btn-secondary">Manage Preferences</button>
                                    </div>

                                    <div className="preference-card">
                                        <h4>💰 Price Range</h4>
                                        <p>Default price filter</p>
                                        <select className="form-select">
                                            <option value="all">All Prices</option>
                                            <option value="$">$ (Budget)</option>
                                            <option value="$$">$$ (Moderate)</option>
                                            <option value="$$$">$$$ (Expensive)</option>
                                            <option value="$$$$">$$$$ (Luxury)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}

export default SettingsPage;