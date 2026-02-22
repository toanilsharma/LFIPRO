import React from 'react';
import { LfiData } from '../../types';
import SectionControls from '../ui/SectionControls';
import MarkdownTextarea from '../ui/MarkdownTextarea';

interface ImplementationActionsProps {
    lfiData: LfiData;
    updateLfiData: (data: Partial<LfiData>) => void;
    onNext: () => void;
    onPrev: () => void;
}

const ActionTextarea: React.FC<{ id: string, label: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; placeholder: string, desc: string, invalid?: boolean }> = ({ id, label, value, onChange, placeholder, desc, invalid }) => (
    <div className="mb-6 p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors">
        <label htmlFor={id} className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1 block">
            {label} <span className="text-rose-500 ml-1" title="Required">*</span>
        </label>
        <p className="text-gray-500 dark:text-gray-400 mb-3 text-xs font-medium">{desc}</p>
        <MarkdownTextarea
            id={id}
            minRows={4}
            value={value}
            onChange={onChange as any}
            placeholder={placeholder}
            invalid={invalid}
        />
    </div>
);

const ImplementationActions: React.FC<ImplementationActionsProps> = ({ lfiData, updateLfiData, onNext, onPrev }) => {
    return (
        <div className="animate-fade-in text-gray-900 dark:text-gray-100 max-w-4xl mx-auto">
            <div className="mb-6 text-center">
                <span className="inline-block px-3 py-1 mb-2 text-xs font-bold tracking-wider text-emerald-700 uppercase bg-emerald-100 dark:bg-emerald-900/50 dark:text-emerald-300 rounded-full">
                    Step 5 of 6
                </span>
                <h2 className="text-xl md:text-2xl font-extrabold mb-2 font-heading">Take Action</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    How are we fixing this? Define the immediate containment, the specific corrective fix, and the broader systemic improvement.
                </p>
            </div>

            <ActionTextarea
                id="immediateAction"
                label="1. Immediate Action (Containment)"
                desc="What was done to stop the bleeding immediately?"
                value={lfiData.immediateAction}
                onChange={e => updateLfiData({ immediateAction: e.target.value })}
                placeholder="E.g., Quarantined Lot #XYZ and notified customers of potential delay..."
                invalid={lfiData.immediateAction.trim().length === 0}
            />

            <ActionTextarea
                id="correctiveAction"
                label="2. Corrective Action (The Fix)"
                desc="How will you fix the specific root cause? Be specific with WHO and WHEN."
                value={lfiData.correctiveAction}
                onChange={e => updateLfiData({ correctiveAction: e.target.value })}
                placeholder="E.g., Update SOP-123 to add verification scan. Owner: J. Doe. Due: 11/15/26..."
                invalid={lfiData.correctiveAction.trim().length === 0}
            />

            <ActionTextarea
                id="systemicAction"
                label="3. Systemic Improvement (The Prevention)"
                desc="What system change prevents this type of issue ANYWHERE else in the business?"
                value={lfiData.systemicAction}
                onChange={e => updateLfiData({ systemicAction: e.target.value })}
                placeholder="E.g., Audit all 25 SOPs for similar verification gaps. Owner: QA. Due: Q1 2027..."
                invalid={lfiData.systemicAction.trim().length === 0}
            />

            <div className="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-400 p-4 rounded-r-2xl my-5">
                <h4 className="font-extrabold text-emerald-800 dark:text-emerald-300 text-sm mb-1.5 flex items-center gap-2">
                    <span className="text-lg">✨</span> Be SMART (Specific, Measurable, Actionable, Relevant, Time-bound)
                </h4>
                <div className="text-gray-800 dark:text-gray-200 space-y-2.5 text-sm bg-white/50 dark:bg-black/20 p-3.5 rounded-xl">
                    <p className="flex items-start gap-3">
                        <strong className="text-rose-600 dark:text-rose-400 font-bold whitespace-nowrap pt-1">❌ Vague:</strong>
                        <span className="italic">"Fix the maintenance procedure."</span>
                    </p>
                    <p className="flex items-start gap-3">
                        <strong className="text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap pt-1">✅ SMART:</strong>
                        <span className="italic font-bold">"Update SOP-M-442 to add barcode scan verification (Sec 4.2). Owner: J. Smith. Due: 11/15/2026."</span>
                    </p>
                </div>
            </div>

            <SectionControls
                onPrev={onPrev}
                onNext={onNext}
                nextDisabled={lfiData.immediateAction.length < 5 || lfiData.correctiveAction.length < 5 || lfiData.systemicAction.length < 5}
            />
        </div>
    );
};

export default ImplementationActions;
