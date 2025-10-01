import { UnauthorizedRoute } from '../../components/UnauthorizedRoute'
import LoginForm from './LoginForm'

function LoginPage() {
    return (
        <UnauthorizedRoute>
            <LoginForm />
        </UnauthorizedRoute>
    )
}

export default LoginPage