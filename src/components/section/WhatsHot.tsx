import { RESTAURANT_LIST } from "../../constants/restaurantData"
import { getRestaurantImage1 } from "../../hooks/getImageSrcHook";
import Carousel from "react-multi-carousel";
import FireIcon from "../../assets/icons/whatshot.png"
import { RESPONSIVE_SETTINGS } from "../../constants/responsiveSetting";
import { useNavigate } from "react-router-dom";

//#region card items
type WhatsHotItemProps = {
    imageSrc: string;
    title: string;
    text: string;
    restaurantName: string;
}

function WhatsHotItem(props: WhatsHotItemProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/restaurant/${encodeURIComponent(props.restaurantName)}`);
    };

    return (
        <div
            className={`card whats-hot-item border-0 mb-2 mx-1 bg-white rounded`}
            role="button"
            onClick={handleClick}
        >
            <img className="card-img-top" src={props.imageSrc} alt="Card image cap" />
            <div className="card-body">
                <p className="card-text"><strong>{props.text}</strong></p>
            </div>
        </div>
    )
}
//#endregion

function WhatsHot() {
    return (
        <div className="whats-hot-wrapper">
            {/* add a icon from assets/icon/fire.png before title */}
            <div className="section-title d-flex align-items-center">
                <img src={FireIcon} alt="Fire Icon" className="title-icon fire-icon mx-1" />
                What's Hot
            </div>
            <div className="carousel-container">
                <Carousel
                    responsive={RESPONSIVE_SETTINGS}
                    draggable={false}
                >
                    {RESTAURANT_LIST.map((restaurant) => (
                        <WhatsHotItem
                            key={restaurant.id}
                            imageSrc={getRestaurantImage1(restaurant.id)}
                            title={restaurant.name}
                            text={restaurant.name}
                            restaurantName={restaurant.name}
                        />
                    ))}
                </Carousel>
            </div>

        </div>
    )
}

export default WhatsHot
