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
        good: 'bg-emerald-50 dark:bg-emerald-900/20 border-l-emerald-500 text-emerald-800 dark:text-emerald-300',
        warn: 'bg-amber-50 dark:bg-amber-900/20 border-l-amber-500 text-amber-800 dark:text-amber-300',
        error: 'bg-rose-50 dark:bg-rose-900/20 border-l-rose-500 text-rose-800 dark:text-rose-300',
        neutral: 'bg-gray-100 dark:bg-gray-800 border-l-gray-400 text-gray-800 dark:text-gray-300',
    };
    return (
        <div className={`p-4 rounded-xl flex items-center gap-4 border-l-4 shadow-sm ${statusClasses[status]} transition-colors`}>
            <span className="text-3xl bg-white dark:bg-gray-900 p-2 rounded-full shadow-inner">{icon}</span>
            <div>
                <span className="text-sm font-bold opacity-70 block uppercase tracking-wider">{label}</span>
                <span className="text-lg font-bold">{value}</span>
            </div>
        </div>
    );
};

const SmartTextarea: React.FC<{ id: string, value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void; placeholder: string; isTextarea?: boolean, required?: boolean }> = ({ id, value, onChange, placeholder, isTextarea = true, required = false }) => (
    <div className="mb-8 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors">
        <label htmlFor={id} className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 block">
            {placeholder.split('(')[0].trim()} {required && <span className="text-rose-500 ml-1" title="Required">*</span>}
        </label>
        <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm font-medium">
            {placeholder}
        </p>
        {isTextarea ? (
            <textarea id={id} value={value} onChange={onChange} placeholder="Type your answer here..." className="w-full min-h-[160px] p-4 border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl text-lg resize-vertical transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20" />
        ) : (
            <input id={id} type="text" value={value} onChange={onChange} placeholder="Type your answer here..." className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl text-lg transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20" />
        )}
    </div>
);

const ProblemContext: React.FC<ProblemContextProps> = ({ lfiData, updateLfiData, onNext, onPrev }) => {
    const { problemTitle, problemStatement, teamMembers } = lfiData;

    const titleLength = problemTitle.length;
    const statementWords = problemStatement.trim().split(/\s+/).filter(Boolean).length;
    const dataPoints = (problemStatement.match(/(\d[\d,.]*|\%)/g) || []).length;

    const getWordCountFeedback = (): { status: 'good' | 'warn' | 'error'; value: string } => {
        if (statementWords < 25) return { status: 'error', value: 'Too short' };
        if (statementWords <= 150) return { status: 'good', value: 'Perfectly Concise' };
        return { status: 'warn', value: 'A Bit Long' };
    };
    const wordCountFeedback = getWordCountFeedback();

    const getClarityFeedback = (): { status: 'good' | 'warn' | 'error' | 'neutral'; value: string } => {
        if (statementWords === 0) return { status: 'neutral', value: 'Waiting for input...' };
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

        if (score >= 3) return { status: 'good', value: 'Extremely Clear' };
        if (score >= 1) return { status: 'warn', value: 'Add Date/Location/Cost' };
        return { status: 'error', value: 'Too Vague' };
    };
    const clarityFeedback = getClarityFeedback();

    return (
        <div className="animate-fade-in text-gray-900 dark:text-gray-100 max-w-4xl mx-auto">
            <div className="mb-10 text-center">
                <span className="inline-block px-4 py-1.5 mb-4 text-sm font-bold tracking-wider text-indigo-700 uppercase bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-full">
                    Step 2 of 6
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-heading">Define the Problem</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    What exactly went wrong? A clear problem definition is 50% of the solution.
                </p>
            </div>

            <SmartTextarea
                id="problemTitle"
                value={problemTitle}
                onChange={e => updateLfiData({ problemTitle: e.target.value })}
                placeholder="Give this incident a short, clear Name (e.g., 'High Defect Rate in Welding Process')"
                isTextarea={false}
                required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <FeedbackItem
                    status={titleLength === 0 ? 'neutral' : titleLength < 15 ? 'error' : titleLength > 100 ? 'warn' : 'good'}
                    icon="📏"
                    label="Title Length Rating"
                    value={titleLength === 0 ? 'Start typing...' : titleLength < 15 ? 'Too short' : titleLength > 100 ? 'Too long' : 'Perfect length'}
                />
            </div>

            <SmartTextarea
                id="teamMembers"
                value={teamMembers || ''}
                onChange={e => updateLfiData({ teamMembers: e.target.value })}
                placeholder="Team Members & Contributors (e.g., Jane Doe - Quality, John Smith - Production)"
                isTextarea={false}
                required={false}
            />

            <SmartTextarea
                id="problemStatement"
                value={problemStatement}
                onChange={e => updateLfiData({ problemStatement: e.target.value })}
                placeholder="Describe the incident in detail. Who, what, when, where, and how much did it cost?"
                required
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <FeedbackItem
                    status={statementWords === 0 ? 'neutral' : wordCountFeedback.status}
                    icon="📝"
                    label="Word Count"
                    value={statementWords === 0 ? '-' : `${statementWords} words (${wordCountFeedback.value})`}
                />
                <FeedbackItem
                    status={statementWords === 0 ? 'neutral' : dataPoints >= 2 ? 'good' : 'warn'}
                    icon="📊"
                    label="Data Points"
                    value={statementWords === 0 ? '-' : `${dataPoints} (Metrics/Numbers)`}
                />
                <FeedbackItem
                    status={clarityFeedback.status}
                    icon="🎯"
                    label="Clarity Rating"
                    value={clarityFeedback.value}
                />
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-400 p-6 rounded-r-2xl my-8">
                <h4 className="font-extrabold text-indigo-800 dark:text-indigo-300 text-lg mb-3 flex items-center gap-2">
                    <span className="text-2xl">💡</span> Example of a Perfect Problem Statement:
                </h4>
                <p className="text-indigo-900 dark:text-indigo-100 text-lg leading-relaxed italic bg-white/50 dark:bg-black/20 p-4 rounded-xl">
                    "On October 12, 2026, 15% of units from Assembly Line A failed the final pressure test, delaying the shipment to Delta Corp by 48 hours and incurring $12,500 in scrap costs."
                </p>
            </div>

            <SectionControls onPrev={onPrev} onNext={onNext} nextDisabled={titleLength < 5 || statementWords < 10} />
        </div>
    );
};

export default ProblemContext;
