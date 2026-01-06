import { ProtectedRoute } from "../../components/ProtectedRoute";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../redux/services/api/authAPI';
import TranslateIcon from '../../assets/icons/translate.png'
import './Settings.scss';
import { LANGEUAGE_SETTING_LIST } from "../../constants/settingConstant";

interface UserSettings {
    userName: string;
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

function SettingsPage() {
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [userSettings, setUserSettings] = useState<UserSettings>({
        userName: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
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

                {/* Main Content */}
                <div className="settings-container">
                    <main className="settings-content">
                        {/* Success/Error Message */}
                        {saveMessage && (
                            <div className={`settings-message ${saveMessage.type}`}>
                                {saveMessage.type === 'success' ? '✓' : '⚠'} {saveMessage.text}
                            </div>
                        )}

                        {/* Account Section */}
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
                        </div>
                        <div className="section-divider"></div>

                        {/* Language Section */}
                        <div className="settings-section">
                            <h2 className="section-header">Language</h2>
                            <p className="section-description">
                                Choose your preferred language for the app
                            </p>

                            <div className="language-setting">
                                <div className="language-option">
                                    <div className="language-info">
                                        <img src={TranslateIcon} alt="Translate Icon" className="language-icon" />
                                    </div>
                                    <select className="form-select">
                                        {LANGEUAGE_SETTING_LIST.map(lang => (
                                            <option key={lang.code} value={lang.code}>{lang.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* Delete Account */}
                        <div className="settings-section">
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
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}

export default SettingsPage;