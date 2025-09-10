
import { Outlet } from 'react-router-dom'
import Footer from './pages/footer/Footer'
import Header from './pages/header/Header'

const style = {
    flexFlow: "column" as const,
    flex: "1 0 auto",
    minWidth: "1000px",
    display: "flex"
}
export const Layout = () => {
    return (
        <div className="layout-container" style={style}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}