import Carousel from "react-multi-carousel";
import OrderIcon from "../../assets/icons/order.png"
import { RESPONSIVE_SETTINGS } from "../../constants/responsiveSetting";
import { RESTAURANT_LIST } from "../../constants/restaurantData";
import { getRestaurantImage2 } from "../../hooks/getImageSrcHook";
import { useNavigate } from "react-router-dom";

//#region horizontal card item
type OrderAgainItemProps = {
    imageSrc: string;
    title: string;
    desc: string;
    restaurantName: string;
}

function OrderAgainItem(props: OrderAgainItemProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/restaurant/${encodeURIComponent(props.restaurantName)}`);
    };
    return (
        <div
            className="horizontal-card order-again-item border-none shadow-sm my-4 mx-2 rounded"
            role="button"
            onClick={handleClick}
        >
            <img src={props.imageSrc} className="" alt="Card image cap" />
            <div className="card-desc"><p>{props.desc}</p></div>
        </div>
    )
}
//#endregion

function OrderAgain() {
    return (
        <div className="order-again-wrapper">
            <div className="section-title flex items-center">
                <img src={OrderIcon} alt="Order Icon" className="title-icon mx-2" />
                Recommended
            </div>

            <div className="flex flex-row items-center">
                {/* History of Orders / Search */}
                <div className="carousel-container">
                    <Carousel
                        responsive={RESPONSIVE_SETTINGS}
                        draggable={false}
                    >
                        {RESTAURANT_LIST.map((restaurant) => (
                            <OrderAgainItem
                                key={restaurant.id}
                                imageSrc={getRestaurantImage2(restaurant.id)}
                                title={restaurant.name}
                                desc={restaurant.desc}
                                restaurantName={restaurant.name}
                            />
                        ))}
                    </Carousel>
                </div>
            </div>

        </div>
    )
}

export default OrderAgain