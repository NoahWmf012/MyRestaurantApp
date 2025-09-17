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
        navigate(`/restaurant/${props.restaurantName}`);
    };
    return (
        <div
            className="horizontal-card order-again-item border-0 shadow-sm shadow mb-2 mx-1 rounded"
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
            <div className="section-title d-flex align-items-center">
                <img src={OrderIcon} alt="Order Icon" className="title-icon order-icon mx-1" />
                Order Again
            </div>

            <div className="d-flex flex-row align-items-center">
                {/* History of Orders */}
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