import { ProtectedRoute } from "../../components/ProtectedRoute";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.scss';

interface UserProfile {
    id: string;
    userName: string;
    email: string;
    role: string;
    isAnonymous: boolean;
    joinedDate?: string;
    favoriteRestaurants?: number;
    totalReviews?: number;
    pollsCreated?: number;
}

function ProfilePage() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'favorites' | 'polls'>('overview');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load user profile data
        const loadProfile = () => {
            try {
                const authInfo = localStorage.getItem('authInfo');
                if (authInfo) {
                    const parsed = JSON.parse(authInfo);
                    // Mock profile data - replace with actual API call
                    setProfile({
                        id: parsed.userId || '1',
                        userName: parsed.userName || 'User',
                        email: parsed.email || 'user@example.com',
                        role: 'user',
                        isAnonymous: false,
                        joinedDate: '2024-01-15',
                        favoriteRestaurants: 12,
                        totalReviews: 28,
                        pollsCreated: 15
                    });
                }
            } catch (error) {
                console.error('Error loading profile:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadProfile();
    }, []);

    const handleEditProfile = () => {
        navigate('/settings');
    };

    if (isLoading) {
        return (
            <ProtectedRoute>
                <div className="profile-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading profile...</p>
                </div>
            </ProtectedRoute>
        );
    }

    if (!profile) {
        return (
            <ProtectedRoute>
                <div className="profile-error">
                    <h2>Profile not found</h2>
                    <p>Unable to load your profile information.</p>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="profile-page">
                {/* Hero Section */}
                <section className="profile-hero">
                    <div className="profile-hero-content">
                        <div className="profile-avatar">
                            <div className="avatar-circle">
                                {profile.userName.charAt(0).toUpperCase()}
                            </div>
                            <button className="avatar-edit-btn" title="Change avatar">
                                📷
                            </button>
                        </div>
                        <div className="profile-info">
                            <h1 className="profile-name">{profile.userName}</h1>
                            <p className="profile-email">{profile.email}</p>
                            <div className="profile-badges">
                                {!profile.isAnonymous && (
                                    <span className="badge badge-verified">✓ Verified Member</span>
                                )}
                                <span className="badge badge-role">{profile.role}</span>
                            </div>
                        </div>
                        <button className="btn-edit-profile" onClick={handleEditProfile}>
                            ⚙️ Edit Profile
                        </button>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="profile-stats">
                    <div className="stats-container">
                        <div className="stat-card">
                            <div className="stat-icon">❤️</div>
                            <div className="stat-value">{profile.favoriteRestaurants || 0}</div>
                            <div className="stat-label">Favorite Restaurants</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">⭐</div>
                            <div className="stat-value">{profile.totalReviews || 0}</div>
                            <div className="stat-label">Reviews Written</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">🗳️</div>
                            <div className="stat-value">{profile.pollsCreated || 0}</div>
                            <div className="stat-label">Polls Created</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">📅</div>
                            <div className="stat-value">
                                {profile.joinedDate
                                    ? new Date(profile.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                                    : 'N/A'}
                            </div>
                            <div className="stat-label">Member Since</div>
                        </div>
                    </div>
                </section>

                {/* Tabs Section */}
                <section className="profile-content">
                    <div className="profile-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            📊 Overview
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            ⭐ My Reviews
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
                            onClick={() => setActiveTab('favorites')}
                        >
                            ❤️ Favorites
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'polls' ? 'active' : ''}`}
                            onClick={() => setActiveTab('polls')}
                        >
                            🗳️ My Polls
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'overview' && (
                            <div className="overview-content">
                                <div className="activity-section">
                                    <h2>Recent Activity</h2>
                                    <div className="activity-list">
                                        <div className="activity-item">
                                            <div className="activity-icon">⭐</div>
                                            <div className="activity-details">
                                                <p className="activity-text">
                                                    Reviewed <strong>Italian Bistro</strong>
                                                </p>
                                                <p className="activity-time">2 hours ago</p>
                                            </div>
                                        </div>
                                        <div className="activity-item">
                                            <div className="activity-icon">❤️</div>
                                            <div className="activity-details">
                                                <p className="activity-text">
                                                    Added <strong>Sushi Paradise</strong> to favorites
                                                </p>
                                                <p className="activity-time">1 day ago</p>
                                            </div>
                                        </div>
                                        <div className="activity-item">
                                            <div className="activity-icon">🗳️</div>
                                            <div className="activity-details">
                                                <p className="activity-text">
                                                    Created poll "Weekend Brunch Spot"
                                                </p>
                                                <p className="activity-time">3 days ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="preferences-section">
                                    <h2>Dining Preferences</h2>
                                    <div className="preferences-grid">
                                        <div className="preference-item">
                                            <span className="preference-icon">🍕</span>
                                            <span>Italian Cuisine</span>
                                        </div>
                                        <div className="preference-item">
                                            <span className="preference-icon">🍣</span>
                                            <span>Japanese Cuisine</span>
                                        </div>
                                        <div className="preference-item">
                                            <span className="preference-icon">🌮</span>
                                            <span>Mexican Food</span>
                                        </div>
                                        <div className="preference-item">
                                            <span className="preference-icon">🥗</span>
                                            <span>Healthy Options</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="reviews-content">
                                <div className="empty-state">
                                    <div className="empty-icon">⭐</div>
                                    <h3>No Reviews Yet</h3>
                                    <p>Start sharing your dining experiences!</p>
                                    <button className="btn-primary" onClick={() => navigate('/')}>
                                        Explore Restaurants
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'favorites' && (
                            <div className="favorites-content">
                                <div className="empty-state">
                                    <div className="empty-icon">❤️</div>
                                    <h3>No Favorites Yet</h3>
                                    <p>Save your favorite restaurants for quick access!</p>
                                    <button className="btn-primary" onClick={() => navigate('/')}>
                                        Discover Restaurants
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'polls' && (
                            <div className="polls-content">
                                <div className="empty-state">
                                    <div className="empty-icon">🗳️</div>
                                    <h3>No Polls Created</h3>
                                    <p>Create a poll to help your group decide where to eat!</p>
                                    <button className="btn-primary" onClick={() => navigate('/vote')}>
                                        Create a Poll
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </ProtectedRoute>
    );
}

export default ProfilePage;