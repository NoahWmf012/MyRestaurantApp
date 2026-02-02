import type { UserPrismaInterface } from "../../interfaces/schemaPrismaInterface";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProfileQuery } from "../../redux/services/api/userAPI";
import TabSection from "./TabSection";
import './Profile.scss';

type TabType = 'favorites' | 'reviews' | 'polls';

function ProfilePage() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<UserPrismaInterface | null>(null);
    const [activeTab, setActiveTab] = useState<TabType>('favorites');
    const [isLoading, setIsLoading] = useState(true);

    const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery();

    useEffect(() => {
        if (profileData) {
            setProfile(profileData);
        }
        setIsLoading(isProfileLoading);
    }, [profileData, isProfileLoading]);

    const handleEditProfile = () => {
        navigate('/settings');
    };

    //todo: add loading spinner
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
                                {profile.avatarUrl ? (
                                    <img src={profile.avatarUrl} alt={profile.userName} />
                                ) : (
                                    profile.userName.charAt(0).toUpperCase()
                                )}
                            </div>
                            <button className="avatar-edit-btn" title="Change avatar">
                                📷
                            </button>
                        </div>
                        <div className="profile-info">
                            <h1 className="profile-name">{profile.userName}</h1>
                            <p className="profile-email">{profile.email}</p>
                            <div className="profile-badges">
                                {profile.email && (
                                    <span className="badge badge-verified">✓ Verified Member</span>
                                )}
                                <span className="badge badge-role">{profile.role}</span>
                            </div>
                        </div>
                        <button className="btn-edit-profile" onClick={handleEditProfile}>
                            Edit Profile
                        </button>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="profile-stats">
                    <div className="stats-container">
                        <div className="stat-card">
                            <div className="stat-icon">❤️</div>
                            <div className="stat-value">{profile.bookmarkedRestaurants.length || 0}</div>
                            <div className="stat-label">Favorite Restaurants</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">⭐</div>
                            <div className="stat-value">{profile.reviews.length || 0}</div>
                            <div className="stat-label">Reviews Written</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">🗳️</div>
                            <div className="stat-value">{profile.polls.length || 0}</div>
                            <div className="stat-label">Polls Created</div>
                        </div>
                    </div>
                </section>

                {/* Tabs Section */}
                <TabSection profile={profile} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
        </ProtectedRoute>
    );
}

export default ProfilePage;