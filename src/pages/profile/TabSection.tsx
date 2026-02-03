import { useNavigate } from "react-router-dom";
import type { UserPrismaInterface } from "../../interfaces/schemaPrismaInterface";

type TabType = 'favorites' | 'reviews' | 'polls';

type Props = {
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
    profile: UserPrismaInterface;
}

function TabSection(props: Props) {
    const navigate = useNavigate();
    const { activeTab, setActiveTab, profile } = props;
    return (
        <section className="profile-content">
            <div className="profile-tabs">
                <button
                    className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
                    onClick={() => setActiveTab('favorites')}
                >
                    ❤️ Favorites
                </button>
                <button
                    className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reviews')}
                >
                    ⭐ My Reviews
                </button>
                <button
                    className={`tab-btn ${activeTab === 'polls' ? 'active' : ''}`}
                    onClick={() => setActiveTab('polls')}
                >
                    🗳️ My Polls
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'favorites' && (
                    <div className="favorites-content">
                        {profile.bookmarkedRestaurants.length > 0 ? (
                            <div className="bookmarks-grid">
                                {profile.bookmarkedRestaurants.map((bookmark) => (
                                    <div
                                        key={bookmark.id}
                                        className="bookmark-card"
                                        onClick={() => {
                                            const encryptedId = btoa(bookmark.restaurantId.toString());
                                            navigate(`/restaurant-search/${encryptedId}`);
                                        }}
                                    >
                                        <div className="bookmark-header">
                                            <span className="bookmark-date">
                                                Saved {new Date(bookmark.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="bookmark-info">
                                            <h4>{bookmark.restaurant.name}</h4>
                                            {bookmark.bookmarkGroup && (
                                                <span
                                                    className="bookmark-group-badge"
                                                    style={{ backgroundColor: bookmark.bookmarkGroup.color || '#f59e0b' }}
                                                >
                                                    {bookmark.bookmarkGroup.name}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-icon">❤️</div>
                                <h3>No Favorites Yet</h3>
                                <p>Save your favorite restaurants for quick access!</p>
                                <button className="btn-primary" onClick={() => navigate('/')}>
                                    Discover Restaurants
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="reviews-content">
                        {profile.reviews.length > 0 ? (
                            <div className="reviews-list">
                                {profile.reviews.map((review) => (
                                    <div
                                        key={review.id}
                                        className="review-card"
                                        onClick={() => {
                                            const encryptedId = btoa(review.restaurantId.toString());
                                            navigate(`/restaurant-search/${encryptedId}`);
                                        }}
                                    >
                                        <div className="review-header">
                                            <h4 className="review-restaurant">
                                                {review.restaurant?.name || `Restaurant #${review.restaurantId}`}
                                            </h4>
                                            <span className={`review-rating rating-${review.rating.toLowerCase()}`}>
                                                {review.rating === 'GOOD' && '👍 Good'}
                                                {review.rating === 'NORMAL' && '👌 Normal'}
                                                {review.rating === 'BAD' && '👎 Bad'}
                                            </span>
                                        </div>
                                        {review.title && (
                                            <h5 className="review-title">{review.title}</h5>
                                        )}
                                        {review.content && (
                                            <p className="review-content">{review.content}</p>
                                        )}
                                        <div className="review-footer">
                                            <span className="review-date">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </span>
                                            <div className="review-stats">
                                                <span>👁️ {review.viewCount}</span>
                                                <span>❤️ {review.likeCount}</span>
                                                {review.isEdited && <span className="edited-badge">Edited</span>}
                                            </div>
                                        </div>
                                        {review.photos?.length > 0 && (
                                            <div className="review-photos">
                                                {review.photos.slice(0, 3).map((photo) => (
                                                    <img
                                                        key={photo.id}
                                                        src={photo.imageUrl}
                                                        alt={photo.caption || 'Review photo'}
                                                        className="review-photo-thumb"
                                                    />
                                                ))}
                                                {review.photos.length > 3 && (
                                                    <span className="more-photos">+{review.photos.length - 3}</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-icon">⭐</div>
                                <h3>No Reviews Yet</h3>
                                <p>Start sharing your dining experiences!</p>
                                <button className="btn-primary" onClick={() => navigate('/')}>
                                    Explore Restaurants
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'polls' && (
                    <div className="polls-content">
                        {profile.polls.length > 0 ? (
                            <div className="polls-grid">
                                {profile.polls.map((poll) => (
                                    <div
                                        key={poll.id}
                                        className="poll-card"
                                        onClick={() => navigate(`/vote/${poll.shareToken}`)}
                                    >
                                        <div className="poll-header">
                                            <h4 className="poll-title">{poll.title}</h4>
                                            <span className={`poll-status ${poll.isActive ? 'active' : 'inactive'}`}>
                                                {poll.isActive ? '🟢 Active' : '⚫ Inactive'}
                                            </span>
                                        </div>
                                        {poll.description && (
                                            <p className="poll-description">{poll.description}</p>
                                        )}
                                        <div className="poll-footer">
                                            <span className="poll-date">
                                                Created {new Date(poll.createdAt).toLocaleDateString()}
                                            </span>
                                            {poll.expiresAt && (
                                                <span className="poll-expires">
                                                    Expires {new Date(poll.expiresAt).toLocaleDateString()}
                                                </span>
                                            )}
                                        </div>
                                        <div className="poll-share">
                                            <span className="share-token">🔗 {poll.shareToken}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-icon">🗳️</div>
                                <h3>No Polls Created</h3>
                                <p>Create a poll to help your group decide where to eat!</p>
                                <button className="btn-primary" onClick={() => navigate('/vote')}>
                                    Create a Poll
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}

export default TabSection