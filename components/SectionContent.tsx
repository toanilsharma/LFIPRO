
import React from 'react';
import { LfiData, SectionKey, TemplateKey } from '../types';
import TemplateSelection from './sections/TemplateSelection';
import ProblemContext from './sections/ProblemContext';
import RootCause from './sections/RootCause';
import LessonsLearned from './sections/LessonsLearned';
import ImplementationActions from './sections/ImplementationActions';
import Prevention from './sections/Prevention';
import KnowledgeSharing from './sections/KnowledgeSharing';
import ReviewExport from './sections/ReviewExport';
import { SECTIONS } from '../constants';

interface SectionContentProps {
    currentSection: SectionKey;
    lfiData: LfiData;
    updateLfiData: (data: Partial<LfiData>) => void;
    onTemplateSelect: (template: TemplateKey) => void;
    onNext: () => void;
    onPrev: () => void;
}

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex justify-between items-center mb-8 pb-5 border-b-2 border-gray-100">
        <h2 className="text-3xl font-bold flex items-center gap-4" style={{color: 'var(--primary)'}}>
            {children}
        </h2>
    </div>
);

const SectionContent: React.FC<SectionContentProps> = (props) => {
    const { currentSection, lfiData, updateLfiData, onTemplateSelect, onNext, onPrev } = props;
    const currentSectionInfo = SECTIONS.find(s => s.id === currentSection);

    const renderSection = () => {
        const sectionProps = { lfiData, updateLfiData, onNext, onPrev };

        switch (currentSection) {
            case 'template':
                return <TemplateSelection lfiData={lfiData} onTemplateSelect={onTemplateSelect} onNext={onNext} />;
            case 'problem':
                return <ProblemContext {...sectionProps} />;
            case 'rootcause':
                return <RootCause {...sectionProps} />;
            case 'lessons':
                return <LessonsLearned {...sectionProps} />;
            case 'actions':
                return <ImplementationActions {...sectionProps} />;
            case 'prevention':
                return <Prevention {...sectionProps} />;
            case 'sharing':
                return <KnowledgeSharing {...sectionProps} />;
            case 'preview':
                return <ReviewExport lfiData={lfiData} onPrev={onPrev} />;
            default:
                return <div>Section not found</div>;
        }
    };

    return (
        <div>
            <SectionHeader>
                <span className="text-3xl">{currentSectionInfo?.icon}</span>
                {currentSectionInfo?.name.substring(3)}
            </SectionHeader>
            {renderSection()}
        </div>
    );
};

export default SectionContent;
