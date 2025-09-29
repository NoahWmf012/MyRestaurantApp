import React, { useEffect, useState } from 'react'
import './auth.scss'
import { useNavigate } from 'react-router-dom';
import ShowIcon from '../../assets/icons/show.png'
import HideIcon from '../../assets/icons/hide.png'
import { useLazyLoginQuery } from '../../redux/services/api/userAPI';
import type { LoginRequest } from '../../interfaces/queryInterface/userAPIInterface';
import { QueryStatus } from '@reduxjs/toolkit/query';
import type { ErrorInterface } from '../../interfaces/errorInterface';

interface FormErrors {
    email?: string;
    password?: string;
    general?: string;
}

function LoginForm() {
    const [formData, setFormData] = useState<LoginRequest>({
        email: '',
        password: ''
        // rememberMe: false
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const [triggerLogin, loginResult] = useLazyLoginQuery();

    const navigate = useNavigate();

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined,
                general: undefined
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});

        try {
            triggerLogin(formData);

            // Simulate login validation
            if (formData.email === 'test@example.com' && formData.password === 'password123') {
                console.log('Login successful:', formData);
                // Handle successful login here (redirect, set auth state, etc.)
            } else {
                setErrors({ general: 'Invalid email or password. Please try again.' });
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrors({ general: 'Login failed. Please try again later.' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (loginResult.isFetching) {
            return
        }
        if (loginResult.isSuccess && loginResult.status === QueryStatus.fulfilled) {
            if (loginResult.data) {
                // update user state from loginResult.data
            }
            // dispatch(finishLoading())
        } else if (loginResult.isError) {
            console.error(loginResult.error)
            // show error modal with message
        }
    }, [loginResult])

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email.trim()) {
            setErrors({ email: 'Please enter your email address to reset password' });
            return;
        }

        setIsLoading(true);

        try {
            // Simulate password reset API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Password reset instructions have been sent to your email.');
            setShowForgotPassword(false);
        } catch (err) {
            console.error('Password reset error:', err);
            setErrors({ general: 'Failed to send password reset email. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    if (showForgotPassword) {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1 className="auth-title">Reset Password</h1>
                        <p className="auth-subtitle">Enter your email to receive reset instructions</p>
                    </div>

                    <form className="auth-form" onSubmit={handleForgotPassword}>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email Address
                            </label>
                            <div className="form-input-wrapper">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email address"
                                    className={`form-input has-icon ${errors.email ? 'error' : ''}`}
                                    autoComplete="email"
                                />
                                <span className="input-icon">📧</span>
                            </div>
                            {errors.email && (
                                <div className="form-error">
                                    <span className="error-icon">⚠</span>
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        {errors.general && (
                            <div className="form-error">
                                <span className="error-icon">⚠</span>
                                {errors.general}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`auth-button ${isLoading ? 'loading' : ''}`}
                        >
                            <span className="button-text">
                                {isLoading ? 'Sending...' : 'Send Reset Instructions'}
                            </span>
                            {isLoading && <span className="loading-spinner">⟳</span>}
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

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email Address
                        </label>
                        <div className="form-input-wrapper">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email address"
                                className={`form-input has-icon ${errors.email ? 'error' : ''}`}
                                autoComplete="email"
                            />
                            <span className="input-icon">📧</span>
                        </div>
                        {errors.email && (
                            <div className="form-error">
                                <span className="error-icon">⚠</span>
                                {errors.email}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <div className="form-input-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                className={`form-input has-icon has-toggle ${errors.password ? 'error' : ''}`}
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
                        {errors.password && (
                            <div className="form-error">
                                <span className="error-icon">⚠</span>
                                {errors.password}
                            </div>
                        )}
                    </div>

                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleInputChange}
                            className="checkbox-input"
                        />
                        <label htmlFor="rememberMe" className="checkbox-label">
                            Remember me for 30 days
                        </label>
                    </div>

                    {errors.general && (
                        <div className="form-error">
                            <span className="error-icon">⚠</span>
                            {errors.general}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`auth-button ${isLoading ? 'loading' : ''}`}
                    >
                        <span className="button-text">
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </span>
                        {isLoading && <span className="loading-spinner">⟳</span>}
                    </button>

                    <button
                        type="button"
                        className="auth-button secondary-button"
                        onClick={() => setShowForgotPassword(true)}
                    >
                        Forgot Password?
                    </button>

                    <div className="social-auth">
                        <div className="divider">
                            <span>or sign in with</span>
                        </div>
                        <div className="social-buttons">
                            <button type="button" className="social-button google">
                                <span className="social-icon">G</span>
                                Google
                            </button>
                            <button type="button" className="social-button facebook">
                                <span className="social-icon">f</span>
                                Facebook
                            </button>
                        </div>
                    </div>
                </form>

                <div className="auth-footer">
                    <p className="auth-link">
                        Don't have an account? <div onClick={() => navigate('/signup')}>Sign up</div>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginForm