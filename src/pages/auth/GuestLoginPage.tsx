import { UnauthorizedRoute } from '../../components/UnauthorizedRoute'
import GuestLoginForm from './GuestLoginForm'

function GuestLoginPage() {
    return (
        <UnauthorizedRoute>
            <GuestLoginForm />
        </UnauthorizedRoute>
    )
}

export default GuestLoginPage