import { useLazyGuestLoginQuery } from "../../redux/services/api/userAPI"

function GuestLoginForm() {
    const [triggerGuestLogin, { data, isLoading }] = useLazyGuestLoginQuery()

    const handleLogin = () => {
        try {
            triggerGuestLogin({ userName: "guest" })
        } catch (error) {
            console.error("Failed to login:", error)
        }
    }

    return (
        <div>
            <h2>Guest Login</h2>
            <button type="button" className="btn" onClick={handleLogin} disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login as Guest"}
            </button>
            {data && <p>Welcome, {data?.user?.name}!</p>}
        </div>
    )
}

export default GuestLoginForm