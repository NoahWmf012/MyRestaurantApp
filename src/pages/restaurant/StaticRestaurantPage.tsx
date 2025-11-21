// This page is for general search restaurant page that is mostly static content

import { useParams } from "react-router-dom";
import { useGetRestaurantsQuery } from "../../redux/services/api/restaurantAPI";

function StaticRestaurantPage() {
    // decrypt restaurant id from url
    const { restaurantId } = useParams<{ restaurantId: string }>();
    const decryptedId = restaurantId ? atob(restaurantId) : null;

    const { data: response, isLoading, isError } = useGetRestaurantsQuery(
        { searchCriteria: [{ key: 'id', value: Number(decryptedId) }] },
        { skip: !decryptedId }
    );

    const handleAddressClick = (address: string) => {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(googleMapsUrl, '_blank');
    };

    if (isLoading) {
        return (
            <div className="container mt-4 restaurant-page">
                <div className="loading-state">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Loading restaurant details...</p>
                </div>
            </div>
        );
    }

    if (isError || !response || !response.restaurantList || response.restaurantList.length === 0) {
        return (
            <div className="container mt-4 restaurant-page">
                <div className="not-found">
                    <h1>Restaurant not found</h1>
                    <p>The restaurant you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    const restaurant = response.restaurantList[0];
    const address = restaurant.address || restaurant.location || '';
    const phoneNum = restaurant.phone || '';
    const description = restaurant.description || 'No description available.';
    const cuisine = Array.isArray(restaurant.cuisine) ? restaurant.cuisine.join(', ') : (restaurant.cuisine || 'Restaurant');

    return (
        <div className="container mt-4 restaurant-page">
            <div className="row">
                <div className="col-md-8">
                    <div className="restaurant-header">
                        <h1>{restaurant.name}</h1>
                    </div>

                    <div className="restaurant-meta">
                        <span className="badge bg-primary cuisine-badge">{cuisine}</span>
                        {restaurant.rating && (
                            <span className="rating">
                                {'★'.repeat(Math.floor(restaurant.rating))} {restaurant.rating}
                            </span>
                        )}
                    </div>

                    {restaurant.photos && restaurant.photos.length > 0 && (
                        <div className="restaurant-images">
                            <div className="row">
                                {restaurant.photos.slice(0, 2).map((photo: string, index: number) => (
                                    <div key={index} className="col-md-6">
                                        <img
                                            src={photo}
                                            alt={`${restaurant.name} ${index + 1}`}
                                            className="restaurant-image"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="restaurant-section">
                        <h3>About</h3>
                        <p>{description}</p>
                    </div>

                    <div className="restaurant-section contact-info">
                        <h3>Contact Information</h3>
                        {address && (
                            <p>
                                <strong>Address:</strong>{' '}
                                <span
                                    onClick={() => handleAddressClick(address)}
                                    className="address-link"
                                    title="Click to open in Google Maps"
                                >
                                    {address}
                                </span>
                            </p>
                        )}
                        {phoneNum && (
                            <p>
                                <strong>Phone:</strong>{' '}
                                <span className="phone-number">{phoneNum}</span>
                            </p>
                        )}
                        {restaurant.email && (
                            <p>
                                <strong>Email:</strong>{' '}
                                <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a>
                            </p>
                        )}
                        {restaurant.website && (
                            <p>
                                <strong>Website:</strong>{' '}
                                <a href={restaurant.website} target="_blank" rel="noopener noreferrer">
                                    {restaurant.website}
                                </a>
                            </p>
                        )}
                        {restaurant.openingHours && (
                            <p>
                                <strong>Hours:</strong> {restaurant.openingHours}
                            </p>
                        )}
                    </div>

                    {restaurant.tags && restaurant.tags.length > 0 && (
                        <div className="restaurant-section">
                            <h3>Tags</h3>
                            <div className="tags-container">
                                {restaurant.tags.map((tag: string, index: number) => (
                                    <span key={index} className="badge bg-secondary me-2 mb-2">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="restaurant-section">
                        <h3>Price Range</h3>
                        <p>
                            <strong>${restaurant.minPrice}</strong> - <strong>${restaurant.maxPrice}</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StaticRestaurantPage