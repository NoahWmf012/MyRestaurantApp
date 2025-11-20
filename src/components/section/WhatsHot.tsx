import { RESTAURANT_LIST } from "../../constants/restaurantData"
import { getRestaurantImage1 } from "../../hooks/getImageSrcHook";
// import Carousel from "react-multi-carousel";
import FireIcon from "../../assets/icons/whatshot.png"
// import { RESPONSIVE_SETTINGS } from "../../constants/responsiveSetting";
import { useNavigate } from "react-router-dom";

//#region card items
type WhatsHotItemProps = {
    imageSrc: string;
    title: string;
    text: string;
    restaurantName: string;
}

// function WhatsHotItem(props: WhatsHotItemProps) {
//     const navigate = useNavigate();

//     const handleClick = () => {
//         navigate(`/restaurant/${encodeURIComponent(props.restaurantName)}`);
//     };

//     return (
//         <div
//             className="card whats-hot-item border-0 mb-2 mx-1 bg-white rounded"
//             role="button"
//             onClick={handleClick}
//             tabIndex={0}
//             onKeyDown={(e) => {
//                 if (e.key === 'Enter' || e.key === ' ') {
//                     handleClick();
//                 }
//             }}
//         >
//             <div className="card-img-container">
//                 <img className="card-img-top" src={props.imageSrc} alt={`${props.title} at ${props.restaurantName}`} />
//             </div>
//             <div className="card-body">
//                 <h5 className="card-title">{props.title}</h5>
//                 <p className="card-text">{props.text}</p>
//             </div>
//         </div>
//     )
// }

function HotRestaurantItems(props: WhatsHotItemProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/restaurant/${encodeURIComponent(props.restaurantName)}`);
    };
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">

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
                <h3 className="font-bold text-lg">
                    {props.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{props.text}</p>
            </div>
        </div>
    );
}

//#endregion

function WhatsHot() {
    return (
        <div className="whats-hot-wrapper">
            <div className="section-title d-flex align-items-center">
                <img src={FireIcon} alt="Hot Icon" className="title-icon mx-1" />
                What's Hot
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {RESTAURANT_LIST.map((restaurant) => (
                    <HotRestaurantItems
                        key={restaurant.id}
                        imageSrc={getRestaurantImage1(restaurant.id)}
                        title={restaurant.name}
                        text={restaurant.name}
                        restaurantName={restaurant.name}
                    />
                ))}
            </div>

        </div>
    )
}

export default WhatsHot
