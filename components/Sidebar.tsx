
import React from 'react';
import { Section, SectionKey, LfiData } from '../types';

interface SidebarProps {
    sections: Section[];
    activeSection: SectionKey;
    lfiData: LfiData;
    onSectionClick: (section: SectionKey) => void;
}

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

const Sidebar: React.FC<SidebarProps> = ({ sections, activeSection, lfiData, onSectionClick }) => {
    return (
        <div className="bg-white rounded-2xl p-8 shadow-md">
            <h3 className="text-xl font-bold mb-5" style={{ color: 'var(--primary)' }}>LFI Sections</h3>
            <ul className="space-y-2.5">
                {sections.map(section => {
                    const isCompleted = isSectionFilled(section.id, lfiData);
                    return (
                        <li
                            key={section.id}
                            className={`p-4 rounded-xl cursor-pointer transition-all duration-300 flex items-center gap-4 relative border-l-4 ${
                                activeSection === section.id
                                    ? 'text-white shadow-lg'
                                    : 'hover:bg-gray-100 hover:translate-x-1 border-l-transparent hover:border-l-[var(--secondary)]'
                            } ${isCompleted && activeSection !== section.id ? 'bg-green-50' : ''}`}
                            style={activeSection === section.id ? {background: 'var(--gradient-1)', borderLeftColor: 'transparent'} : {}}
                            onClick={() => onSectionClick(section.id)}
                        >
                            <span className="text-2xl w-8 text-center">{section.icon}</span>
                            <span className="font-semibold">{section.name.substring(3)}</span>
                            {isCompleted && (
                                <span className="absolute right-4 w-6 h-6 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold">✓</span>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default Sidebar;
