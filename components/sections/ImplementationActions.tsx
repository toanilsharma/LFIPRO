
import React from 'react';
import { LfiData } from '../../types';
import SectionControls from '../ui/SectionControls';

interface ImplementationActionsProps {
    lfiData: LfiData;
    updateLfiData: (data: Partial<LfiData>) => void;
    onNext: () => void;
    onPrev: () => void;
}

const ActionTextarea: React.FC<{id: string, label: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; placeholder: string}> = ({id, label, value, onChange, placeholder}) => (
    <div className="mb-6">
        <label htmlFor={id} className="text-lg font-semibold text-gray-700 mb-2 block">{label} <span className="text-red-500">*</span></label>
        <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full min-h-[120px] p-4 border-2 border-gray-200 rounded-xl text-base leading-relaxed resize-vertical transition-all duration-300 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
        />
    </div>
);

const ImplementationActions: React.FC<ImplementationActionsProps> = ({ lfiData, updateLfiData, onNext, onPrev }) => {
    return (
        <div>
            <ActionTextarea 
                id="immediateAction"
                label="Immediate Action"
                value={lfiData.immediateAction}
                onChange={e => updateLfiData({ immediateAction: e.target.value })}
                placeholder="What was done to contain the problem immediately? (e.g., 'Quarantined Lot #XYZ and notified customers of potential delay.')"
            />
            <ActionTextarea 
                id="correctiveAction"
                label="Corrective Action"
                value={lfiData.correctiveAction}
                onChange={e => updateLfiData({ correctiveAction: e.target.value })}
                placeholder="How will you fix the specific root cause? Be SMART. (e.g., 'Update SOP-123 to add verification scan. Owner: J. Doe. Due: 11/15/24.')"
            />
            <ActionTextarea 
                id="systemicAction"
                label="Systemic Improvements"
                value={lfiData.systemicAction}
                onChange={e => updateLfiData({ systemicAction: e.target.value })}
                placeholder="What system change prevents this type of issue elsewhere? (e.g., 'Audit all 25 SOPs for similar verification gaps. Owner: QA. Due: Q1 2025.')"
            />
            
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-r-lg my-6">
                <h4 className="font-bold text-indigo-800 text-lg mb-2">✨ Example: Vague vs. SMART & Concise Action</h4>
                 <div className="text-gray-700 space-y-2">
                    <p><strong className="text-red-600">❌ Vague:</strong> "Fix the maintenance procedure."</p>
                    <p><strong className="text-green-600">✅ SMART & Concise:</strong> "Update SOP-M-442 to add barcode scan verification (Sec 4.2). Owner: J. Smith. Due: 11/15/2024."</p>
                </div>
            </div>

            <SectionControls onPrev={onPrev} onNext={onNext} />
        </div>
    );
};

export default ImplementationActions;
