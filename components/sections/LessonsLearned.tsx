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
        <div className="animate-fade-in text-gray-900 dark:text-gray-100 max-w-4xl mx-auto">
            <div className="mb-10 text-center">
                <span className="inline-block px-4 py-1.5 mb-4 text-sm font-bold tracking-wider text-amber-700 uppercase bg-amber-100 dark:bg-amber-900/50 dark:text-amber-300 rounded-full">
                    Step 4 of 6
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-heading">Capture Lessons Learned</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    What did this incident teach us? A good lesson is a general principle that can be applied elsewhere.
                </p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-6 rounded-r-2xl mb-8">
                <h4 className="font-extrabold text-amber-800 dark:text-amber-300 text-lg mb-3 flex items-center gap-2">
                    <span className="text-2xl">💡</span> Pro Tip: From Root Cause to Lesson
                </h4>
                <div className="text-gray-800 dark:text-gray-200 space-y-4 text-base bg-white/50 dark:bg-black/20 p-5 rounded-xl">
                    <p className="flex items-start gap-3">
                        <strong className="text-rose-600 dark:text-rose-400 font-bold whitespace-nowrap pt-1">The Root Cause:</strong>
                        <span className="italic">"Process SOP lacked a verification step..."</span>
                    </p>
                    <p className="flex items-start gap-3">
                        <strong className="text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap pt-1">The Lesson:</strong>
                        <span className="italic font-bold">"Critical manual process steps require mandatory, independent verification to mitigate human error."</span>
                    </p>
                </div>
            </div>

            {[0, 1, 2].map(index => (
                <div key={index} className="mb-8 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:border-amber-300 dark:hover:border-amber-600 transition-colors">
                    <label htmlFor={`lesson${index + 1}`} className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 block">
                        Key Lesson #{index + 1} {index === 0 && <span className="text-rose-500 ml-1" title="Required">*</span>}
                    </label>
                    <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm font-medium">
                        {index === 0
                            ? "What is the primary transferable insight?"
                            : index === 1
                                ? "What is a secondary insight or observation?"
                                : "Any additional best practices learned?"}
                    </p>
                    <textarea
                        id={`lesson${index + 1}`}
                        value={lfiData.lessons[index]}
                        onChange={e => handleLessonChange(index, e.target.value)}
                        placeholder="Type your lesson here..."
                        className="w-full min-h-[140px] p-4 border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl text-lg resize-vertical transition-all duration-300 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20"
                    />
                </div>
            ))}

            <SectionControls onPrev={onPrev} onNext={onNext} nextDisabled={lfiData.lessons[0].length < 10} />
        </div>
    );
};

export default LessonsLearned;
