
import React from 'react';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'success';
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary', disabled = false }) => {
    const baseClasses = "px-7 py-3.5 border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
        primary: 'text-white shadow-lg hover:-translate-y-0.5 hover:shadow-xl',
        secondary: 'bg-white text-[var(--primary)] border-2 border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white',
        success: 'text-white shadow-lg hover:-translate-y-0.5 hover:shadow-xl',
    };
    
    const getBackground = () => {
        if (variant === 'primary') return { backgroundImage: 'var(--gradient-1)'};
        if (variant === 'success') return { backgroundImage: 'var(--gradient-2)'};
        return {};
    }

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${variantClasses[variant]}`}
            style={getBackground()}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
