// This page is for dynamic restaurant page which shows promoted restaurant details
// *** promoted & recommended are interchangeable ***
// navigate(`/restaurant/${encodeURIComponent()}`);

import { useParams, useNavigate } from 'react-router-dom';
// import { RESTAURANT_LIST } from '../../constants/restaurantData';
import './RestaurantPage.scss';

const PromotedRestaurantPage = () => {
    const { restaurantId } = useParams<{ restaurantId: string }>();
    console.log("restaurantId>>", restaurantId);
    const navigate = useNavigate();
    const decodedRestaurantId = decodeURIComponent(restaurantId || '');

    // const restaurant = RESTAURANT_LIST.find(r => r.name === restaurantName);
    const { data: recommendedRestaurants, isLoading, isError } = useGetRecommendedRestaurantQuery(Number(decodedRestaurantId)); // Using 1 as a placeholder ID

    const handleAddressClick = (address: string) => {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(googleMapsUrl, '_blank');
    };

    if (!recommendedRestaurants || recommendedRestaurants.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center py-16">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Restaurant not found</h1>
                    <p className="text-gray-600 mb-6">The restaurant you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/promoted-restaurant-search')}
                        className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-full font-medium hover:bg-yellow-500 transition"
                    >
                        Back to Restaurants
                    </button>
                </div>
            </div>
        );
    }

    // todo: fetch real images and descriptions from backend
    // const mainImage = getRestaurantImage1(restaurant.id);

    return (
        <div className="bg-white">

            {/* Footer Note */}
            <div className="bg-gray-100 py-8 mt-16">
                <div className="max-w-4xl mx-auto px-4 text-center text-gray-600 text-sm">
                    * All images and descriptions are for reference only. Actual dishes may vary.
                </div>
            </div>
        </div>
    );
};

export default PromotedRestaurantPage;
