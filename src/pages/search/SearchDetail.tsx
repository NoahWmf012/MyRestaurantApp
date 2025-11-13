import { useNavigate } from 'react-router-dom';
import { getRestaurantImage1 } from '../../hooks/getImageSrcHook';
import type { RestaurantItem } from '../../interfaces/queryInterface/restaurantInterface';

type SearchDetailProps = {
    list: RestaurantItem[]
}
function SearchDetail({ list }: SearchDetailProps) {
    const navigate = useNavigate();

    const handleRestaurantClick = (restaurantName: string) => {
        navigate(`/restaurant/${encodeURIComponent(restaurantName)}`);
    };
    return (
        <div id='search-detail'>
            {list.length === 0 ? (
                <div className="no-results">
                    <h3>No restaurants found</h3>
                    <p>Try searching with different keywords like cuisine type or location.</p>
                </div>
            ) : (
                <div className="restaurant-grid">
                    {list.map((restaurant) => (
                        <div
                            key={restaurant.id}
                            className="restaurant-card"
                            onClick={() => handleRestaurantClick(restaurant.name)}
                        >
                            <div className="restaurant-image-wrapper">
                                <img
                                    // src={getRestaurantImage1(restaurant.id)}
                                    src={restaurant.photos[0] || getRestaurantImage1(restaurant.id)}
                                    alt={restaurant.name}
                                    className="restaurant-image"
                                />
                            </div>
                            <div className="restaurant-info">
                                <h3 className="restaurant-name">{restaurant.name}</h3>
                                <div className="restaurant-meta">
                                    <span className="cuisine-badge">{restaurant.cuisine}</span>
                                    <span className="rating">
                                        {'★'.repeat(Math.floor(restaurant.rating ?? 0))} {restaurant.rating} {restaurant.reviews && `(${restaurant.reviews})`}
                                    </span>
                                </div>
                                <p className="restaurant-description">{restaurant.description}</p>
                                {/* <p className="restaurant-location">{restaurant.location}</p> */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchDetail