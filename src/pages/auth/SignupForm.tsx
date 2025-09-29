import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ShowIcon from '../../assets/icons/show.png'
import HideIcon from '../../assets/icons/hide.png'
import './auth.scss'

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreedToTerms: boolean;
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agreedToTerms?: string;
}

function SignupForm() {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreedToTerms: false
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // First name validation
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        } else if (formData.firstName.trim().length < 2) {
            newErrors.firstName = 'First name must be at least 2 characters';
        }

        // Last name validation
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        } else if (formData.lastName.trim().length < 2) {
            newErrors.lastName = 'Last name must be at least 2 characters';
        }

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
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain uppercase, lowercase, and number';
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Terms validation
        if (!formData.agreedToTerms) {
            newErrors.agreedToTerms = 'You must agree to the terms and conditions';
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
                [name]: undefined
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Signup data:', formData);
            // Handle successful signup here
        } catch (error) {
            console.error('Signup error:', error);
            // Handle signup error here
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Join us and start your culinary journey</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName" className="form-label">
                            First Name
                        </label>
                        <div className="form-input-wrapper">
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="Enter your first name"
                                className={`form-input has-icon ${errors.firstName ? 'error' : ''}`}
                                autoComplete="given-name"
                            />
                            <span className="input-icon">👤</span>
                        </div>
                        {errors.firstName && (
                            <div className="form-error">
                                <span className="error-icon">⚠</span>
                                {errors.firstName}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName" className="form-label">
                            Last Name
                        </label>
                        <div className="form-input-wrapper">
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Enter your last name"
                                className={`form-input has-icon ${errors.lastName ? 'error' : ''}`}
                                autoComplete="family-name"
                            />
                            <span className="input-icon">👤</span>
                        </div>
                        {errors.lastName && (
                            <div className="form-error">
                                <span className="error-icon">⚠</span>
                                {errors.lastName}
                            </div>
                        )}
                    </div>

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
                                placeholder="Create a strong password"
                                className={`form-input has-icon has-toggle ${errors.password ? 'error' : ''}`}
                                autoComplete="new-password"
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

                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">
                            Confirm Password
                        </label>
                        <div className="form-input-wrapper">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Confirm your password"
                                className={`form-input has-icon has-toggle ${errors.confirmPassword ? 'error' : ''}`}
                                autoComplete="new-password"
                            />
                            <span className="input-icon">🔒</span>
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                tabIndex={-1}
                            >
                                {showConfirmPassword ? <img className='password-icon' src={ShowIcon} alt="Show" /> : <img className='password-icon' src={HideIcon} alt="Hide" />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <div className="form-error">
                                <span className="error-icon">⚠</span>
                                {errors.confirmPassword}
                            </div>
                        )}
                    </div>

                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="agreedToTerms"
                            name="agreedToTerms"
                            checked={formData.agreedToTerms}
                            onChange={handleInputChange}
                            className="checkbox-input"
                        />
                        <label htmlFor="agreedToTerms" className="checkbox-label">
                            I agree to the <span onClick={() => navigate('/terms')} className="link">Terms of Service</span> and <span onClick={() => navigate('/privacy')} className="link">Privacy Policy</span>
                        </label>
                    </div>
                    {errors.agreedToTerms && (
                        <div className="form-error">
                            <span className="error-icon">⚠</span>
                            {errors.agreedToTerms}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`auth-button ${isLoading ? 'loading' : ''}`}
                    >
                        <span className="button-text">
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </span>
                        {isLoading && <span className="loading-spinner">⟳</span>}
                    </button>

                    <div className="social-auth">
                        <div className="divider">
                            <span>or sign up with</span>
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
                        Already have an account? <div onClick={() => navigate('/login')}>Log in</div>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignupForm