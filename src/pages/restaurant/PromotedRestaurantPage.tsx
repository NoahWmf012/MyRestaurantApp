// This page is for dynamic restaurant page which shows promoted restaurant details
// navigate(`/restaurant/${encodeURIComponent()}`);

import { useParams, useNavigate } from 'react-router-dom';
import { RESTAURANT_LIST } from '../../constants/restaurantData';
import { getRestaurantImage1 } from '../../hooks/getImageSrcHook';
import './RestaurantPage.scss';

const PromotedRestaurantPage = () => {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();
    const restaurantName = decodeURIComponent(name || '');

    const restaurant = RESTAURANT_LIST.find(r => r.name === restaurantName);

    const handleAddressClick = (address: string) => {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(googleMapsUrl, '_blank');
    };

    if (!restaurant) {
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
    const mainImage = getRestaurantImage1(restaurant.id);

    return (
        <div className="bg-white">
            {/* Hero Image */}
            <div className="w-full h-[500px] relative overflow-hidden">
                <img
                    src={mainImage}
                    alt={restaurant.name}
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
                    <h1 className="text-5xl font-bold mb-3 text-outline">{restaurant.name}</h1>
                    <div className="flex items-center gap-4">
                        <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
                            {restaurant.cuisine}
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="text-yellow-400 text-xl">
                                {'★'.repeat(Math.floor(restaurant.rating))}
                            </span>
                            <span className="font-semibold text-lg">{restaurant.rating}</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Introduction */}
                <div className="mb-16">
                    <p className="text-gray-800 text-lg leading-relaxed mb-6">
                        Experience authentic {restaurant.cuisine} cuisine at its finest. {restaurant.name} brings
                        the rich culinary traditions and vibrant flavors that have made {restaurant.cuisine} food
                        celebrated worldwide. From the moment you step through our doors, you'll be transported
                        to a world of exceptional taste and warm hospitality.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Our chefs stay true to traditional cooking methods while using only the finest premium ingredients.
                        Each dish is carefully crafted to deliver an unforgettable dining experience that honors
                        the authentic flavors and techniques passed down through generations.
                    </p>
                </div>

                {/* Featured Dishes Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Signature Dishes</h2>
                    <p className="text-gray-700 text-lg leading-relaxed mb-8">
                        Every dish at {restaurant.name} tells a story. Our menu features beloved classics and
                        chef specialties, each prepared with meticulous attention to detail and presented with pride.
                    </p>

                    {/* Dish 1 */}
                    <div className="mb-12">
                        <img
                            src={mainImage}
                            alt="Signature dish"
                            className="w-full h-96 object-cover rounded-lg shadow-lg mb-6"
                        />
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            {restaurant.cuisine === "Japanese" ? "Premium Sashimi & Sushi Selection" : "Chef's Special Platter"}
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-lg mb-4">
                            Our most celebrated dish showcases the pinnacle of {restaurant.cuisine} culinary artistry.
                            Using only the freshest seasonal ingredients, each element is carefully selected and prepared
                            to highlight natural flavors and textures. The presentation alone is a feast for the eyes,
                            while the taste delivers layers of complexity that will delight even the most discerning palate.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Guests consistently praise the perfect balance of flavors and the exceptional quality
                            that makes this dish truly unforgettable. Whether you're a long-time enthusiast or
                            experiencing {restaurant.cuisine} cuisine for the first time, this signature creation
                            is an absolute must-try.
                        </p>
                    </div>

                    {/* Dish 2 */}
                    <div className="mb-12">
                        <img
                            src={mainImage}
                            alt="Specialty cuisine"
                            className="w-full h-96 object-cover rounded-lg shadow-lg mb-6"
                        />
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            {restaurant.cuisine === "Japanese" ? "Grilled Specialties" : "Traditional Main Course"}
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-lg mb-4">
                            Prepared using time-honored techniques passed down through generations, this dish
                            represents the heart and soul of authentic {restaurant.cuisine} cooking. Every ingredient
                            is carefully sourced and meticulously prepared to ensure the perfect combination of
                            taste, aroma, and texture.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            The rich, complex flavors develop through patient preparation and expert craftsmanship.
                            Served at the ideal temperature and paired with complementary accompaniments, this dish
                            offers a complete sensory experience that captures the essence of traditional {restaurant.cuisine} cuisine.
                        </p>
                    </div>

                    {/* Dish 3 */}
                    <div className="mb-12">
                        <img
                            src={mainImage}
                            alt="Dessert specialty"
                            className="w-full h-96 object-cover rounded-lg shadow-lg mb-6"
                        />
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Signature Desserts</h3>
                        <p className="text-gray-700 leading-relaxed text-lg mb-4">
                            No meal is complete without the perfect ending. Our dessert selection features
                            traditional sweets reimagined with a contemporary touch. Each creation balances
                            sweetness with subtle flavors that cleanse the palate and leave you with lasting
                            memories of your dining experience.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            From delicate textures to harmonious flavor combinations, our desserts are crafted
                            with the same dedication to quality and authenticity as every other course. They
                            provide the perfect conclusion to an exceptional meal.
                        </p>
                    </div>
                </div>

                {/* Location & Contact */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Visit Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border-l-4 border-yellow-400 pl-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">📍 Location</h3>
                            <p
                                onClick={() => handleAddressClick(restaurant.location)}
                                className="text-gray-700 hover:text-yellow-600 cursor-pointer underline text-lg"
                            >
                                {restaurant.location}
                            </p>
                        </div>
                        <div className="border-l-4 border-yellow-400 pl-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">📞 Reservations</h3>
                            <a
                                href={`tel:${restaurant.phoneNum}`}
                                className="text-gray-700 hover:text-yellow-600 text-lg"
                            >
                                {restaurant.phoneNum}
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
