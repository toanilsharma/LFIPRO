
import React from 'react';
import GuideContent from './GuideContent';

interface GuideModalProps {
    onClose: () => void;
}

const GuideModal: React.FC<GuideModalProps> = ({ onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-[1000] p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <header className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white rounded-t-2xl z-10">
                    <h2 className="text-2xl font-bold flex items-center gap-4" style={{ color: 'var(--primary)' }}>
                        <span className="text-4xl">📖</span>
                        LFI Best Practices Guide
                    </h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-500 hover:text-gray-800 text-3xl font-light"
                        aria-label="Close modal"
                    >&times;</button>
                </header>
                <main className="p-8 overflow-y-auto">
                    <GuideContent />
                </main>
                <footer className="p-4 bg-gray-50 border-t border-gray-200 text-right sticky bottom-0 rounded-b-2xl">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300"
                    >
                        Close
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default GuideModal;
