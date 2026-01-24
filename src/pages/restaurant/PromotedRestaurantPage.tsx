// This page is for dynamic restaurant page which shows promoted restaurant details
// *** promoted & recommended are interchangeable ***
// navigate(`/restaurant/${encodeURIComponent()}`);

import { useParams, useNavigate } from 'react-router-dom';
import { useGetRecommendedRestaurantQuery } from '../../redux/services/api/restaurantAPI';
import './RestaurantPage.scss';

const PromotedRestaurantPage = () => {
    const { restaurantId } = useParams<{ restaurantId: string }>();
    const navigate = useNavigate();
    const decodedRestaurantId = atob(restaurantId || '');

    const { data: promotedRestaurant, isLoading, isError } = useGetRecommendedRestaurantQuery(Number(decodedRestaurantId));

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center py-16">
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (isError || !promotedRestaurant) {
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

    const restaurant = promotedRestaurant.restaurant;
    const mainImage = promotedRestaurant.photoUrls?.[0] || '/placeholder-restaurant.jpg';

    const handleAddressClick = (address: string) => {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(googleMapsUrl, '_blank');
    };

    return (
        <div className="bg-white">
            {/* Hero Image */}
            <div className="w-full h-[500px] relative overflow-hidden">
                <img
                    src={mainImage}
                    alt={restaurant?.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white max-w-7xl mx-auto">
                    <div className="mb-4 flex items-center gap-2 text-sm">
                        <span onClick={() => navigate('/')} className="cursor-pointer hover:underline">Home</span>
                        <span>›</span>
                        <span onClick={() => navigate('/promoted-restaurant-search')} className="cursor-pointer hover:underline">
                            Featured
                        </span>
                    </div>
                    <h1 className="text-5xl font-bold mb-3 text-outline">{restaurant?.name || 'Featured Restaurant'}</h1>
                    <div className="flex items-center gap-4">
                        <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
                            {restaurant?.cuisine?.[0] || 'International'}
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="text-yellow-400 text-xl">
                                {'★'.repeat(Math.floor(restaurant?.googleRating || 0))}
                            </span>
                            <span className="font-semibold text-lg">{restaurant?.googleRating?.toFixed(1) || 'N/A'}</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Featured Dishes Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Signature Dishes</h2>

                    {promotedRestaurant.photoUrls?.length > 0 && promotedRestaurant.photoUrls?.map((photoUrl, index) => (
                        <div key={index} className="mb-12">
                            <img
                                src={photoUrl}
                                alt={`Signature dish ${index + 1}`}
                                className="w-full h-96 object-cover rounded-lg shadow-lg mb-6"
                            />
                            <p className="text-gray-700 leading-relaxed text-lg mb-4">
                                {promotedRestaurant.description?.[index + 1]}
                            </p>
                        </div>
                    ))}

                </div>

                {/* Location & Contact */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Visit Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border-l-4 border-yellow-400 pl-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">📍 Location</h3>
                            <p
                                onClick={() => handleAddressClick(restaurant?.address || '')}
                                className="text-gray-700 hover:text-yellow-600 cursor-pointer underline text-lg"
                            >
                                {restaurant?.address || 'Address not available'}
                            </p>
                        </div>
                        <div className="border-l-4 border-yellow-400 pl-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">📞 Reservations</h3>
                            <a
                                href={`tel:${restaurant?.phone}`}
                                className="text-gray-700 hover:text-yellow-600 text-lg"
                            >
                                {restaurant?.phone || 'Contact us'}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

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
