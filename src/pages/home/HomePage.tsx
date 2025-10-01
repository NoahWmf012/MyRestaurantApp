import NewDishes from "../../components/section/NewDishes"
import OrderAgain from "../../components/section/OrderAgain"
import Reviews from "../../components/section/Reviews"
import WhatsHot from "../../components/section/WhatsHot"
import { useAppSelector } from "../../redux/store";

function HomePage() {
    const { accessToken } = useAppSelector(state => state.authState);

    const isAuthenticated = !!accessToken && accessToken.trim() !== '';
    console.log('ProtectedRoute - isAuthenticated:', isAuthenticated, accessToken);
    return (
        <div className="home-page-container">
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