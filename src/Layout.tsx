
import { Outlet } from 'react-router-dom'
import Footer from './pages/footer/Footer'
import Header from './pages/header/Header'
import { ScrollToTop } from './components/ScrollToTop'

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

        </div>
    )
}