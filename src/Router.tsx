import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { lazy } from 'react'
import { Layout } from './Layout'
import { ErrorBoundary, NotFoundPage } from './components/ErrorBoundary'

// Lazy load all page components for better code splitting
const HomePage = lazy(() => import('./pages/home/HomePage'))
const PromotedRestaurantPage = lazy(() => import('./pages/restaurant/PromotedRestaurantPage'))
const SearchPage = lazy(() => import('./pages/search/SearchPage'))
const LoginPage = lazy(() => import('./pages/auth/LoginPage'))
const SignupPage = lazy(() => import('./pages/auth/SignupPage'))
const ProfilePage = lazy(() => import('./pages/profile/ProfilePage'))
const SettingsPage = lazy(() => import('./pages/settings/SettingsPage'))
const GuestLoginPage = lazy(() => import('./pages/auth/GuestLoginPage'))
const VotePage = lazy(() => import('./pages/vote/VotePage'))
const PollSharePage = lazy(() => import('./pages/vote/PollSharePage'))
const StaticRestaurantPage = lazy(() => import('./pages/restaurant/StaticRestaurantPage'))
const AboutUsPage = lazy(() => import('./pages/footer/AboutUsPage'))
const ContactPage = lazy(() => import('./pages/footer/ContactPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/footer/PrivacyPolicyPage'))
const TermsOfServicePage = lazy(() => import('./pages/footer/TermsOfServicePage'))
const PromotedRestaurantSearchPage = lazy(() => import('./pages/restaurant/PromotedRestaurantSearchPage'))
const MapSearchPage = lazy(() => import('./pages/search/MapSearchPage'))

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
            <Route path="" element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="restaurant/:name" element={<PromotedRestaurantPage />} />{/* Promote Restaurant */}
            <Route path="restaurant-search/:restaurantId" element={<StaticRestaurantPage />} />{/* Normal restaurant search */}
            <Route path="about-us" element={<AboutUsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="terms-of-service" element={<TermsOfServicePage />} />
            <Route path="promoted-restaurant-search" element={<PromotedRestaurantSearchPage />} />
            <Route path="map-search" element={<MapSearchPage />} />

            {/* Unauth Routes */}
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="guest-login" element={<GuestLoginPage />} />

            {/* Auth Routes */}
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path='vote' element={<VotePage />} />
            <Route path="poll/share/:shareToken" element={<PollSharePage />} />

            <Route path="*" element={<NotFoundPage />} />
        </Route>
    )
)
