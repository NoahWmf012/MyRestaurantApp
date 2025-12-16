
import { Outlet } from 'react-router-dom'
import Footer from './pages/footer/Footer'
import Header from './pages/header/Header'
import { ScrollToTop } from './components/ScrollToTop'
import RoulettePopup from './components/spinWheel/RoulettePopup'
import VoteModal from './components/vote/VoteModal'
import MsgModal from './components/common/MsgModal'
import { useAppSelector } from './redux/store'

const style = {
    flexFlow: "column" as const,
    flex: "1 0 auto",
    minWidth: "1000px",
    display: "flex"
}
export const Layout = () => {
    const show = useAppSelector((state) => state.showVoteModalState.visible);
    return (
        <div className="layout-container" style={style}>
            <ScrollToTop />
            <Header />
            <Outlet />
            <Footer />

            {/* modals */}
            <RoulettePopup />
            {show && <VoteModal />} {/* Prevent auth API call */}
            <MsgModal />
        </div>
    )
}