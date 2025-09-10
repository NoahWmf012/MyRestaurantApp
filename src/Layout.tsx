import { createBrowserRouter, Route } from 'react-router-dom'
import HomePage from './pages/home/HomePage'

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route path="" element={<HomePage />} />
        </Route>
    )
)


function Layout() {
    return (
        <div>Layout</div>
    )
}

export default Layout