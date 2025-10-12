import React, { useState } from 'react';
import { LfiData, TemplateKey } from '../../types';
import { TEMPLATES } from '../../constants';
import SectionControls from '../ui/SectionControls';
import SampleLfiModal from '../SampleLfiModal'; // Import the new modal

interface TemplateSelectionProps {
    lfiData: LfiData;
    onTemplateSelect: (template: TemplateKey) => void;
    onNext: () => void;
}

const TemplateCard: React.FC<{ template: typeof TEMPLATES[0]; isSelected: boolean; onSelect: () => void; onViewSample: () => void; }> = ({ template, isSelected, onSelect, onViewSample }) => {
    const handleViewSampleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card selection when clicking the sample button
        onViewSample();
    };
    
    return (
        <div
            className={`bg-white border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 relative overflow-hidden transform hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between ${
                isSelected ? 'border-[var(--secondary)] bg-teal-50 shadow-xl' : 'border-gray-200 hover:border-[var(--secondary)]'
            }`}
            onClick={onSelect}
        >
            <div>
                {isSelected && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 text-xs font-bold rounded-full">✓ Selected</div>
                )}
                <div className="text-5xl mb-4">{template.icon}</div>
                <div className="text-xl font-bold text-[var(--primary)] mb-2">{template.name}</div>
                <div className="text-gray-600 text-sm leading-relaxed">{template.description}</div>
                <div className="mt-4 pt-4 border-t-2 border-gray-100 text-xs font-semibold text-[var(--secondary)]">{template.standards}</div>
            </div>
            <div className="mt-4 text-center">
                 <button 
                    onClick={handleViewSampleClick}
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-100 px-4 py-2 rounded-full w-full transition-colors"
                >
                    View World-Class Sample
                </button>
            </div>
        </div>
    );
};


const TemplateSelection: React.FC<TemplateSelectionProps> = ({ lfiData, onTemplateSelect, onNext }) => {
    const [viewingSample, setViewingSample] = useState<TemplateKey | null>(null);

    return (
        <div>
            {viewingSample && (
                <SampleLfiModal templateId={viewingSample} onClose={() => setViewingSample(null)} />
            )}

            <p className="text-lg text-gray-600 mb-8">Choose the template that best matches your industry and organizational standards. All templates follow international best practices.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TEMPLATES.map(template => (
                    <TemplateCard
                        key={template.id}
                        template={template}
                        isSelected={lfiData.template === template.id}
                        onSelect={() => onTemplateSelect(template.id)}
                        onViewSample={() => setViewingSample(template.id)}
                    />
                ))}
            </div>
            {!lfiData.template && (
                 <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-6 rounded-r-lg">
                    <p>⚠️ Please select a template to continue.</p>
                </div>
            )}
            <SectionControls onNext={onNext} nextDisabled={!lfiData.template} nextText="Next: Problem Context" />
        </div>
    );
};

export default TemplateSelection;