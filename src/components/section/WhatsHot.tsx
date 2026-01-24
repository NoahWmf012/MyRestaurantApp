import FireIcon from "../../assets/icons/whatshot.png"
import { useNavigate } from "react-router-dom";
import type { HomePageRecommendedRestaurantsResponse } from "../../interfaces/queryInterface/restaurantInterface";

//#region card items
export type WhatsHotItemProps = {
    imageSrc: string;
    title: string;
    text: string;
    restaurantId: number;
    restaurantName: string;
    tags?: string[];
}

export function HotRestaurantItems(props: WhatsHotItemProps) {
    const navigate = useNavigate();
    const encodedNumber = btoa(String(props.restaurantId));
    const handleClick = () => {
        navigate(`/restaurant/${encodedNumber}`);
    };
    return (
        <div className="card-hover-animated bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">

            {/* image */}
            <div className="relative">
                <img
                    src={props.imageSrc}
                    alt={`${props.title} at ${props.restaurantName}`}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={handleClick}
                />
                <div className="absolute top-2 right-2">
                    <img src={FireIcon} alt="Hot Icon" className="title-icon mx-1" />
                </div>
            </div>

            {/* captions */}
            <div className="p-4">
                <h5 className="font-bold text-lg">
                    {props.title}
                </h5>
                {props.tags && props.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap">
                        {props.tags.map((tag, index) => (
                            <span key={index} className="hot-restaurant-tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

//#endregion
type WhatsHotProps = {
    list: HomePageRecommendedRestaurantsResponse[];
}

function WhatsHot({ list }: WhatsHotProps) {
    const navigate = useNavigate();

    const handleMoreClick = () => {
        navigate('/promoted-restaurant-search');
    }

    return (
        <div className="whats-hot-wrapper">
            <div className="flex w-full mb-4">
                <div className="section-title flex items-center cursor-pointer hover:scale-105 transition-transform duration-200" onClick={handleMoreClick}>
                    <img src={FireIcon} alt="Hot Icon" className="title-icon mr-2" />
                    What's Hot
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                {list.map((restaurant) => (
                    <HotRestaurantItems
                        key={restaurant.restaurantId}
                        imageSrc={restaurant.photoUrls?.[0] ?? ""}
                        title={restaurant.restaurantName ?? ""}
                        text={restaurant.description?.[0] ?? ""}
                        restaurantId={restaurant.restaurantId}
                        restaurantName={restaurant.restaurantName ?? ""}
                        tags={restaurant.restaurantCuisine}
                    />
                ))}
            </div>

        </div>
    )
}

export default WhatsHot
