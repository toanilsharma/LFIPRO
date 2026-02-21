import React from 'react';
import { LfiData } from '../../types';
import SectionControls from '../ui/SectionControls';
import FiveWhysGraph from '../FiveWhysGraph';

interface RootCauseProps {
    lfiData: LfiData;
    updateLfiData: (data: Partial<LfiData>) => void;
    onNext: () => void;
    onPrev: () => void;
}

const RootCause: React.FC<RootCauseProps> = ({ lfiData, updateLfiData, onNext, onPrev }) => {
    return (
        <div className="animate-fade-in text-gray-900 dark:text-gray-100 max-w-4xl mx-auto">
            <div className="mb-10 text-center">
                <span className="inline-block px-4 py-1.5 mb-4 text-sm font-bold tracking-wider text-rose-700 uppercase bg-rose-100 dark:bg-rose-900/50 dark:text-rose-300 rounded-full">
                    Step 3 of 6
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-heading">Find the Root Cause</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Why did the problem happen? Dig deep past the symptoms to find the failure in the system.
                </p>
            </div>

            <div className="mb-8 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:border-rose-300 dark:hover:border-rose-600 transition-colors">
                <label htmlFor="rcaMethod" className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 block">RCA Method Used</label>
                <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm font-medium">Which tool did you use to find the root cause?</p>
                <select
                    id="rcaMethod"
                    value={lfiData.rcaMethod}
                    onChange={e => updateLfiData({ rcaMethod: e.target.value })}
                    className="w-full p-4 border-2 outline-none bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded-xl text-lg font-semibold text-gray-900 dark:text-white transition-all duration-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20"
                >
                    <option value="">Choose a method...</option>
                    <option value="5Why">5 Why Analysis (Easiest)</option>
                    <option value="Fishbone">Fishbone Diagram / Ishikawa (Best for complex issues)</option>
                    <option value="FTA">Fault Tree Analysis</option>
                    <option value="Pareto">Pareto Analysis</option>
                    <option value="FMEA">Failure Mode & Effects Analysis (FMEA)</option>
                    <option value="8D">8D Problem Solving</option>
                    <option value="Other">Other Method</option>
                </select>
            </div>

            <div className="mb-12">
                <label className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 block flex items-center gap-2">
                    <span className="text-rose-500">🎯</span> Interactive 5-Whys Builder
                </label>
                <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm font-medium">Map out the causal chain layer by layer. The final node will automatically populate your True Root Cause.</p>
                <FiveWhysGraph
                    initialRootCause={lfiData.rootCause}
                    onRootCauseChange={(value) => updateLfiData({ rootCause: value })}
                />
            </div>

            <div className="mb-8 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:border-rose-300 dark:hover:border-rose-600 transition-colors">
                <label htmlFor="rootCause" className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 block">The True Root Cause <span className="text-rose-500" title="Required">*</span></label>
                <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm font-medium">Describe the fundamental reason WHY the problem occurred. Focus on the process failing, not the person failing. (This is synced with your 5-Whys graph).</p>
                <textarea
                    id="rootCause"
                    value={lfiData.rootCause}
                    onChange={e => updateLfiData({ rootCause: e.target.value })}
                    placeholder="E.g., The system allowed X to happen because Y was missing..."
                    className="w-full min-h-[200px] p-4 border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl text-lg resize-vertical transition-all duration-300 focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20"
                />
            </div>

            <div className="bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-400 p-6 rounded-r-2xl my-8">
                <h4 className="font-extrabold text-rose-800 dark:text-rose-300 text-lg mb-4 flex items-center gap-2">
                    <span className="text-2xl">⚠️</span> Find the System, Not the Person
                </h4>
                <div className="text-gray-800 dark:text-gray-200 space-y-4 text-base bg-white/50 dark:bg-black/20 p-5 rounded-xl">
                    <p className="flex items-start gap-3">
                        <strong className="text-red-600 dark:text-red-400 font-bold whitespace-nowrap pt-1">❌ Bad (Blames People):</strong>
                        <span className="italic">"The operator installed the wrong sensor."</span>
                    </p>
                    <p className="flex items-start gap-3">
                        <strong className="text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap pt-1">✅ Good (Blames Process):</strong>
                        <span className="italic">"The maintenance manual lacked a verification step to ensure the correct sensor part number was installed. This process gap allowed human error to occur."</span>
                    </p>
                </div>
            </div>

            <SectionControls onPrev={onPrev} onNext={onNext} nextDisabled={lfiData.rootCause.length < 10} />
        </div>
    );
};

export default RootCause;
