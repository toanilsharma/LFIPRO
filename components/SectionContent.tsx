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
import { motion, AnimatePresence } from 'framer-motion';

interface SectionContentProps {
    currentSection: SectionKey;
    lfiData: LfiData;
    updateLfiData: (data: Partial<LfiData>) => void;
    onTemplateSelect: (template: TemplateKey) => void;
    onNext: () => void;
    onPrev: () => void;
    onSwitchSection: (section: SectionKey) => void;
}

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-primary)', margin: 0 }}>
            {children}
        </h2>
    </div>
);

const pageVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 }
};

const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
};

const SectionContent: React.FC<SectionContentProps> = (props) => {
    const { currentSection, lfiData, updateLfiData, onTemplateSelect, onNext, onPrev, onSwitchSection } = props;
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
                return <ReviewExport lfiData={lfiData} onPrev={onPrev} onSwitchSection={onSwitchSection} />;
            default:
                return <div>Section not found</div>;
        }
    };

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            style={{ width: '100%' }}
        >
            <SectionHeader>
                <span style={{ fontSize: '1.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '3rem', height: '3rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)' }}>
                    {currentSectionInfo && <currentSectionInfo.icon size={30} strokeWidth={2} />}
                </span>
                {currentSectionInfo?.name.substring(3)}
            </SectionHeader>
            <div style={{ position: 'relative', width: '100%', minHeight: '400px' }}>
                {renderSection()}
            </div>
        </motion.div>
    );
};

export default SectionContent;
