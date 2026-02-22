import React from 'react';
import { TemplateKey } from '../types';
import { SAMPLE_LFIS } from '../sampleLfis';
import { TEMPLATES } from '../constants';
import LfiPreviewContent from './LfiPreviewContent';

interface SampleLfiModalProps {
    templateId: TemplateKey;
    onClose: () => void;
}

const SampleLfiModal: React.FC<SampleLfiModalProps> = ({ templateId, onClose }) => {
    const sampleData = SAMPLE_LFIS[templateId];
    const templateInfo = TEMPLATES.find(t => t.id === templateId);

    if (!sampleData || !templateInfo) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-[1000] p-4"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
                onClick={e => e.stopPropagation()}
            >
                <header className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-900 rounded-t-2xl z-10">
                    <h2 className="text-2xl font-bold flex items-center gap-4 text-primary dark:text-indigo-400">
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <templateInfo.icon size={36} strokeWidth={2} />
                        </span>
                        Sample LFI: {templateInfo.name}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 text-3xl font-light"
                        aria-label="Close modal"
                    >&times;</button>
                </header>
                <main className="p-8 overflow-y-auto">
                    <LfiPreviewContent lfiData={sampleData} />
                </main>
                <footer className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-right sticky bottom-0 rounded-b-2xl z-10">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                        Close
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default SampleLfiModal;