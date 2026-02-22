import React, { useEffect } from 'react';
import GuideContent from './GuideContent';
import { BookOpen, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GuideModalProps {
    onClose: () => void;
}

const GuideModal: React.FC<GuideModalProps> = ({ onClose }) => {
    // Prevent background scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[1000] p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col border border-gray-200 dark:border-gray-800"
                onClick={e => e.stopPropagation()}
            >
                <header className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md rounded-t-2xl z-10 sticky top-0">
                    <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-4 text-primary dark:text-indigo-400">
                        <span className="p-2 bg-primary/10 dark:bg-primary/20 rounded-xl text-primary dark:text-indigo-300">
                            <BookOpen size={32} strokeWidth={2.5} />
                        </span>
                        LFI Best Practices Guide
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Close modal"
                    >
                        <X size={28} />
                    </button>
                </header>

                <main className="p-6 md:p-10 overflow-y-auto custom-scrollbar bg-white dark:bg-gray-900 flex-grow">
                    <GuideContent />
                </main>

                <footer className="p-6 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 text-right sticky bottom-0 rounded-b-2xl z-10">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors shadow-sm"
                    >
                        Close Guide
                    </button>
                </footer>
            </motion.div>
        </div>
    );
};

export default GuideModal;
