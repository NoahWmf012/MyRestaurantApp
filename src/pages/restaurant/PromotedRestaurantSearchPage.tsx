// '/promoted-restaurant-search'

import { RESTAURANT_LIST } from "../../constants/restaurantData";
import { getRestaurantImage1 } from "../../hooks/getImageSrcHook";
import FireIcon from "../../assets/icons/whatshot.png";
import { HotRestaurantItems } from "../../components/section/WhatsHot";

function PromotedRestaurantSearchPage() {

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3">
                    <img src={FireIcon} alt="Hot Icon" className="w-8 h-8" />
                    <h1 className="text-3xl font-bold">Selected Recommendations</h1>
                </div>
                <p className="text-gray-600 mt-2">
                    GetherEat discovers the best promoted restaurants for you! We select top-rated eateries
                    Explore top deals and popular spots handpicked just for you.
                </p>
            </div>

            {/* Results Count */}
            <div className="mb-6">
                <p className="text-gray-700">
                    <span className="font-semibold">{RESTAURANT_LIST.length}</span> promoted restaurants
                </p>
            </div>

            {/* Restaurant Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {RESTAURANT_LIST.map((restaurant) => (
                    <HotRestaurantItems
                        key={restaurant.id}
                        imageSrc={getRestaurantImage1(restaurant.id)}
                        title={restaurant.name}
                        text={restaurant.name}
                        restaurantId={restaurant.id}
                        restaurantName={restaurant.name}
                    />
                ))}
            </div>

            {/* Empty State (if no restaurants) */}
            {RESTAURANT_LIST.length === 0 && (
                <div className="text-center py-16">
                    <img src={FireIcon} alt="No Results" className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Promoted Restaurants</h3>
                    <p className="text-gray-500">Check back later for hot deals and promotions!</p>
                </div>
            )}
        </div>
    );
}

export default PromotedRestaurantSearchPage;