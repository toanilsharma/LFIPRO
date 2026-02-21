import React from 'react';
import { Section, SectionKey, LfiData } from '../types';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface SidebarProps {
    sections: Section[];
    activeSection: SectionKey;
    lfiData: LfiData;
    onSectionClick: (section: SectionKey) => void;
}

const isSectionFilled = (section: SectionKey, data: LfiData) => {
    switch (section) {
        case 'template': return !!data.template;
        case 'problem': return !!data.problemTitle && !!data.problemStatement;
        case 'rootcause': return !!data.rootCause;
        case 'lessons': return data.lessons.some(l => l && l.length > 0);
        case 'actions': return !!data.immediateAction && !!data.correctiveAction && !!data.systemicAction;
        case 'prevention': return !!data.validation && !!data.horizontal;
        case 'sharing': return !!data.distribution || data.audience.length > 0;
        default: return false;
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
                    const isCompleted = isSectionFilled(section.id, lfiData);
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

                            {isCompleted && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    style={{ position: 'absolute', right: '1rem', color: 'var(--secondary)' }}
                                >
                                    <CheckCircle2 size={20} />
                                </motion.div>
                            )}
                        </motion.li>
                    )
                })}
            </ul>
        </div>
    );
};

export default Sidebar;
