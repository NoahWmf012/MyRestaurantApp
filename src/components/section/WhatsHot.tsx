import { RESTAURANT_LIST } from "../../constants/restaurantList"
import { getRestaurantImage1 } from "../../hooks/getImageSrcHook";
import Carousel from "react-multi-carousel";
import FireIcon from "../../assets/icons/whatshot.png"

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
                <p className="card-text">{props.text}</p>
            </div>
        </div>
    )
}

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
        slidesToSlide: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1
    }
};

function WhatsHot() {
    return (
        <div className="section-wrapper">
            {/* add a icon from assets/icon/fire.png before title */}
            <div className="section-title">
                <img src={FireIcon} alt="Fire Icon" className="title-icon fire-icon" />
                What's Hot
            </div>
            <Carousel
                responsive={responsive}
                draggable
            >
                {RESTAURANT_LIST.map((restaurant) => (
                    <WhatsHotItem
                        key={restaurant.id}
                        imageSrc={getRestaurantImage1(restaurant.id)}
                        title={restaurant.name}
                        text={restaurant.desc}
                        buttonLink="#"
                    />
                ))}
            </Carousel>
        </div>
    )
}

export default WhatsHot
