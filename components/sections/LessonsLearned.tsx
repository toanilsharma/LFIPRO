
import React from 'react';
import { LfiData } from '../../types';
import SectionControls from '../ui/SectionControls';

interface LessonsLearnedProps {
    lfiData: LfiData;
    updateLfiData: (data: Partial<LfiData>) => void;
    onNext: () => void;
    onPrev: () => void;
}

const LessonsLearned: React.FC<LessonsLearnedProps> = ({ lfiData, updateLfiData, onNext, onPrev }) => {
    
    const handleLessonChange = (index: number, value: string) => {
        const newLessons = [...lfiData.lessons] as [string, string, string];
        newLessons[index] = value;
        updateLfiData({ lessons: newLessons });
    };

    return (
        <div>
             <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-r-lg mb-6">
                <h4 className="font-bold text-indigo-800 text-lg mb-2">💡 Pro Tip: From Root Cause to Actionable Lessons</h4>
                <p className="text-sm text-gray-600 mb-4">A good lesson is a general principle that can be applied elsewhere. It connects the 'why' (root cause) to the 'what' (actions).</p>
                <div className="text-gray-700 space-y-2 text-sm">
                     <p>
                        <strong className="text-gray-800 block">If the Root Cause is:</strong>
                        <span className="italic">"Process SOP lacked a verification step..."</span>
                    </p>
                    <p>
                        <strong className="text-green-600 block">A good Lesson Learned is:</strong>
                        <span className="italic">"Critical manual process steps require mandatory, independent verification to mitigate human error."</span>
                    </p>
                     <p className="mt-2">
                        <strong className="text-green-600 block">This leads to a Systemic Action like:</strong>
                        <span className="italic">"Audit all manufacturing SOPs to identify and add verification steps for any critical manual data entry points."</span>
                    </p>
                </div>
            </div>


            {[0, 1, 2].map(index => (
                <div className="mb-6" key={index}>
                    <label htmlFor={`lesson${index + 1}`} className="text-lg font-semibold text-gray-700 mb-2 block">
                        Key Lesson #{index + 1} {index === 0 && <span className="text-red-500">*</span>}
                    </label>
                    <textarea
                        id={`lesson${index + 1}`}
                        value={lfiData.lessons[index]}
                        onChange={e => handleLessonChange(index, e.target.value)}
                        placeholder={
                            index === 0 
                                ? "What is the main transferable insight? (e.g., 'Critical process inputs require automated verification to prevent human error.')"
                                : index === 1
                                ? "What is the secondary insight? (e.g., 'Manual data entry is a high-risk activity that needs procedural safeguards.')"
                                : "What is an additional insight or observation?"
                        }
                        className="w-full min-h-[120px] p-4 border-2 border-gray-200 rounded-xl text-base leading-relaxed resize-vertical transition-all duration-300 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                    />
                </div>
            ))}
            
            <SectionControls onPrev={onPrev} onNext={onNext} />
        </div>
    );
};

export default LessonsLearned;
