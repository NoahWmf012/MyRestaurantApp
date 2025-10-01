import { ProtectedRoute } from "../../components/ProtectedRoute";

function SettingsPage() {
    return (
        <ProtectedRoute>
            <div>SettingsPage</div>
        </ProtectedRoute>
    )
}

export default SettingsPage