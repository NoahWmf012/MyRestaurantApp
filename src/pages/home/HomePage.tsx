import { useEffect } from "react"
import NewDishes from "../../components/section/NewDishes"
import OrderAgain from "../../components/section/OrderAgain"
import Reviews from "../../components/section/Reviews"
import WhatsHot from "../../components/section/WhatsHot"
import { useLazyGetVotesQuery } from "../../redux/services/api/voteAPI"

function HomePage() {
    const [getVotes, { data: votesData }] = useLazyGetVotesQuery()
    useEffect(() => {
        void getVotes()
    }, [])
    useEffect(() => {
        if (votesData)
            console.log('Votes Data:', votesData)
    }, [votesData])
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