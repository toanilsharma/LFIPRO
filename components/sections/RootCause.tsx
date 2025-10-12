
import React from 'react';
import { LfiData } from '../../types';
import SectionControls from '../ui/SectionControls';

interface RootCauseProps {
    lfiData: LfiData;
    updateLfiData: (data: Partial<LfiData>) => void;
    onNext: () => void;
    onPrev: () => void;
}

const RootCause: React.FC<RootCauseProps> = ({ lfiData, updateLfiData, onNext, onPrev }) => {
    return (
        <div>
            <div className="mb-6">
                <label htmlFor="rcaMethod" className="text-lg font-semibold text-gray-700 mb-2 block">RCA Method Used</label>
                <select 
                    id="rcaMethod" 
                    value={lfiData.rcaMethod}
                    onChange={e => updateLfiData({ rcaMethod: e.target.value })}
                    className="w-full p-4 border-2 bg-white border-gray-200 rounded-xl text-base leading-relaxed transition-all duration-300 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                >
                    <option value="">Select the method you used...</option>
                    <option value="5Why">5 Why Analysis</option>
                    <option value="Fishbone">Fishbone Diagram (Ishikawa)</option>
                    <option value="FTA">Fault Tree Analysis</option>
                    <option value="Pareto">Pareto Analysis</option>
                    <option value="FMEA">Failure Mode & Effects Analysis (FMEA)</option>
                    <option value="8D">8D Problem Solving</option>
                    <option value="Other">Other Method</option>
                </select>
            </div>
            
            <div className="mb-6">
                <label htmlFor="rootCause" className="text-lg font-semibold text-gray-700 mb-2 block">Root Cause Identified <span className="text-red-500">*</span></label>
                <textarea 
                    id="rootCause" 
                    value={lfiData.rootCause}
                    onChange={e => updateLfiData({ rootCause: e.target.value })}
                    placeholder="Describe the fundamental SYSTEMIC reason WHY the problem occurred. Aim for ~40-80 words. Focus on process, not people."
                    className="w-full min-h-[180px] p-4 border-2 border-gray-200 rounded-xl text-base leading-relaxed resize-vertical transition-all duration-300 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                />
            </div>
            
             <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-r-lg my-6">
                <h4 className="font-bold text-indigo-800 text-lg mb-2">✨ Find the System, Not the Person</h4>
                <div className="text-gray-700 space-y-2 text-sm">
                    <p><strong className="text-red-600">❌ Personal Cause (Weak):</strong> "The operator installed the wrong sensor."</p>
                    <p><strong className="text-green-600">✅ Systemic Cause (Strong):</strong> "The maintenance SOP lacked a verification step to ensure the correct sensor part number was installed. This process gap allowed for human error to go undetected."</p>
                </div>
            </div>


            <SectionControls onPrev={onPrev} onNext={onNext} />
        </div>
    );
};

export default RootCause;
