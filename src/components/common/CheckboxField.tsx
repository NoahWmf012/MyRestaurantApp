import React from 'react'

interface CheckboxFieldProps {
    label: React.ReactNode;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

function CheckboxField({
    label,
    name,
    checked,
    onChange,
    error,
    required,
    disabled,
    className = ''
}: CheckboxFieldProps) {
    return (
        <div className={`checkbox-group ${className}`}>
            <input
                type="checkbox"
                id={name}
                name={name}
                checked={checked}
                onChange={onChange}
                className="checkbox-input"
                required={required}
                disabled={disabled}
                aria-describedby={error ? `${name}-error` : undefined}
                aria-invalid={error ? 'true' : 'false'}
            />
            <label htmlFor={name} className="checkbox-label">
                {label}
                {required && <span className="required-indicator"> *</span>}
            </label>
            {error && (
                <div className="form-error" id={`${name}-error`}>
                    <span className="error-icon">⚠</span>
                    {error}
                </div>
            )}
        </div>
    );
}

export default CheckboxField
