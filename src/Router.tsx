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
import { UnauthorizedRoute } from './components/UnauthorizedRoute'
import SettingsPage from './pages/settings/SettingsPage'

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
            <Route path="" element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="restaurant/:name" element={<RestaurantPage />} />

            {/* Unauthenticated Routes - redirect to home if already logged in */}
            <Route path="login" element={
                <UnauthorizedRoute>
                    <LoginPage />
                </UnauthorizedRoute>
            } />
            <Route path="signup" element={
                <UnauthorizedRoute>
                    <SignupPage />
                </UnauthorizedRoute>
            } />

            {/* Protected Routes - redirect to login if not authenticated */}
            <Route path="profile" element={
                <ProtectedRoute>
                    <ProfilePage />
                </ProtectedRoute>
            } />
            <Route path="settings" element={
                <ProtectedRoute>
                    <SettingsPage />
                </ProtectedRoute>
            } />

            <Route path="*" element={<NotFoundPage />} />
        </Route>
    ),
    {
        basename: '/my-restaurant-fe'
    }
)
