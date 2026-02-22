import React, { useState } from 'react';
import { LfiData } from '../../types';
import SectionControls from '../ui/SectionControls';
import FiveWhysGraph from '../FiveWhysGraph';
import FishboneGraph from '../ui/FishboneGraph';
import MarkdownTextarea from '../ui/MarkdownTextarea';

interface RootCauseProps {
    lfiData: LfiData;
    updateLfiData: (data: Partial<LfiData>) => void;
    onNext: () => void;
    onPrev: () => void;
}

const RootCause: React.FC<RootCauseProps> = ({ lfiData, updateLfiData, onNext, onPrev }) => {
    const [rcaView, setRcaView] = useState<'5why' | 'fishbone'>('5why');
    return (
        <div className="animate-fade-in text-gray-900 dark:text-gray-100 max-w-4xl mx-auto">
            <div className="mb-8 text-center">
                <span className="inline-block px-4 py-1.5 mb-3 text-sm font-bold tracking-wider text-rose-700 uppercase bg-rose-100 dark:bg-rose-900/50 dark:text-rose-300 rounded-full">
                    Step 3 of 6
                </span>
                <h2 className="text-xl md:text-2xl font-extrabold mb-2 font-heading">Find the Root Cause</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Why did the problem happen? Dig deep past the symptoms to find the failure in the system.
                </p>
            </div>

            {lfiData.incidentComplexity === 'minor' && (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 text-emerald-800 dark:text-emerald-200 p-4 rounded-r-2xl mb-6 shadow-sm flex items-start gap-4">
                    <span className="text-xl">⚡</span>
                    <div>
                        <p className="font-bold mb-1">Minor Issue Mode</p>
                        <p className="text-sm">Formal Root Cause Analysis (5-Whys/Fishbone) is bypassed for minor issues. Please summarize the known cause below.</p>
                    </div>
                </div>
            )}

            {lfiData.incidentComplexity !== 'minor' && (
                <>
                    <div className="mb-6 p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:border-rose-300 dark:hover:border-rose-600 transition-colors">
                        <label htmlFor="rcaMethod" className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 block">RCA Method Used</label>
                        <p className="text-gray-500 dark:text-gray-400 mb-3 text-xs font-medium">Which tool did you use to find the root cause?</p>
                        <select
                            id="rcaMethod"
                            value={lfiData.rcaMethod}
                            onChange={e => updateLfiData({ rcaMethod: e.target.value })}
                            className={`w-full p-3 border-2 outline-none rounded-xl text-base font-semibold transition-all duration-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20 ${!lfiData.rcaMethod ? 'bg-rose-50/50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800/60 text-rose-500/70' : 'bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white'}`}
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

                    <div className="mb-10">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-2 gap-3">
                            <label className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                <span className="text-rose-500">🎯</span> {rcaView === '5why' ? 'Interactive 5-Whys Builder' : 'Ishikawa (Fishbone) Diagram'}
                            </label>
                            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                                <button
                                    onClick={() => setRcaView('5why')}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${rcaView === '5why' ? 'bg-white dark:bg-gray-600 text-rose-600 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'}`}
                                >
                                    <span className="mr-1">⛓️</span> 5-Whys
                                </button>
                                <button
                                    onClick={() => setRcaView('fishbone')}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${rcaView === 'fishbone' ? 'bg-white dark:bg-gray-600 text-rose-600 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'}`}
                                >
                                    <span className="mr-1">🐟</span> Fishbone
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 mb-5 text-xs font-medium">
                            {rcaView === '5why'
                                ? 'Map out the causal chain layer by layer. The final node will populate your True Root Cause.'
                                : 'Categorize potential causes into the 6 M\'s. Review the diagram to identify the systemic process failure.'}
                        </p>

                        {rcaView === '5why' ? (
                            <FiveWhysGraph
                                initialRootCause={lfiData.rootCause}
                                onRootCauseChange={(value) => updateLfiData({ rootCause: value })}
                            />
                        ) : (
                            <FishboneGraph
                                data={lfiData.fishboneData!}
                                onChange={(data) => updateLfiData({ fishboneData: data })}
                            />
                        )}
                    </div>
                </>
            )}

            <div className="mb-6 p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:border-rose-300 dark:hover:border-rose-600 transition-colors">
                <label htmlFor="rootCause" className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 block">The True Root Cause <span className="text-rose-500" title="Required">*</span></label>
                <p className="text-gray-500 dark:text-gray-400 mb-3 text-xs font-medium">Describe the fundamental reason WHY the problem occurred. Focus on the process failing, not the person failing. (This is synced with your 5-Whys graph).</p>
                <MarkdownTextarea
                    id="rootCause"
                    minRows={6}
                    value={lfiData.rootCause}
                    onChange={e => updateLfiData({ rootCause: e.target.value })}
                    placeholder="E.g., The system allowed X to happen because Y was missing..."
                    invalid={lfiData.rootCause.trim().length === 0}
                />
            </div>

            <div className="bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-400 p-4 rounded-r-2xl my-5">
                <h4 className="font-extrabold text-rose-800 dark:text-rose-300 text-sm mb-2 flex items-center gap-2">
                    <span className="text-lg">⚠️</span> Find the System, Not the Person
                </h4>
                <div className="text-gray-800 dark:text-gray-200 space-y-2.5 text-sm bg-white/50 dark:bg-black/20 p-3.5 rounded-xl">
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
