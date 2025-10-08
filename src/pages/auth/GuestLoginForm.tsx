import { useEffect } from "react"
import { useLazyGuestLoginQuery } from "../../redux/services/api/userAPI"
import { useAppDispatch } from "../../redux/store"
import { QueryStatus } from "@reduxjs/toolkit/query"
import { setAuthInfo } from "../../redux/reducers/authSlice"
import { setUserInfo } from "../../redux/reducers/userInfoSlice"
import { useAuthRedirect } from "../../hooks/useAuthRedirect"
import { useForm } from "react-hook-form"
import { guestLoginValidation } from "../../validations/auth.validation"
import { yupResolver } from "@hookform/resolvers/yup"

function GuestLoginForm() {
    const dispatch = useAppDispatch()
    const [triggerGuestLogin, guestLoginResult] = useLazyGuestLoginQuery()
    const { redirectAfterLogin } = useAuthRedirect();

    const handleGuestLogin = async (data: { username: string }) => {
        try {
            await triggerGuestLogin({ userName: data.username }).unwrap()
        } catch (error) {
            console.error("Failed to login:", error)
            setGuestLoginError('root', {
                message: 'Guest login failed. Please try again later.'
            });
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

    // React Hook Form
    const {
        register: registerGuestUsername,
        handleSubmit: handleGuestSubmit,
        formState: { errors: guestErrors },
        setError: setGuestLoginError
    } = useForm<{ username: string }>({
        resolver: yupResolver(guestLoginValidation),
        defaultValues: {
            username: ''
        }
    });

    return (
        <div className="auth-container">
            <div className="auth-card">
                <form className="auth-form" onSubmit={handleGuestSubmit(handleGuestLogin)}>
                    <div className="form-group">
                        <label htmlFor="user-name" className="form-label">
                            User Name
                        </label>
                        <div className="user-name-wrapper">
                            <input
                                id="guest-user-name"
                                {...registerGuestUsername('username')}
                                placeholder="What's your name?"
                                className={"form-input has-icon"}
                                autoComplete="username"
                            />
                        </div>
                        {guestErrors.username && (
                            <div className="form-error">
                                <span className="error-icon">⚠</span>
                                {guestErrors.username.message}
                            </div>
                        )}
                        <button type="submit" className="auth-button" disabled={guestLoginResult.isFetching}>
                            {guestLoginResult.isFetching ? "Logging in..." : "Login as Guest"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default GuestLoginForm