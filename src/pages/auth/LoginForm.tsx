import { useEffect, useState } from 'react'
import './auth.scss'
import { useNavigate } from 'react-router-dom';
import ShowIcon from '../../assets/icons/show.png'
import HideIcon from '../../assets/icons/hide.png'
import { useLazyLoginQuery, useLazyForgetPasswordQuery } from '../../redux/services/api/userAPI';
import type { LoginRequest } from '../../interfaces/queryInterface/userAPIInterface';
import { QueryStatus } from '@reduxjs/toolkit/query';
import { setAuthInfo } from '../../redux/reducers/authSlice';
import { setUserInfo } from '../../redux/reducers/userInfoSlice';
import { useAppDispatch } from '../../redux/store';
import { loginValidation, forgotPasswordValidation } from '../../validations/auth.validation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';

// const finishLoading = () => ({ type: 'loading/finishLoading' as const });

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const [triggerLogin, loginResult] = useLazyLoginQuery();
    const [triggerForgotPassword, forgotPasswordResult] = useLazyForgetPasswordQuery();

    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const { redirectAfterLogin } = useAuthRedirect();

    const guestLoginHandler = async () => {
        navigate('/guest-login');
    };

    // Main login form
    const {
        register: registerLogin,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors, isSubmitting: isLoginLoading },
        setError: setLoginError
    } = useForm<LoginRequest>({
        resolver: yupResolver(loginValidation),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    // Forgot password form
    const {
        register: registerForgot,
        handleSubmit: handleForgotSubmit,
        formState: { errors: forgotErrors, isSubmitting: isForgotLoading },
        setError: setForgotError
    } = useForm<{ email: string }>({
        resolver: yupResolver(forgotPasswordValidation),
        defaultValues: {
            email: ''
        }
    });

    const onLoginSubmit = async (data: LoginRequest) => {
        try {
            await triggerLogin(data).unwrap();
        } catch (error) {
            console.error('Login error:', error);
            setLoginError('root', {
                message: 'Login failed. Please try again later.'
            });
        }
    };

    useEffect(() => {
        if (loginResult.isFetching) {
            return
        }
        if (loginResult.isSuccess && loginResult.status === QueryStatus.fulfilled) {
            if (loginResult.data) {
                //set authSlice
                dispatch(setAuthInfo({
                    accessToken: loginResult.data.accessToken,
                    refreshToken: loginResult.data.refreshToken,
                    expiredIn: loginResult.data.expiredIn
                }))
                //set userInfoSlice
                dispatch(setUserInfo({
                    userId: loginResult.data.userId,
                    userName: loginResult.data.userName
                }))

                // Redirect to intended page after successful login
                redirectAfterLogin();
            }
            // dispatch(finishLoading());
        } else if (loginResult.isError) {
            console.error(loginResult.error)
            // todo: show error modal with message
        }
    }, [loginResult, dispatch, redirectAfterLogin])

    const onForgotPasswordSubmit = async () => {
        try {
            await triggerForgotPassword({ email: forgotErrors.email?.message || '' }).unwrap();
            setShowForgotPassword(false);
        } catch (err) {
            console.error('Password reset error:', err);
            setForgotError('root', {
                message: 'Failed to send password reset email. Please try again.'
            });
        }
    };

    useEffect(() => {
        if (forgotPasswordResult.isFetching) {
            return
        }
        if (forgotPasswordResult.isSuccess && forgotPasswordResult.status === QueryStatus.fulfilled) {
            // todo: show a success message
            // dispatch(finishLoading());
        } else if (forgotPasswordResult.isError) {
            console.error(forgotPasswordResult.error);
            // todo: show error modal with message
        }
    }, [forgotPasswordResult, dispatch]);

    if (showForgotPassword) {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1 className="auth-title">Reset Password</h1>
                        <p className="auth-subtitle">Enter your email to receive reset instructions</p>
                    </div>

                    <form className="auth-form" onSubmit={handleForgotSubmit(onForgotPasswordSubmit)}>
                        <div className="form-group">
                            <label htmlFor="forgot-email" className="form-label">
                                Email Address
                            </label>
                            <div className="form-input-wrapper">
                                <input
                                    type="email"
                                    id="forgot-email"
                                    {...registerForgot('email')}
                                    placeholder="Enter your email address"
                                    className={`form-input has-icon ${forgotErrors.email ? 'error' : ''}`}
                                    autoComplete="email"
                                />
                                <span className="input-icon">📧</span>
                            </div>
                            {forgotErrors.email && (
                                <div className="form-error">
                                    <span className="error-icon">⚠</span>
                                    {forgotErrors.email.message}
                                </div>
                            )}
                        </div>

                        {forgotErrors.root && (
                            <div className="form-error">
                                <span className="error-icon">⚠</span>
                                {forgotErrors.root.message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isForgotLoading}
                            className={`auth-button ${isForgotLoading ? 'loading' : ''}`}
                        >
                            <span className="button-text">
                                {isForgotLoading ? 'Sending...' : 'Send Reset Instructions'}
                            </span>
                            {isForgotLoading && <span className="loading-spinner">⟳</span>}
                        </button>

                        <button
                            type="button"
                            className="auth-button secondary-button"
                            onClick={() => setShowForgotPassword(false)}
                        >
                            Back to Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">Sign in to your account</p>
                </div>

                <form className="auth-form" onSubmit={handleLoginSubmit(onLoginSubmit)}>
                    <div className="form-group">
                        <label htmlFor="login-email" className="form-label">
                            Email Address
                        </label>
                        <div className="form-input-wrapper">
                            <input
                                type="email"
                                id="login-email"
                                {...registerLogin('email')}
                                placeholder="Enter your email address"
                                className={`form-input has-icon ${loginErrors.email ? 'error' : ''}`}
                                autoComplete="email"
                            />
                            <span className="input-icon">📧</span>
                        </div>
                        {loginErrors.email && (
                            <div className="form-error">
                                <span className="error-icon">⚠</span>
                                {loginErrors.email.message}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="login-password" className="form-label">
                            Password
                        </label>
                        <div className="form-input-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="login-password"
                                {...registerLogin('password')}
                                placeholder="Enter your password"
                                className={`form-input has-icon has-toggle ${loginErrors.password ? 'error' : ''}`}
                                autoComplete="current-password"
                            />
                            <span className="input-icon">🔒</span>
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                            >
                                {showPassword ? <img className='password-icon' src={ShowIcon} alt="Show" /> : <img className='password-icon' src={HideIcon} alt="Hide" />}
                            </button>
                        </div>
                        {loginErrors.password && (
                            <div className="form-error">
                                <span className="error-icon">⚠</span>
                                {loginErrors.password.message}
                            </div>
                        )}
                    </div>

                    {loginErrors.root && (
                        <div className="form-error">
                            <span className="error-icon">⚠</span>
                            {loginErrors.root.message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoginLoading}
                        className={`auth-button ${isLoginLoading ? 'loading' : ''}`}
                    >
                        <span className="button-text">
                            {isLoginLoading ? 'Signing In...' : 'Sign In'}
                        </span>
                        {isLoginLoading && <span className="loading-spinner">⟳</span>}
                    </button>

                    <button
                        type="button"
                        className="auth-button secondary-button"
                        onClick={() => setShowForgotPassword(true)}
                    >
                        Forgot Password?
                    </button>

                    <button
                        type="button"
                        className="auth-button"
                        onClick={() => guestLoginHandler()}
                    >
                        Guest Login
                    </button>

                    <div className="social-auth">
                        <div className="divider">
                            <span>or sign in with</span>
                        </div>
                        <div className="social-buttons">
                            <button type="button" className="social-button google" disabled={true}>
                                <span className="social-icon">G</span>
                                Google
                            </button>
                            <button type="button" className="social-button facebook" disabled={true}>
                                <span className="social-icon">f</span>
                                Facebook
                            </button>
                        </div>
                    </div>
                </form>

                <div className="auth-footer">
                    <p className="auth-link">
                        Don't have an account? <span className="link" onClick={() => navigate('/signup')}>Sign up</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginForm