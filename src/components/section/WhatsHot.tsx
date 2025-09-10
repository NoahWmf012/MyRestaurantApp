import { RESTAURANT_LIST } from "../../constants/restaurantList"
import { getRestaurantImage1 } from "../../hooks/getImageSrcHook";

//card items
type WhatsHotItemProps = {
    imageSrc: string;
    title: string;
    text: string;
    buttonLink: string;
}
function WhatsHotItem(props: WhatsHotItemProps) {
    return (
        <div className="card whats-hot-item">
            <img className="card-img-top" src={props.imageSrc} alt="Card image cap" />
            <div className="card-body">
                <p className="card-text">{props.text}</p>
            </div>
        </div>
    )
}

function WhatsHot() {
    return (
        <div className="column section-wrapper flex d-flex gap-1">
            {RESTAURANT_LIST.map((restaurant) => (
                <WhatsHotItem
                    key={restaurant.id}
                    imageSrc={getRestaurantImage1(restaurant.id)}
                    title={restaurant.name}
                    text={restaurant.desc}
                    buttonLink="#"
                />
            ))}
        </div>
    )
}

export default WhatsHot