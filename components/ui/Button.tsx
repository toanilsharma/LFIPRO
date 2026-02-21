import React from 'react';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'success';
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary', disabled = false }) => {
    const baseClasses = "px-8 py-4 border-none rounded-xl text-lg font-extrabold cursor-pointer transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
        primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30 hover:-translate-y-1',
        secondary: 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:-translate-y-1',
        success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 hover:-translate-y-1',
    };

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${variantClasses[variant]}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
