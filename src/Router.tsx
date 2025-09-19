import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import { Layout } from './Layout'
import RestaurantPage from './pages/restaurant/RestaurantPage'
import { ErrorBoundary, NotFoundPage } from './components/ErrorBoundary'
import SearchPage from './pages/search/SearchPage'

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
            <Route path="" element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="restaurant/:name" element={<RestaurantPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Route>
    ),
    {
        basename: '/my-restaurant-fe'
    }
)
