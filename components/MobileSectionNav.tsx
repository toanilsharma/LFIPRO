
import React, { useState, useRef, useEffect } from 'react';
import { Section, SectionKey, LfiData } from '../types';

const isSectionFilled = (section: SectionKey, data: LfiData) => {
    switch(section) {
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
        <div className="relative" ref={ref}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white rounded-xl p-4 shadow-md text-left flex justify-between items-center border-2 border-transparent focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-4">
                    <span className="text-2xl">{activeSectionInfo?.icon}</span>
                    <span className="font-bold text-lg text-gray-800">{activeSectionInfo?.name}</span>
                </div>
                <svg className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isOpen && (
                <ul className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
                    {sections.map(section => {
                        const isCompleted = isSectionFilled(section.id, lfiData);
                        return (
                            <li key={section.id}>
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); handleSelect(section.id); }}
                                    className={`w-full p-4 flex items-center gap-4 hover:bg-gray-100 transition-colors ${activeSection === section.id ? 'bg-indigo-50 text-indigo-700 font-bold' : ''}`}
                                >
                                    <span className="text-2xl w-8 text-center">{section.icon}</span>
                                    <span className="flex-grow">{section.name}</span>
                                    {isCompleted && (
                                        <span className="w-6 h-6 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold">✓</span>
                                    )}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default MobileSectionNav;
