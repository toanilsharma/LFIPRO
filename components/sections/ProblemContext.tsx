
import React from 'react';
import { LfiData } from '../../types';
import SectionControls from '../ui/SectionControls';

interface ProblemContextProps {
    lfiData: LfiData;
    updateLfiData: (data: Partial<LfiData>) => void;
    onNext: () => void;
    onPrev: () => void;
}

const FeedbackItem: React.FC<{ status: 'good' | 'warn' | 'error' | 'neutral', icon: string, label: string, value: string | number }> = ({ status, icon, label, value }) => {
    const statusClasses = {
        good: 'bg-green-50 border-l-green-500',
        warn: 'bg-yellow-50 border-l-yellow-500',
        error: 'bg-red-50 border-l-red-500',
        neutral: 'bg-gray-100 border-l-gray-400',
    };
    return (
        <div className={`p-3 rounded-lg flex items-center gap-3 border-l-4 ${statusClasses[status]}`}>
            <span className="text-2xl">{icon}</span>
            <div>
                <span className="text-xs text-gray-500 block">{label}</span>
                <span className="text-sm font-semibold text-gray-800">{value}</span>
            </div>
        </div>
    );
};

const SmartTextarea: React.FC<{id: string, value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void; placeholder: string; isTextarea?: boolean, required?: boolean}> = ({id, value, onChange, placeholder, isTextarea = true, required = false}) => (
    <div className="mb-6">
        <label htmlFor={id} className="text-lg font-semibold text-gray-700 mb-2 block">{placeholder.split('(')[0].trim()} {required && <span className="text-red-500">*</span>}</label>
        {isTextarea ? (
             <textarea id={id} value={value} onChange={onChange} placeholder={placeholder} className="w-full min-h-[180px] p-4 border-2 border-gray-200 rounded-xl text-base leading-relaxed resize-vertical transition-all duration-300 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10" />
        ) : (
             <input id={id} type="text" value={value} onChange={onChange} placeholder={placeholder} className="w-full p-4 border-2 border-gray-200 rounded-xl text-base leading-relaxed transition-all duration-300 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10" />
        )}
       
    </div>
);

const ProblemContext: React.FC<ProblemContextProps> = ({ lfiData, updateLfiData, onNext, onPrev }) => {
    const { problemTitle, problemStatement } = lfiData;

    const titleLength = problemTitle.length;
    const statementWords = problemStatement.trim().split(/\s+/).filter(Boolean).length;
    const dataPoints = (problemStatement.match(/(\d[\d,.]*|\%)/g) || []).length;

    const getWordCountFeedback = (): { status: 'good' | 'warn' | 'error'; value: string } => {
        if (statementWords < 25) return { status: 'error', value: 'Too short' };
        if (statementWords <= 150) return { status: 'good', value: 'Concise' };
        return { status: 'warn', value: 'Can be more concise' };
    };
    const wordCountFeedback = getWordCountFeedback();

    const getClarityFeedback = (): { status: 'good' | 'warn' | 'error' | 'neutral'; value: string } => {
        if (statementWords === 0) return { status: 'neutral', value: 'Not assessed' };
        let score = 0;
        const checks = {
            impact: /cost|\$|dollar|delay|time|hour|day|scrap|defect|rate|%|return|failure/i,
            what: /problem|issue|defect|failure|error|concern/i,
            when: /date|week|month|q[1-4]|20\d{2}/i,
            where: /line|area|plant|location|site|facility/i,
        };

        if (checks.impact.test(problemStatement)) score++;
        if (checks.what.test(problemStatement)) score++;
        if (checks.when.test(problemStatement)) score++;
        if (checks.where.test(problemStatement)) score++;
        
        if (score >= 3) return { status: 'good', value: 'Clear & Specific' };
        if (score >= 1) return { status: 'warn', value: 'Needs More Detail' };
        return { status: 'error', value: 'Vague Statement' };
    };
    const clarityFeedback = getClarityFeedback();

    return (
        <div>
            <SmartTextarea
                id="problemTitle"
                value={problemTitle}
                onChange={e => updateLfiData({ problemTitle: e.target.value })}
                placeholder="Problem Title (e.g., 'High Defect Rate in Welding Process - Line 3')"
                isTextarea={false}
                required
            />
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <FeedbackItem 
                    status={titleLength === 0 ? 'neutral' : titleLength < 20 ? 'error' : titleLength > 100 ? 'warn' : 'good'}
                    icon="📏" 
                    label="Length" 
                    value={`${titleLength} / 100 chars`} 
                />
            </div>
            
            <SmartTextarea
                id="problemStatement"
                value={problemStatement}
                onChange={e => updateLfiData({ problemStatement: e.target.value })}
                placeholder="Problem Statement & Impact: Concisely describe WHAT, WHEN, WHERE, and the IMPACT. Aim for ~50-100 words."
                required
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FeedbackItem 
                    status={statementWords === 0 ? 'neutral' : wordCountFeedback.status}
                    icon="🔢" 
                    label="Word Count" 
                    value={`${statementWords} words (${wordCountFeedback.value})`} 
                />
                 <FeedbackItem 
                    status={statementWords === 0 ? 'neutral' : dataPoints >= 2 ? 'good' : 'warn'}
                    icon="📊" 
                    label="Data Points" 
                    value={`${dataPoints} detected`} 
                />
                <FeedbackItem 
                    status={clarityFeedback.status}
                    icon="🎯" 
                    label="Clarity & Impact" 
                    value={clarityFeedback.value}
                />
            </div>
            
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-r-lg my-6">
                <h4 className="font-bold text-indigo-800 text-lg mb-2">✨ Concise & Powerful Problem Statement</h4>
                <p className="text-gray-700 italic">"In Q3 2024, 15% of units from Line 3 failed the final paint adhesion test, costing $25,000 in scrap/rework and delaying customer shipments by 3 days."</p>
            </div>


            <SectionControls onPrev={onPrev} onNext={onNext} />
        </div>
    );
};

export default ProblemContext;
