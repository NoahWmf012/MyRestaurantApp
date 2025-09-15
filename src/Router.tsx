import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import { Layout } from './Layout'
import RestaurantPage from './pages/restaurant/RestaurantPage'
import RestaurantListPage from './pages/restaurant/RestaurantListPage'

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route path="" element={<HomePage />} />
            <Route path="search" element={<RestaurantListPage />} />
            <Route path="restaurant/:name" element={<RestaurantPage />} />
        </Route>
    )
)
