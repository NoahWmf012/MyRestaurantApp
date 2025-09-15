import { useParams } from 'react-router-dom';
import { RESTAURANT_LIST } from '../../constants/restaurantData';
import { getRestaurantImage1, getRestaurantImage2 } from '../../hooks/getImageSrcHook';

const RestaurantPage = () => {
    const { id } = useParams<{ id: string }>();
    const restaurantId = parseInt(id || '0');

    const restaurant = RESTAURANT_LIST.find(r => r.id === restaurantId);

    if (!restaurant) {
        return (
            <div className="container mt-4">
                <h1>Restaurant not found</h1>
                <p>The restaurant you're looking for doesn't exist.</p>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-8">
                    <h1>{restaurant.name}</h1>
                    <div className="mb-3">
                        <span className="badge bg-primary me-2">{restaurant.cuisine}</span>
                        <span className="text-warning">
                            {'★'.repeat(Math.floor(restaurant.rating))} {restaurant.rating}
                        </span>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-6">
                            <img
                                src={getRestaurantImage1(restaurant.id)}
                                alt={restaurant.name}
                                className="img-fluid rounded"
                            />
                        </div>
                        <div className="col-md-6">
                            <img
                                src={getRestaurantImage2(restaurant.id)}
                                alt={restaurant.name}
                                className="img-fluid rounded"
                            />
                        </div>
                    </div>

                    <h3>About</h3>
                    <p>{restaurant.desc}</p>

                    <h3>Contact Information</h3>
                    <p><strong>Address:</strong> {restaurant.location}</p>
                    <p><strong>Phone:</strong> {restaurant.phoneNum}</p>
                </div>
            </div>
        </div>
    );
};

export default RestaurantPage;
