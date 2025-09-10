import NewDishes from "../../components/section/NewDishes"
import OrderAgain from "../../components/section/OrderAgain"
import Reviews from "../../components/section/Reviews"
import WhatsHot from "../../components/section/WhatsHot"

function HomePage() {
    return (
        <div>
            {/* 'What's Hot' section */}
            <WhatsHot />

            {/* 'Order Again' section */}
            <OrderAgain />

            {/* 'New Dishes' section */}
            <NewDishes />

            {/* 'Reviews' section */}
            <Reviews />
        </div>
    )
}

export default HomePage