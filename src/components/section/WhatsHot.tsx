import { RESTAURANT_LIST } from "../../constants/restaurantData"
import { getRestaurantImage1 } from "../../hooks/getImageSrcHook";
import FireIcon from "../../assets/icons/whatshot.png"
import { useNavigate } from "react-router-dom";

//#region card items
export type WhatsHotItemProps = {
    imageSrc: string;
    title: string;
    text: string;
    restaurantId: number;
    restaurantName: string;
}

export function HotRestaurantItems(props: WhatsHotItemProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/restaurant/${encodeURIComponent(props.restaurantId)}`);
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
                {/* <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 text-xs font-bold rounded">
                    Promotion</div> */}
                <div className="absolute top-2 right-2">
                    <img src={FireIcon} alt="Hot Icon" className="title-icon mx-1" />
                </div>
            </div>

            {/* captions */}
            <div className="p-4">
                <h5 className="font-bold text-lg">
                    {props.title}
                </h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">{props.text}</p>
            </div>
        </div>
    );
}

//#endregion

function WhatsHot() {
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

        </div>
    )
}

export default WhatsHot
