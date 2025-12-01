
import { Outlet } from 'react-router-dom'
import Footer from './pages/footer/Footer'
import Header from './pages/header/Header'
import { ScrollToTop } from './components/ScrollToTop'
import RoulettePopup from './components/spinWheel/RoulettePopup'
import VoteModal from './components/vote/VoteModal'
import ErrModal from './components/common/ErrModal'

const style = {
    flexFlow: "column" as const,
    flex: "1 0 auto",
    minWidth: "1000px",
    display: "flex"
}
export const Layout = () => {

    return (
        <div className="layout-container" style={style}>
            <ScrollToTop />
            <Header />
            <Outlet />
            <Footer />

            {/* modals */}
            <RoulettePopup />
            <VoteModal />
            <ErrModal />
        </div>
    )
}