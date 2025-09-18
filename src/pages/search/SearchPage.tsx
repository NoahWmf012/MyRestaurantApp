import { useNavigate, useSearchParams } from "react-router-dom";
import { RESTAURANT_LIST } from "../../constants/restaurantData";
import { getRestaurantImage1 } from "../../hooks/getImageSrcHook";

function SearchPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get('query') || '';

    // Filter restaurants based on search query
    const filteredRestaurants = RESTAURANT_LIST.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );

    const handleRestaurantClick = (restaurantName: string) => {
        navigate(`/restaurant/${encodeURIComponent(restaurantName)}`);
    };

    return (
        <div className="container mt-4 restaurant-list-page">
            {filteredRestaurants.length === 0 ? (
                <div className="no-results">
                    <h3>No restaurants found</h3>
                    <p>Try searching with different keywords like cuisine type or location.</p>
                </div>
            ) : (
                <div className="restaurant-grid">
                    {filteredRestaurants.map((restaurant) => (
                        <div
                            key={restaurant.id}
                            className="restaurant-card"
                            onClick={() => handleRestaurantClick(restaurant.name)}
                        >
                            <div className="restaurant-image-wrapper">
                                <img
                                    src={getRestaurantImage1(restaurant.id)}
                                    alt={restaurant.name}
                                    className="restaurant-image"
                                />
                            </div>
                            <div className="restaurant-info">
                                <h3 className="restaurant-name">{restaurant.name}</h3>
                                <div className="restaurant-meta">
                                    <span className="cuisine-badge">{restaurant.cuisine}</span>
                                    <span className="rating">
                                        {'★'.repeat(Math.floor(restaurant.rating))} {restaurant.rating}
                                    </span>
                                </div>
                                <p className="restaurant-location">{restaurant.location}</p>
                                <p className="restaurant-description">{restaurant.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchPage