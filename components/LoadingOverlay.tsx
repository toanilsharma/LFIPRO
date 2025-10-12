import React from 'react';

interface LoadingOverlayProps {
    isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-white/90 flex justify-center items-center z-[2000]">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-[var(--secondary)] rounded-full animate-spin mx-auto"></div>
                <p className="mt-5 text-lg font-semibold" style={{ color: 'var(--primary)' }}>
                    AI is thinking...
                </p>
            </div>
        </div>
    );
};

export default LoadingOverlay;