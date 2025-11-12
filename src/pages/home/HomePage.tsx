import FoodCategory from "../../components/FoodCategory"
// import NewDishes from "../../components/section/NewDishes"
import OrderAgain from "../../components/section/OrderAgain"
import RestaurantRank from "../../components/section/RestaurantRank"
import Reviews from "../../components/section/Reviews"
import WhatsHot from "../../components/section/WhatsHot"

function HomePage() {
    return (
        <div className="home-page-container">
            <div className="home-page-food-category">
                {/* Food Category for search */}
                <section className="mb-4">
                    <FoodCategory />
                </section>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
                <main className="lg:col-span-3">

                    {/* 'What's Hot' section */}
                    <section className="mb-4">
                        <WhatsHot />
                    </section>

                    {/* 'Order Again' section */}
                    <section className="mb-4">
                        <OrderAgain />
                    </section>

                    {/* Ranks of restaurants */}
                    <section className="mb-4">
                        <RestaurantRank />
                    </section>

                    {/* 'New Dishes' section //combined to What's Hot */}
                    {/*
                    <section className="mb-4">
                        <NewDishes />
                    </section> */}

                    {/* 'Reviews' section */}
                    <section className="mb-4">
                        <Reviews />
                    </section>
                </main>

                <aside className="space-y-8">
                    {/* Ads */}
                </aside>
            </div>

        </div>
    )
}

export default HomePage