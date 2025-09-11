import { RESTAURANT_LIST } from "../../constants/restaurantData"
import { getRestaurantImage1 } from "../../hooks/getImageSrcHook";
import Carousel from "react-multi-carousel";
import FireIcon from "../../assets/icons/whatshot.png"
import { RESPONSIVE_SETTINGS } from "../../constants/responsiveSetting";

//card items
type WhatsHotItemProps = {
    imageSrc: string;
    title: string;
    text: string;
    buttonLink: string;
}
function WhatsHotItem(props: WhatsHotItemProps) {
    return (
        <div className={`card whats-hot-item border-0 shadow-sm shadow mb-2 mx-1 bg-white rounded`}>
            <img className="card-img-top" src={props.imageSrc} alt="Card image cap" />
            <div className="card-body">
                <p className="card-text"><strong>{props.text}</strong></p>
            </div>
        </div>
    )
}

function WhatsHot() {
    return (
        <div className="section-wrapper">
            {/* add a icon from assets/icon/fire.png before title */}
            <div className="section-title">
                <img src={FireIcon} alt="Fire Icon" className="title-icon fire-icon" />
                What's Hot
            </div>
            <Carousel
                responsive={RESPONSIVE_SETTINGS}
                draggable
            >
                {RESTAURANT_LIST.map((restaurant) => (
                    <WhatsHotItem
                        key={restaurant.id}
                        imageSrc={getRestaurantImage1(restaurant.id)}
                        title={restaurant.name}
                        text={restaurant.name}
                        buttonLink="#"
                    />
                ))}
            </Carousel>
        </div>
    )
}

export default WhatsHot
