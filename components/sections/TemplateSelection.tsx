import React, { useState } from 'react';
import { LfiData, TemplateKey } from '../../types';
import { TEMPLATES } from '../../constants';
import SectionControls from '../ui/SectionControls';
import SampleLfiModal from '../SampleLfiModal';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface TemplateSelectionProps {
    lfiData: LfiData;
    onTemplateSelect: (template: TemplateKey) => void;
    onNext: () => void;
}

const TemplateCard: React.FC<{ template: typeof TEMPLATES[0]; isSelected: boolean; onSelect: () => void; onViewSample: () => void; }> = ({ template, isSelected, onSelect, onViewSample }) => {
    const handleViewSampleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onViewSample();
    };

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className={`rounded-xl p-4 cursor-pointer border-4 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full ${isSelected
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 shadow-xl shadow-indigo-500/20'
                : 'border-transparent bg-white dark:bg-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-md'
                }`}
            onClick={onSelect}
        >
            <div>
                {isSelected && (
                    <div className="absolute top-4 right-4 text-indigo-600 dark:text-indigo-400 flex items-center gap-1 font-bold">
                        <CheckCircle2 size={24} />
                        <span>SELECTED</span>
                    </div>
                )}
                <div className="text-indigo-600 dark:text-indigo-400 mb-2.5 bg-white dark:bg-gray-900 w-10 h-10 rounded-full flex items-center justify-center shadow-inner">
                    <template.icon size={20} strokeWidth={2} />
                </div>
                <h3 className={`text-base font-extrabold mb-1 ${isSelected ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-900 dark:text-gray-100'}`}>
                    {template.name}
                </h3>
                <p className={`text-[11px] leading-relaxed mb-3 ${isSelected ? 'text-indigo-900/80 dark:text-indigo-200/80' : 'text-gray-600 dark:text-gray-400'}`}>
                    {template.description}
                </p>
                <div className="inline-block px-2.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-md text-[10px] font-bold text-gray-500 dark:text-gray-300">
                    Complies with: {template.standards}
                </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-2">
                <button
                    onClick={onSelect}
                    className={`flex-1 py-2 rounded-xl font-bold text-xs transition-all ${isSelected
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                >
                    {isSelected ? '✓ Currently Selected' : 'Choose This Format'}
                </button>
                <button
                    onClick={handleViewSampleClick}
                    className="flex-1 py-2 rounded-xl font-bold text-xs bg-white dark:bg-gray-800 border-2 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-all focus:outline-none"
                    title="See a world-class example"
                >
                    View Example
                </button>
            </div>
        </motion.div>
    );
};


const TemplateSelection: React.FC<TemplateSelectionProps> = ({ lfiData, onTemplateSelect, onNext }) => {
    const [viewingSample, setViewingSample] = useState<TemplateKey | null>(null);

    const handleTemplateSelectAndNext = (templateId: TemplateKey) => {
        onTemplateSelect(templateId);
        setTimeout(() => {
            onNext();
        }, 500); // 500ms delay for visual feedback before auto-advancing
    };

    return (
        <div className="animate-fade-in text-gray-900 dark:text-gray-100">
            {viewingSample && (
                <SampleLfiModal templateId={viewingSample} onClose={() => setViewingSample(null)} />
            )}

            <div className="mb-6 text-center max-w-2xl mx-auto">
                <span className="inline-block px-3 py-1 mb-2 text-xs font-bold tracking-wider text-indigo-700 uppercase bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-full">
                    Step 1 of 6
                </span>
                <h2 className="text-xl md:text-2xl font-extrabold mb-2 font-heading">Choose Your Report Format</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Don't worry if you aren't sure. Any format will guide you through creating a world-class LFI. <strong className="text-indigo-600 dark:text-indigo-400">Click a card below to select it.</strong>
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                {TEMPLATES.map(template => (
                    <TemplateCard
                        key={template.id}
                        template={template}
                        isSelected={lfiData.template === template.id}
                        onSelect={() => handleTemplateSelectAndNext(template.id)}
                        onViewSample={() => setViewingSample(template.id)}
                    />
                ))}
            </div>

            {!lfiData.template && (
                <div className="bg-amber-100 dark:bg-amber-900/30 border-l-4 border-amber-500 text-amber-800 dark:text-amber-200 p-3 rounded-lg text-xs font-medium flex items-center gap-3">
                    <span className="text-xl">⚠️</span>
                    Please select one of the formats above to unlock the next step.
                </div>
            )}

            <div className="mt-8">
                <SectionControls onNext={onNext} nextDisabled={!lfiData.template} nextText="Next Step: Problem Context" />
            </div>
        </div>
    );
};

export default TemplateSelection;