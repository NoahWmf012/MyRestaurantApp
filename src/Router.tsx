import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import { Layout } from './Layout'

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={< Layout />}>
            <Route path="" element={< HomePage />} />
        </Route>
    )
)
