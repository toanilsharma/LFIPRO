import React, { useState, useRef, useEffect } from 'react';
import { Section, SectionKey, LfiData } from '../types';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

interface MobileSectionNavProps {
    sections: Section[];
    activeSection: SectionKey;
    lfiData: LfiData;
    onSectionClick: (section: SectionKey) => void;
}

const MobileSectionNav: React.FC<MobileSectionNavProps> = ({ sections, activeSection, lfiData, onSectionClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const activeSectionInfo = sections.find(s => s.id === activeSection);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [ref]);

    const handleSelect = (sectionId: SectionKey) => {
        onSectionClick(sectionId);
        setIsOpen(false);
    };

    return (
        <div style={{ position: 'relative' }} ref={ref}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="glass-panel"
                style={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: isOpen ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {activeSectionInfo && <activeSectionInfo.icon size={24} strokeWidth={2} />}
                    </span>
                    <span style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--text-primary)' }}>{activeSectionInfo?.name}</span>
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown size={24} style={{ color: 'var(--text-secondary)' }} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '0.5rem', background: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', zIndex: 50, listStyle: 'none', padding: 0 }}
                    >
                        {sections.map(section => {
                            const isCompleted = isSectionFilled(section.id, lfiData);
                            const isActive = activeSection === section.id;
                            return (
                                <li key={section.id}>
                                    <button
                                        onClick={(e) => { e.preventDefault(); handleSelect(section.id); }}
                                        style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', background: isActive ? 'rgba(79, 70, 229, 0.1)' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                                    >
                                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2rem' }}>
                                            <section.icon size={22} strokeWidth={2} />
                                        </span>
                                        <span style={{ flexGrow: 1, color: isActive ? 'var(--primary)' : 'var(--text-secondary)', fontWeight: isActive ? 700 : 500 }}>{section.name}</span>
                                        {isCompleted && (
                                            <span style={{ color: 'var(--success)' }}>
                                                <CheckCircle2 size={20} />
                                            </span>
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MobileSectionNav;
