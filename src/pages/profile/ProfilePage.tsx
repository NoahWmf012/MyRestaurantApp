import { ProtectedRoute } from "../../components/ProtectedRoute"

function ProfilePage() {
    return (
        <ProtectedRoute>
            <div>ProfilePage</div>
        </ProtectedRoute>
    )
}

export default ProfilePage