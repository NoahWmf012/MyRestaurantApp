import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ShowIcon from '../../assets/icons/show.png'
import HideIcon from '../../assets/icons/hide.png'
import './auth.scss'
import { signupValidation } from '../../validations/auth.validation';
import { useLazySignUpQuery } from '../../redux/services/api/userAPI';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface SignupFormData {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreedToTerms: boolean;
}

function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [triggerSignup] = useLazySignUpQuery();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useForm<SignupFormData>({
        resolver: yupResolver(signupValidation),
        defaultValues: {
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreedToTerms: false
        }
    });

    const onSubmit = async (data: SignupFormData) => {
        try {
            // Map form data to API format
            const signupData = {
                userName: data.userName,
                email: data.email,
                password: data.password
            };

            await triggerSignup(signupData).unwrap();
            console.log('Signup successful:', signupData);
            // Handle successful signup here (redirect, show success message, etc.)
            navigate('/login');
        } catch (error) {
            console.error('Signup error:', error);
            setError('root', {
                message: 'Signup failed. Please try again later.'
            });
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Join us and start your culinary journey</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="userName" className="form-label">
                            Username
                        </label>
                        <div className="form-input-wrapper">
                            <input
                                type="text"
                                id="userName"
                                {...register('userName')}
                                placeholder="Enter your user name"
                                className={`form-input has-icon ${errors.userName ? 'error' : ''}`}
                                autoComplete="userName"
                            />
                            <span className="input-icon">👤</span>
                        </div>
                        {errors.userName && (
                            <div className="form-error">
                                <span className="error-icon">⚠</span>
                                {errors.userName.message}
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
                                {...register('email')}
                                placeholder="Enter your email address"
                                className={`form-input has-icon ${errors.email ? 'error' : ''}`}
                                autoComplete="email"
                            />
                            <span className="input-icon">📧</span>
                        </div>
                        {errors.email && (
                            <div className="form-error">
                                <span className="error-icon">⚠</span>
                                {errors.email.message}
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
                                {...register('password')}
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
                                {errors.password.message}
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
                                {...register('confirmPassword')}
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
                                {errors.confirmPassword.message}
                            </div>
                        )}
                    </div>

                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="agreedToTerms"
                            {...register('agreedToTerms')}
                            className="checkbox-input"
                        />
                        <label htmlFor="agreedToTerms" className="checkbox-label">
                            I agree to the <span onClick={() => navigate('/terms')} className="link">Terms of Service</span> and <span onClick={() => navigate('/privacy')} className="link">Privacy Policy</span>
                        </label>
                    </div>
                    {errors.agreedToTerms && (
                        <div className="form-error">
                            <span className="error-icon">⚠</span>
                            {errors.agreedToTerms.message}
                        </div>
                    )}

                    {errors.root && (
                        <div className="form-error">
                            <span className="error-icon">⚠</span>
                            {errors.root.message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`auth-button ${isSubmitting ? 'loading' : ''}`}
                    >
                        <span className="button-text">
                            {isSubmitting ? 'Creating Account...' : 'Create Account'}
                        </span>
                        {isSubmitting && <span className="loading-spinner">⟳</span>}
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
                        Already have an account? <span onClick={() => navigate('/login')}>Log in</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignupForm