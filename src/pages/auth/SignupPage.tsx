import { UnauthorizedRoute } from '../../components/UnauthorizedRoute'
import SignupForm from './SignupForm'

function SignupPage() {
    return (
        <UnauthorizedRoute>
            <SignupForm />
        </UnauthorizedRoute>
    )
}

export default SignupPage