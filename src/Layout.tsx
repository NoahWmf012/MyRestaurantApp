
import { Outlet } from 'react-router-dom'
import Footer from './pages/Footer'
import Header from './pages/Header'

export const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}