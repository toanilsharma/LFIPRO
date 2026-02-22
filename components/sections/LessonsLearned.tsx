import React from 'react';
import { LfiData } from '../../types';
import SectionControls from '../ui/SectionControls';
import MarkdownTextarea from '../ui/MarkdownTextarea';

interface LessonsLearnedProps {
    lfiData: LfiData;
    updateLfiData: (data: Partial<LfiData>) => void;
    onNext: () => void;
    onPrev: () => void;
}

const LessonsLearned: React.FC<LessonsLearnedProps> = ({ lfiData, updateLfiData, onNext, onPrev }) => {

    const getSmartLessonExample = (template: string | null) => {
        switch (template) {
            case 'iso9001':
                return {
                    rootCause: '"Process SOP lacked a verification step..."',
                    lesson: '"Critical manual process steps require mandatory, independent verification (ISO 9001:2015 Clause 8.5.1)."'
                };
            case 'apqp':
                return {
                    rootCause: '"DFMEA did not anticipate thermal expansion at junction X..."',
                    lesson: '"Thermal expansion parameters must be explicitly modeled in Phase 2 of the APQP process for all future high-heat assemblies."'
                };
            case 'sixsigma':
                return {
                    rootCause: '"Tool wear rate caused dimension Z to drift out of upper control limit..."',
                    lesson: '"Statistical Process Control (SPC) charting frequency must be inversely proportional to the historical tool wear rate."'
                };
            case 'a3':
                return {
                    rootCause: '"Operators lacked visual indicators for torque limits..."',
                    lesson: '"Visual Management (Andon/Poka-Yoke) is required for all torque-sensitive assembly stations to prevent over-tightening."'
                };
            default:
                return {
                    rootCause: '"Process SOP lacked a verification step..."',
                    lesson: '"Critical manual process steps require mandatory, independent verification to mitigate human error."'
                };
        }
    };
    const smartExample = getSmartLessonExample(lfiData.template);

    const handleLessonChange = (index: number, value: string) => {
        const newLessons = [...lfiData.lessons] as [string, string, string];
        newLessons[index] = value;
        updateLfiData({ lessons: newLessons });
    };

    return (
        <div className="animate-fade-in text-gray-900 dark:text-gray-100 max-w-4xl mx-auto">
            <div className="mb-6 text-center">
                <span className="inline-block px-3 py-1 mb-2 text-xs font-bold tracking-wider text-amber-700 uppercase bg-amber-100 dark:bg-amber-900/50 dark:text-amber-300 rounded-full">
                    Step 4 of 6
                </span>
                <h2 className="text-xl md:text-2xl font-extrabold mb-2 font-heading">Capture Lessons Learned</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    What did this incident teach us? A good lesson is a general principle that can be applied elsewhere.
                </p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-4 rounded-r-2xl mb-6">
                <h4 className="font-extrabold text-amber-800 dark:text-amber-300 text-sm mb-1.5 flex items-center gap-2">
                    <span className="text-lg">💡</span> Pro Tip: From Root Cause to Lesson
                </h4>
                <div className="text-gray-800 dark:text-gray-200 space-y-2.5 text-sm bg-white/50 dark:bg-black/20 p-3.5 rounded-xl">
                    <p className="flex items-start gap-3">
                        <strong className="text-rose-600 dark:text-rose-400 font-bold whitespace-nowrap pt-1">The Root Cause:</strong>
                        <span className="italic">{smartExample.rootCause}</span>
                    </p>
                    <p className="flex items-start gap-3">
                        <strong className="text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap pt-1">The Lesson:</strong>
                        <span className="italic font-bold">{smartExample.lesson}</span>
                    </p>
                </div>
            </div>

            {[0, 1, 2].map(index => (
                <div key={index} className="mb-5 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:border-amber-300 dark:hover:border-amber-600 transition-colors">
                    <label htmlFor={`lesson${index + 1}`} className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1.5 block">
                        Key Lesson #{index + 1} {index === 0 && <span className="text-rose-500 ml-1" title="Required">*</span>}
                    </label>
                    <p className="text-gray-500 dark:text-gray-400 mb-2.5 text-[10px] font-medium">
                        {index === 0
                            ? "What is the primary transferable insight?"
                            : index === 1
                                ? "What is a secondary insight or observation?"
                                : "Any additional best practices learned?"}
                    </p>
                    <MarkdownTextarea
                        id={`lesson${index + 1}`}
                        minRows={4}
                        value={lfiData.lessons[index]}
                        onChange={e => handleLessonChange(index, e.target.value)}
                        placeholder="Type your lesson here..."
                    />
                </div>
            ))}

            <SectionControls onPrev={onPrev} onNext={onNext} nextDisabled={lfiData.lessons[0].length < 10} />
        </div>
    );
};

export default LessonsLearned;
