import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import { Layout } from './Layout'
import SearchPage from './pages/search/SearchPage'
import RestaurantPage from './pages/restaurant/RestaurantPage'

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route path="" element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="restaurant/:name" element={<RestaurantPage />} />
        </Route>
    )
)
