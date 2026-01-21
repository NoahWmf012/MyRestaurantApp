import { useEffect } from "react"
import FoodCategory from "../../components/FoodCategory"
// import NewDishes from "../../components/section/NewDishes"
import Recommendations from "../../components/section/Recommendations"
// import RestaurantRank from "../../components/section/RestaurantRank"
// import Reviews from "../../components/section/Reviews"
import WhatsHot from "../../components/section/WhatsHot"
import { checkAndRefreshToken } from "../../hooks/authHooks"
import { useGetHomePageRecommendedRestaurantsQuery } from "../../redux/services/api/restaurantAPI"

function HomePage() {
    //get auth info from local storage
    //call useLazyFreshTokenQuery if AuthInterface.expiredIn - current time < threshold (e.g., 2 days)
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                checkAndRefreshToken()
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    const { data: homePageRecommendedRestaurants, error, isLoading } = useGetHomePageRecommendedRestaurantsQuery();

    return (
        <div className="home-page-container">
            <div className="home-page-food-category">
                {/* Food Category for search */}
                <section>
                    <FoodCategory />
                </section>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
                <main className="lg:col-span-3">

                    {/* 'What's Hot' section */}
                    <section className="mb-8">
                        <WhatsHot />
                    </section>

                    {/* 'Recommended' section */}
                    <section className="mb-8">
                        <Recommendations />
                    </section>

                    {/* Ranks of restaurants */}
                    {/* <section className="mb-8">
                        <RestaurantRank />
                    </section> */}

                    {/* 'New Dishes' section //combined to What's Hot */}
                    {/*
                    <section className="mb-8">
                        <NewDishes />
                    </section> */}

                    {/* 'Reviews' section */}
                    {/* <section className="mb-8">
                        <Reviews />
                    </section> */}
                </main>

                <aside className="space-y-8">
                    {/* Ads */}
                </aside>
            </div>

        </div>
    )
}

export default HomePage