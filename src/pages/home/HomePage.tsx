import { useEffect } from "react"
import FoodCategory from "../../components/FoodCategory"
// import NewDishes from "../../components/section/NewDishes"
import OrderAgain from "../../components/section/OrderAgain"
// import RestaurantRank from "../../components/section/RestaurantRank"
// import Reviews from "../../components/section/Reviews"
import WhatsHot from "../../components/section/WhatsHot"
import { useLazyFreshTokenQuery } from "../../redux/services/api/userAPI"

function HomePage() {
    //get auth info from local storage
    //call useLazyFreshTokenQuery if AuthInterface.expiredIn - current time < threshold (e.g., 2 days)
    const [trigger] = useLazyFreshTokenQuery()
    const checkAndRefreshToken = async () => {
        const stored = localStorage.getItem('authInfo')
        if (stored) {
            try {
                const parsed = JSON.parse(stored) as { accessToken: string; refreshToken: string; expiredIn?: number }
                const currentTimeInSeconds = Math.floor(Date.now() / 1000)
                const thresholdInSeconds = 2 * 24 * 60 * 60 // 2 days

                if (parsed.expiredIn && (parsed.expiredIn - currentTimeInSeconds) < thresholdInSeconds) {

                    const response = await trigger({ refreshToken: parsed.refreshToken }).unwrap()

                    if (response.accessToken) {
                        // Update localStorage with new tokens
                        const updatedAuth = {
                            accessToken: response.accessToken,
                            refreshToken: response.refreshToken || parsed.refreshToken,
                            expiredIn: response.expiredIn || parsed.expiredIn
                        }
                        localStorage.setItem('authInfo', JSON.stringify(updatedAuth))
                    }
                }
            } catch (error) {
                console.error('Error checking and refreshing token:', error)
            }
        }
    }

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                checkAndRefreshToken();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);


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
                        <OrderAgain />
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