// This page is for general search restaurant page that is mostly static content

import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { useGetRestaurantByIdQuery } from "../../redux/services/api/restaurantAPI";
import { useMsgModal } from "../../hooks/useMsgModal";
import "./RestaurantPage.scss"
import ReviewItem from "./ReviewItem";
import WriteReviewModal from "./WriteReviewModal";

function StaticRestaurantPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'overview' | 'photos' | 'reviews'>('overview');
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
    const { showInfo, showSuccess } = useMsgModal();

    const { restaurantId } = useParams<{ restaurantId: string }>();
    const decryptedValue = restaurantId ? atob(restaurantId) : null;

    const isNumeric = decryptedValue && !isNaN(Number(decryptedValue));

    const { data: restaurant, isLoading, isError } = useGetRestaurantByIdQuery(isNumeric && decryptedValue ? Number(decryptedValue) : -1);

    // Memoized values
    const restaurantData = useMemo(() => {
        if (!restaurant) return null;

        return {
            address: restaurant.address || restaurant.location || '',
            phoneNum: restaurant.phone || '',
            description: restaurant.description || 'No description available.',
            cuisine: Array.isArray(restaurant.cuisine)
                ? restaurant.cuisine.join(', ')
                : (restaurant.cuisine || 'Restaurant'),
            photos: restaurant.photos || [],
            reviews: restaurant.reviews || [],
            reviewCount: restaurant.reviews?.length || 0
        };
    }, [restaurant]);

    const displayPhotos = useMemo(() => {
        if (!restaurantData) return [];
        return showAllPhotos ? restaurantData.photos : restaurantData.photos.slice(0, 5);
    }, [restaurantData, showAllPhotos]);

    const handleAddressClick = (address: string) => {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(googleMapsUrl, '_blank');
    };

    const handleBooking = () => {
        // Placeholder for booking functionality
        showInfo('Booking functionality coming soon!');
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: restaurant?.name || '',
                text: `Check out ${restaurant?.name}!`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            showSuccess('Link copied to clipboard!');
        }
    };

    const handleBookmarked = () => {
        // Placeholder for bookmark functionality
        showInfo('Bookmark functionality coming soon!');
    }

    const handleWriteReview = () => {
        setIsWriteReviewOpen(true);
    };

    if (isLoading) {
        return (
            <div className="restaurant-page-modern">
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading restaurant details...</p>
                </div>
            </div>
        );
    }

    if (isError || !restaurant || !restaurantData) {
        return (
            <div className="restaurant-page-modern">
                <div className="not-found">
                    <h1>Restaurant not found</h1>
                    <p>The restaurant you're looking for doesn't exist.</p>
                    <button onClick={() => navigate('/search')} className="btn-primary">
                        Back to Search
                    </button>
                </div>
            </div>
        );
    }

    const { address, phoneNum, description, cuisine, photos, reviews, reviewCount } = restaurantData;

    return (
        <div className="restaurant-page-modern">
            {/* Hero Section */}
            <div className="restaurant-hero">
                <div className="hero-content">
                    <div className="breadcrumb">
                        <span onClick={() => navigate('/')}>Home</span>
                        <span className="separator">›</span>
                        <span onClick={() => navigate('/search')}>Restaurants</span>
                        <span className="separator">›</span>
                        <span className="current">{restaurant.name}</span>
                    </div>

                    <h1 className="restaurant-title">{restaurant.name}</h1>

                    <div className="restaurant-meta-badges">
                        <span className="cuisine-badge">{cuisine}</span>
                        {restaurant.minPrice && restaurant.maxPrice && (
                            <span className="price-badge">${restaurant.minPrice}-${restaurant.maxPrice}</span>
                        )}
                        {restaurant.googleRating && (
                            <span className="rating-badge">
                                <span className="stars">{'★'.repeat(Math.floor(restaurant.googleRating))}</span>
                                <span className="rating-number">{restaurant.googleRating}</span>
                            </span>
                        )}
                        {/* Rating counts */}
                        {(restaurant.ratingGood > 0 || restaurant.ratingNormal > 0 || restaurant.ratingBad > 0) && (
                            <div className="rating-counts">
                                {restaurant.ratingGood > 0 && (
                                    <span className="count-badge count-good">
                                        <span className="count-icon">👍</span>
                                        <span className="count-number">{restaurant.ratingGood}</span>
                                    </span>
                                )}
                                {restaurant.ratingNormal > 0 && (
                                    <span className="count-badge count-normal">
                                        <span className="count-icon">👌</span>
                                        <span className="count-number">{restaurant.ratingNormal}</span>
                                    </span>
                                )}
                                {restaurant.ratingBad > 0 && (
                                    <span className="count-badge count-bad">
                                        <span className="count-icon">👎</span>
                                        <span className="count-number">{restaurant.ratingBad}</span>
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* todo */}
                    {/* <div className="action-buttons">
                        <button className="btn-book" onClick={handleBooking}>
                            <span className="icon">📅</span>
                            Book Now
                        </button>
                        <button className="btn-share" onClick={handleShare}>
                            <span className="icon">🔗</span>
                            Share
                        </button>
                        <button className="btn-bookmark" onClick={handleBookmarked}>
                            <span className="icon">♡</span>
                        </button>
                    </div> */}
                </div>
            </div>

            {/* Photo Gallery */}
            {photos.length > 0 && (
                <div className="photo-gallery">
                    <div className="gallery-grid">
                        {displayPhotos.map((photo: string, index: number) => (
                            <div
                                key={index}
                                className={`gallery-item ${index === 0 ? 'main-photo' : ''}`}
                            >
                                <img
                                    src={photo}
                                    alt={`${restaurant.name} ${index + 1}`}
                                />
                                {index === 4 && photos.length > 5 && !showAllPhotos && (
                                    <div className="view-all-overlay" onClick={() => setShowAllPhotos(true)}>
                                        <span>+{photos.length - 5} more</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="restaurant-content">
                {/* Info Card */}
                <div className="info-sidebar">
                    <div className="info-card">
                        <h3>Restaurant Info</h3>

                        {address && (
                            <div className="info-item">
                                <div className="info-icon">📍</div>
                                <div className="info-details">
                                    <div className="info-label">Address</div>
                                    <div
                                        className="info-value clickable"
                                        onClick={() => handleAddressClick(address)}
                                    >
                                        {address}
                                    </div>
                                </div>
                            </div>
                        )}

                        {phoneNum && (
                            <div className="info-item">
                                <div className="info-icon">📞</div>
                                <div className="info-details">
                                    <div className="info-label">Phone</div>
                                    <div className="info-value">
                                        <a href={`tel:${phoneNum}`}>{phoneNum}</a>
                                    </div>
                                </div>
                            </div>
                        )}

                        {restaurant.openingHours && (
                            <div className="info-item">
                                <div className="info-icon">🕐</div>
                                <div className="info-details">
                                    <div className="info-label">Opening Hours</div>
                                    <div className="info-value">{restaurant.openingHours}</div>
                                </div>
                            </div>
                        )}

                        {restaurant.website && (
                            <div className="info-item">
                                <div className="info-icon">🌐</div>
                                <div className="info-details">
                                    <div className="info-label">Website</div>
                                    <div className="info-value">
                                        <a href={restaurant.website} target="_blank" rel="noopener noreferrer">
                                            Visit Website
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}

                        {restaurant.email && (
                            <div className="info-item">
                                <div className="info-icon">✉️</div>
                                <div className="info-details">
                                    <div className="info-label">Email</div>
                                    <div className="info-value">
                                        <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Tags */}
                    {restaurant.tags && restaurant.tags.length > 0 && (
                        <div className="tags-card">
                            <h4>Popular Tags</h4>
                            <div className="tags-list">
                                {restaurant.tags.map((tag: string, index: number) => (
                                    <span key={index} className="tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Content Area */}
                <div className="main-content">
                    {/* Tabs */}
                    <div className="content-tabs">
                        <button
                            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            Overview
                        </button>
                        {/* todo */}
                        {/* <button
                            className={`tab ${activeTab === 'photos' ? 'active' : ''}`}
                            onClick={() => setActiveTab('photos')}
                        >
                            Photos ({photos.length})
                        </button> */}
                        <button
                            className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Reviews
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="tab-content">
                        {activeTab === 'overview' && (
                            <div className="overview-content">
                                <section className="about-section">
                                    <h2>{restaurant.name}</h2>
                                    <p className="description">{description}</p>
                                </section>
                            </div>
                        )}

                        {activeTab === 'photos' && (
                            <div className="photos-content">
                                <div className="photos-grid">
                                    {photos.map((photo: string, index: number) => (
                                        <div key={index} className="photo-item">
                                            <img src={photo} alt={`${restaurant.name} ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                                {photos.length === 0 && (
                                    <p className="no-content">No photos available yet.</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="reviews-content">
                                <div className="reviews-summary">
                                    <div className="rating-overview">
                                        <div className="rating-score">
                                            {restaurant.googleRating || 'N/A'}
                                        </div>
                                        <div className="rating-stars">
                                            {'★'.repeat(Math.floor(restaurant.googleRating || 0))}
                                        </div>
                                        <p className="rating-text">
                                            Based on {reviewCount} customer review{reviewCount !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                    <button className="btn-write-review" onClick={handleWriteReview}>
                                        <span className="icon">✍️</span>
                                        Write a Review
                                    </button>
                                </div>

                                {reviews.length > 0 ? (
                                    <div className="reviews-list">
                                        {reviews.map((review) => (
                                            <ReviewItem key={review.id} review={review} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="no-reviews-state">
                                        <div className="no-reviews-icon">📝</div>
                                        <p className="no-content">No reviews yet. Be the first to review!</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <WriteReviewModal
                isOpen={isWriteReviewOpen}
                onClose={() => setIsWriteReviewOpen(false)}
                restaurantId={restaurant.id}
            />
        </div>
    );
}

export default StaticRestaurantPage