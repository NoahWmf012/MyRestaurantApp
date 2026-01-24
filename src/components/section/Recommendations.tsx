import Carousel from "react-multi-carousel";
import OrderIcon from "../../assets/icons/order.png"
import { RESPONSIVE_SETTINGS } from "../../constants/responsiveSetting";
import { useNavigate } from "react-router-dom";
import type { HomePageRecommendedRestaurantsResponse } from "../../interfaces/queryInterface/restaurantInterface";

//#region horizontal card item
type OrderAgainItemProps = {
    imageSrc: string;
    title: string;
    desc: string;
    restaurantId: number;
}

function RecommendItem(props: OrderAgainItemProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        const encodedNumber = btoa(String(props.restaurantId));
        navigate(`/restaurant/${encodedNumber}`);
    };
    return (
        <div
            className="horizontal-card recommend-item border-none shadow-sm my-4 mx-2 rounded"
            role="button"
            onClick={handleClick}
        >
            <img src={props.imageSrc} className="" alt="Card image cap" />
            <div className="card-desc"><p>{props.desc}</p></div>
        </div>
    )
}
//#endregion

type RecommendationsProps = {
    list: HomePageRecommendedRestaurantsResponse[];
}
function Recommendations({ list }: RecommendationsProps) {
    const navigate = useNavigate();

    const handleMoreClick = () => {
        navigate('/promoted-restaurant-search');
    }
    return (
        <div className="recommend-wrapper">
            <div className="flex w-full mb-4">
                <div className="section-title flex items-center cursor-pointer hover:scale-105 transition-transform duration-200" onClick={handleMoreClick}>
                    <img src={OrderIcon} alt="Order Icon" className="title-icon mx-2" />
                    Recommendation
                </div>
            </div>

            <div className="flex flex-row items-center">
                {/* History of Orders / Search */}
                <div className="carousel-container">
                    <Carousel
                        responsive={RESPONSIVE_SETTINGS}
                        draggable={false}
                    >
                        {list.map((restaurant) => (
                            <RecommendItem
                                key={restaurant.restaurantId}
                                imageSrc={restaurant.photoUrls?.[0] ?? ""}
                                title={restaurant.restaurantName ?? ""}
                                desc={restaurant.description?.[0] ?? restaurant.restaurantName ?? ""}
                                restaurantId={restaurant.restaurantId}
                            />
                        ))}
                    </Carousel>
                </div>
            </div>

        </div>
    )
}

export default Recommendations