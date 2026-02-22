import React from 'react';
import { Section, SectionKey, LfiData } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

interface SidebarProps {
    sections: Section[];
    activeSection: SectionKey;
    lfiData: LfiData;
    onSectionClick: (section: SectionKey) => void;
}

export type SectionStatus = 'empty' | 'warning' | 'completed';

export const getSectionStatus = (section: SectionKey, data: LfiData): SectionStatus => {
    switch (section) {
        case 'template':
            return data.template ? 'completed' : 'empty';
        case 'problem': {
            if (!data.problemTitle && !data.problemStatement) return 'empty';
            const statementWords = data.problemStatement.trim().split(/\s+/).filter(Boolean).length;
            if (data.problemTitle.length < 15 || statementWords < 25) return 'warning';
            return 'completed';
        }
        case 'rootcause': {
            if (!data.rootCause) return 'empty';
            const rcWords = data.rootCause.trim().split(/\s+/).filter(Boolean).length;
            if (rcWords < 20) return 'warning';
            return 'completed';
        }
        case 'lessons': {
            const hasLessons = data.lessons.some(l => l && l.trim().length > 0);
            if (!hasLessons) return 'empty';
            const lesson1Words = data.lessons[0] ? data.lessons[0].trim().split(/\s+/).filter(Boolean).length : 0;
            if (lesson1Words < 15) return 'warning';
            return 'completed';
        }
        case 'actions': {
            if (!data.immediateAction && !data.correctiveAction && !data.systemicAction) return 'empty';
            if (!data.immediateAction || !data.correctiveAction || !data.systemicAction ||
                data.immediateAction.length < 10 || data.correctiveAction.length < 10 || data.systemicAction.length < 10) return 'warning';
            return 'completed';
        }
        case 'prevention': {
            if (!data.validation && !data.horizontal) return 'empty';
            if (!data.validation || !data.horizontal || data.validation.length < 10 || data.horizontal.length < 10) return 'warning';
            return 'completed';
        }
        case 'sharing': {
            if (!data.distribution && data.audience.length === 0) return 'empty';
            if (!data.distribution || data.audience.length === 0 || data.distribution.length < 5) return 'warning';
            return 'completed';
        }
        default: return 'empty';
    }
}

const Sidebar: React.FC<SidebarProps> = ({ sections, activeSection, lfiData, onSectionClick }) => {
    return (
        <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--text-primary)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                LFI Builder
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {sections.map((section, index) => {
                    const status = getSectionStatus(section.id, lfiData);
                    const isActive = activeSection === section.id;

                    return (
                        <motion.li
                            key={section.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => onSectionClick(section.id)}
                            style={{
                                padding: '1rem',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                position: 'relative',
                                background: isActive ? 'rgba(79, 70, 229, 0.2)' : 'transparent',
                                border: isActive ? '1px solid rgba(79, 70, 229, 0.5)' : '1px solid transparent',
                                transition: 'all 0.3s ease',
                                color: isActive ? 'white' : 'var(--text-secondary)'
                            }}
                            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2rem' }}>
                                <section.icon size={22} strokeWidth={2} />
                            </span>
                            <span style={{ fontWeight: isActive ? 600 : 400 }}>
                                {section.name.substring(3)}
                            </span>

                            <AnimatePresence mode="wait">
                                {status === 'completed' && (
                                    <motion.div
                                        key="completed"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        style={{ position: 'absolute', right: '1rem', color: 'var(--success)' }}
                                        title="Section deeply completed"
                                    >
                                        <CheckCircle2 size={20} />
                                    </motion.div>
                                )}
                                {status === 'warning' && (
                                    <motion.div
                                        key="warning"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        style={{ position: 'absolute', right: '1rem', color: 'var(--warning)' }}
                                        title="Needs more detail for a 100/100 score"
                                    >
                                        <AlertTriangle size={20} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.li>
                    )
                })}
            </ul>
        </div>
    );
};

export default Sidebar;
