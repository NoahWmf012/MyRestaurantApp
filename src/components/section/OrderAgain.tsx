import Carousel from "react-multi-carousel";
import OrderIcon from "../../assets/icons/order.png"
import { RESPONSIVE_SETTINGS } from "../../constants/responsiveSetting";
import { RESTAURANT_LIST } from "../../constants/restaurantData";
import { getRestaurantImage2 } from "../../hooks/getImageSrcHook";

type OrderAgainItemProps = {
    imageSrc: string;
    title: string;
    desc: string;
}

{/* horizontal card item */ }
function OrderAgainItem(props: OrderAgainItemProps) {
    return (
        <div className="horizontal-card order-again-item border-0 shadow-sm shadow mb-2 mx-1 rounded" >
            <img src={props.imageSrc} className="" alt="Card image cap" />
            <div className="card-desc"><p>{props.desc}</p></div>
        </div>
    )
}

function OrderAgain() {
    return (
        <div className="section-wrapper">
            <div className="section-title">
                <img src={OrderIcon} alt="Order Icon" className="title-icon order-icon" />
                Order Again
            </div>
            {/* History of Orders */}
            <Carousel
                responsive={RESPONSIVE_SETTINGS}
                draggable
            >
                {RESTAURANT_LIST.map((restaurant) => (
                    <OrderAgainItem
                        key={restaurant.id}
                        imageSrc={getRestaurantImage2(restaurant.id)}
                        title={restaurant.name}
                        desc={restaurant.desc}
                    />
                ))}
            </Carousel>

            {/* Drawer */}
        </div>
    )
}

export default OrderAgain