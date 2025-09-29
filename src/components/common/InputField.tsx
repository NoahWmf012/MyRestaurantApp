import React from 'react'

interface InputFieldProps {
    label: string;
    type?: 'text' | 'email' | 'password' | 'tel' | 'url';
    name: string;
    value: string;
    placeholder?: string;
    icon?: string;
    error?: string;
    success?: boolean;
    showToggle?: boolean;
    onToggle?: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    autoComplete?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

function InputField({
    label,
    type = 'text',
    name,
    value,
    placeholder,
    icon,
    error,
    success,
    showToggle,
    onToggle,
    onChange,
    autoComplete,
    required,
    disabled,
    className = ''
}: InputFieldProps) {
    const inputClasses = [
        'form-input',
        icon ? 'has-icon' : '',
        showToggle ? 'has-toggle' : '',
        error ? 'error' : '',
        success ? 'success' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className="form-group">
            <label htmlFor={name} className="form-label">
                {label}
                {required && <span className="required-indicator"> *</span>}
            </label>
            <div className="form-input-wrapper">
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={inputClasses}
                    autoComplete={autoComplete}
                    required={required}
                    disabled={disabled}
                    aria-describedby={error ? `${name}-error` : undefined}
                    aria-invalid={error ? 'true' : 'false'}
                />
                {icon && <span className="input-icon">{icon}</span>}
                {showToggle && onToggle && (
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={onToggle}
                        tabIndex={-1}
                        aria-label={type === 'password' ? 'Show password' : 'Hide password'}
                    >
                        {type === 'password' ? '👁️' : '🔒'}
                    </button>
                )}
            </div>
            {error && (
                <div className="form-error" id={`${name}-error`}>
                    <span className="error-icon">⚠</span>
                    {error}
                </div>
            )}
            {success && !error && (
                <div className="form-success">
                    <span className="success-icon">✓</span>
                    Looks good!
                </div>
            )}
        </div>
    );
}

export default InputField
