import NewDishes from "../../components/section/NewDishes"
import OrderAgain from "../../components/section/OrderAgain"
import RestaurantRank from "../../components/section/RestaurantRank"
import Reviews from "../../components/section/Reviews"
import WhatsHot from "../../components/section/WhatsHot"

function HomePage() {
    return (
        <div className="home-page-container">
            <main>
                {/* 'What's Hot' section */}
                <section className="mb-4">
                    <WhatsHot />
                </section>

                {/* Ranks of restaurants */}
                <section className="mb-4">
                    <RestaurantRank />
                </section>

                {/* 'Order Again' section */}
                <section className="mb-4">
                    <OrderAgain />
                </section>

                {/* 'New Dishes' section */}
                <section className="mb-4">
                    <NewDishes />
                </section>

                {/* 'Reviews' section */}
                <section className="mb-4">
                    <Reviews />
                </section>
            </main>

            <aside>
                {/* Ads */}
            </aside>
        </div>
    )
}

export default HomePage