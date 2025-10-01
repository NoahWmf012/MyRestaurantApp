import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import { Layout } from './Layout'
import RestaurantPage from './pages/restaurant/RestaurantPage'
import { ErrorBoundary, NotFoundPage } from './components/ErrorBoundary'
import SearchPage from './pages/search/SearchPage'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import ProfilePage from './pages/profile/ProfilePage'

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
            <Route path="" element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="restaurant/:name" element={<RestaurantPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="settings" element={
                <ProtectedRoute>
                    <ProfilePage />
                </ProtectedRoute>
            } />
            <Route path="*" element={<NotFoundPage />} />
        </Route>
    ),
    {
        basename: '/my-restaurant-fe'
    }
)
