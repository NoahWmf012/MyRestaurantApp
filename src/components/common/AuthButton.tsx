import React from 'react'

interface AuthButtonProps {
    children: React.ReactNode;
    type?: 'submit' | 'button' | 'reset';
    variant?: 'primary' | 'secondary' | 'social';
    loading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
    icon?: string;
    socialProvider?: 'google' | 'facebook' | 'twitter';
}

function AuthButton({
    children,
    type = 'button',
    variant = 'primary',
    loading = false,
    disabled = false,
    onClick,
    className = '',
    icon,
    socialProvider
}: AuthButtonProps) {
    const baseClasses = 'auth-button';
    const variantClasses = {
        primary: '',
        secondary: 'secondary-button',
        social: `social-button ${socialProvider || ''}`
    };

    const buttonClasses = [
        baseClasses,
        variantClasses[variant],
        loading ? 'loading' : '',
        className
    ].filter(Boolean).join(' ');

    const handleClick = () => {
        if (!loading && !disabled && onClick) {
            onClick();
        }
    };

    return (
        <button
            type={type}
            className={buttonClasses}
            disabled={disabled || loading}
            onClick={handleClick}
            aria-disabled={disabled || loading}
        >
            {icon && <span className="social-icon">{icon}</span>}
            <span className="button-text">
                {children}
            </span>
            {loading && <span className="loading-spinner">⟳</span>}
        </button>
    );
}

export default AuthButton
