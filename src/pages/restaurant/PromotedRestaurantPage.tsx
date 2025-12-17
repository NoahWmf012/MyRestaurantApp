// This page is for dynamic restaurant page which shows promoted restaurant details

import { useParams } from 'react-router-dom';
import { RESTAURANT_LIST } from '../../constants/restaurantData';
import { getRestaurantImage1, getRestaurantImage2 } from '../../hooks/getImageSrcHook';
import './RestaurantPage.scss';

const PromotedRestaurantPage = () => {
    const { name } = useParams<{ name: string }>();
    const restaurantName = decodeURIComponent(name || '');

    const restaurant = RESTAURANT_LIST.find(r => r.name === restaurantName);

    const handleAddressClick = (address: string) => {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(googleMapsUrl, '_blank');
    };

    if (!restaurant) {
        return (
            <div className="max-w-7xl mx-auto px-4 mt-8 restaurant-page">
                <div className="not-found">
                    <h1>Restaurant not found</h1>
                    <p>The restaurant you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 mt-8 restaurant-page">
            <div className="row">
                <div className="col-md-8">
                    <div className="restaurant-header">
                        <h1>{restaurant.name}</h1>
                    </div>

                    <div className="restaurant-meta">
                        <span className="inline-block bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-sm font-medium cuisine-badge">{restaurant.cuisine}</span>
                        <span className="rating">
                            {'★'.repeat(Math.floor(restaurant.rating))} {restaurant.rating}
                        </span>
                    </div>

                    <div className="restaurant-images">
                        <div className="row">
                            <div className="col-md-6">
                                <img
                                    src={getRestaurantImage1(restaurant.id)}
                                    alt={restaurant.name}
                                    className="restaurant-image"
                                />
                            </div>
                            <div className="col-md-6">
                                <img
                                    src={getRestaurantImage2(restaurant.id)}
                                    alt={restaurant.name}
                                    className="restaurant-image"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="restaurant-section">
                        <h3>About</h3>
                        <p>{restaurant.desc}</p>
                    </div>

                    <div className="restaurant-section contact-info">
                        <h3>Contact Information</h3>
                        <p>
                            <strong>Address:</strong>{' '}
                            <span
                                onClick={() => handleAddressClick(restaurant.location)}
                                className="address-link"
                                title="Click to open in Google Maps"
                            >
                                {restaurant.location}
                            </span>
                        </p>
                        <p>
                            <strong>Phone:</strong>{' '}
                            <span className="phone-number">{restaurant.phoneNum}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromotedRestaurantPage;
