import { useEffect } from "react"
import { useLazyGuestLoginQuery } from "../../redux/services/api/userAPI"
import { useAppDispatch } from "../../redux/store"
import { QueryStatus } from "@reduxjs/toolkit/query"
import { setAuthInfo } from "../../redux/reducers/authSlice"
import { setUserInfo } from "../../redux/reducers/userInfoSlice"
import { useAuthRedirect } from "../../hooks/useAuthRedirect"

function GuestLoginForm() {
    const dispatch = useAppDispatch()
    const [triggerGuestLogin, guestLoginResult] = useLazyGuestLoginQuery()
    const { redirectAfterLogin } = useAuthRedirect();

    const handleLogin = () => {
        try {
            triggerGuestLogin({ userName: "guest" })
        } catch (error) {
            console.error("Failed to login:", error)
        }
    }

    useEffect(() => {
        if (guestLoginResult.isFetching) {
            return
        }
        if (guestLoginResult.isSuccess && guestLoginResult.status === QueryStatus.fulfilled) {
            if (guestLoginResult.data) {
                // set authSlice
                dispatch(setAuthInfo({
                    accessToken: guestLoginResult.data.access_token,
                    refreshToken: guestLoginResult.data.refresh_token,
                    expiredIn: guestLoginResult.data.expires_in
                }))
                // set userInfoSlice
                dispatch(setUserInfo({
                    userId: guestLoginResult.data.user.id,
                    userName: guestLoginResult.data.user.userName,
                    isGuest: true
                }))

                // Redirect to intended page after successful login
                redirectAfterLogin();
            }
            // dispatch(finishLoading());
        } else if (guestLoginResult.isError) {
            console.error(guestLoginResult.error)
            // todo: show error modal with message
        }
    }, [guestLoginResult, dispatch, redirectAfterLogin])

    return (
        <div>
            <h2>Guest Login</h2>
            <button type="button" className="btn" onClick={handleLogin} disabled={guestLoginResult.isFetching}>
                {guestLoginResult.isFetching ? "Logging in..." : "Login as Guest"}
            </button>
        </div>
    )
}

export default GuestLoginForm