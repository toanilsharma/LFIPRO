import React from 'react';
import { LfiData } from '../../types';
import SectionControls from '../ui/SectionControls';
import RiskMatrix from '../RiskMatrix';
import MarkdownTextarea from '../ui/MarkdownTextarea';
import { Settings, X } from 'lucide-react';

interface PreventionProps {
    lfiData: LfiData;
    updateLfiData: (data: Partial<LfiData>) => void;
    onNext: () => void;
    onPrev: () => void;
}

const RiskSlider: React.FC<{ label: string, value: number, max: number, labels: string[], onChange: (val: number) => void }> = ({ label, value, max, labels, onChange }) => {
    const tooltipText = labels[value - 1] || value.toString();

    return (
        <div className="flex flex-col bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm relative group hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-3 flex items-center justify-between">
                {label}
                <div className="flex bg-indigo-50 dark:bg-indigo-900/40 rounded-lg px-2.5 py-1 items-center gap-2 border border-indigo-100 dark:border-indigo-800/50">
                    <span className="font-extrabold text-indigo-700 dark:text-indigo-300 text-base leading-none">{value}</span>
                    <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wide border-l border-indigo-200 dark:border-indigo-700/50 pl-2 leading-none max-w-[100px] truncate text-right">
                        {tooltipText.split(' - ')[1] || tooltipText}
                    </span>
                </div>
            </label>
            <input
                type="range"
                min="1"
                max={max}
                step="1"
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value, 10))}
                className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
            />
            <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-3 font-semibold px-1">
                {Array.from({ length: max }).map((_, i) => (
                    <span key={i}>{i + 1}</span>
                ))}
            </div>
        </div>
    );
};


const Prevention: React.FC<PreventionProps> = ({ lfiData, updateLfiData, onNext, onPrev }) => {
    const [showSettings, setShowSettings] = React.useState(false);

    const handleRiskChange = (field: 'beforeSeverity' | 'beforeLikelihood' | 'afterLikelihood', value: number) => {
        updateLfiData({
            riskAssessment: {
                beforeSeverity: 1,
                beforeLikelihood: 1,
                afterLikelihood: 1,
                ...lfiData.riskAssessment,
                [field]: value
            }
        });
    };

    const riskData = lfiData.riskAssessment || { beforeSeverity: 1, beforeLikelihood: 1, afterLikelihood: 1 };
    const matrixConfig = lfiData.matrixConfig || {
        size: 5,
        severityLabels: ['1 - Negligible', '2 - Minor', '3 - Moderate', '4 - Major', '5 - Catastrophic'],
        likelihoodLabels: ['1 - Rare', '2 - Unlikely', '3 - Possible', '4 - Likely', '5 - Certain']
    };

    const handleConfigChange = (changes: Partial<typeof matrixConfig>) => {
        const newSize = changes.size || matrixConfig.size;

        let newSevLabels = [...(changes.severityLabels || matrixConfig.severityLabels)];
        let newLikLabels = [...(changes.likelihoodLabels || matrixConfig.likelihoodLabels)];

        if (changes.size) {
            // Adjust label array length to match new size
            while (newSevLabels.length < newSize) newSevLabels.push(`${newSevLabels.length + 1} - Level ${newSevLabels.length + 1}`);
            while (newLikLabels.length < newSize) newLikLabels.push(`${newLikLabels.length + 1} - Level ${newLikLabels.length + 1}`);
            newSevLabels = newSevLabels.slice(0, newSize);
            newLikLabels = newLikLabels.slice(0, newSize);
        }

        updateLfiData({
            matrixConfig: { ...matrixConfig, ...changes, severityLabels: newSevLabels, likelihoodLabels: newLikLabels },
            // Clamp internal risk values to new size if needed
            riskAssessment: {
                ...riskData,
                beforeSeverity: Math.min(riskData.beforeSeverity, newSize),
                beforeLikelihood: Math.min(riskData.beforeLikelihood, newSize),
                afterLikelihood: Math.min(riskData.afterLikelihood, newSize),
            }
        });
    };

    return (
        <div className="animate-fade-in text-gray-900 dark:text-gray-100 max-w-4xl mx-auto">
            <div className="mb-6 text-center">
                <span className="inline-block px-3 py-1 mb-2 text-xs font-bold tracking-wider text-teal-700 uppercase bg-teal-100 dark:bg-teal-900/50 dark:text-teal-300 rounded-full">
                    Step 6 of 6
                </span>
                <h2 className="text-xl md:text-2xl font-extrabold mb-2 font-heading">Prevention & Validation</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    How do we know the fix actually worked, and where else should it be applied?
                </p>
            </div>

            <div className="mb-5 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:border-teal-300 dark:hover:border-teal-600 transition-colors">
                <label htmlFor="validation" className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1 block">
                    How will you verify effectiveness? <span className="text-rose-500 ml-1" title="Required">*</span>
                </label>
                <p className="text-gray-500 dark:text-gray-400 mb-2.5 text-[10px] font-medium">How will you measure success? Be specific and concise.</p>
                <MarkdownTextarea
                    id="validation"
                    minRows={4}
                    value={lfiData.validation}
                    onChange={e => updateLfiData({ validation: e.target.value })}
                    placeholder="E.g., Track Line 3 defect rate for 90 days. Target: <0.1%. Audit SOP compliance weekly..."
                    invalid={lfiData.validation.trim().length === 0}
                />
            </div>

            <div className="mb-5 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:border-teal-300 dark:hover:border-teal-600 transition-colors">
                <label htmlFor="horizontal" className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1 block">
                    Horizontal Deployment Plan <span className="text-rose-500 ml-1" title="Required">*</span>
                </label>
                <p className="text-gray-500 dark:text-gray-400 mb-2.5 text-[10px] font-medium">Where else in the company will this fix be applied to prevent identical failures?</p>
                <MarkdownTextarea
                    id="horizontal"
                    minRows={4}
                    value={lfiData.horizontal}
                    onChange={e => updateLfiData({ horizontal: e.target.value })}
                    placeholder="E.g., Roll out updated SOP to Lines 4 & 5 by EOY. Review all similar processes in Plant B..."
                    invalid={lfiData.horizontal.trim().length === 0}
                />
            </div>

            {lfiData.incidentComplexity === 'minor' && (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 text-emerald-800 dark:text-emerald-200 p-4 rounded-r-2xl my-5 shadow-sm flex items-start gap-4">
                    <span className="text-xl">⚡</span>
                    <div>
                        <p className="font-bold mb-1">Minor Issue Mode</p>
                        <p className="text-sm">The detailed Interactive Risk Matrix evaluates systemic risk reduction. This step is bypassed for minor issues.</p>
                    </div>
                </div>
            )}

            {lfiData.incidentComplexity !== 'minor' && (
                <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 md:p-5 my-5 shadow-inner">
                    <div className="flex justify-between items-center mb-5 border-b border-gray-200 dark:border-gray-700 pb-2">
                        <h4 className="font-extrabold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                            <span className="text-indigo-500">📊</span> Interactive Risk Matrix
                        </h4>
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${showSettings ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'}`}
                        >
                            <Settings size={16} />
                            {showSettings ? 'Hide Config' : 'Configure Matrix'}
                        </button>
                    </div>

                    {showSettings && (
                        <div className="mb-8 p-4 bg-white dark:bg-gray-900 rounded-xl border border-indigo-200 dark:border-indigo-800/50 shadow-sm animate-fade-in relative">
                            <h5 className="font-bold text-gray-800 dark:text-gray-200 mb-4 uppercase tracking-wider text-xs">Matrix Configuration</h5>
                            <div className="mb-4">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 block">Matrix Size</label>
                                <select
                                    value={matrixConfig.size}
                                    onChange={e => handleConfigChange({ size: parseInt(e.target.value, 10) as 3 | 4 | 5 })}
                                    className="p-2 border rounded-lg bg-gray-50 border-gray-300 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value={3}>3x3 (Simple)</option>
                                    <option value={4}>4x4 (Standard)</option>
                                    <option value={5}>5x5 (Detailed)</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 block">Severity Labels (1 to {matrixConfig.size})</label>
                                    {matrixConfig.severityLabels.map((label, idx) => (
                                        <input
                                            key={`sev-${idx}`}
                                            type="text"
                                            value={label}
                                            onChange={e => {
                                                const newLabels = [...matrixConfig.severityLabels];
                                                newLabels[idx] = e.target.value;
                                                handleConfigChange({ severityLabels: newLabels });
                                            }}
                                            className="w-full mb-2 p-1.5 text-sm border rounded bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                                        />
                                    ))}
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 block">Likelihood Labels (1 to {matrixConfig.size})</label>
                                    {matrixConfig.likelihoodLabels.map((label, idx) => (
                                        <input
                                            key={`lik-${idx}`}
                                            type="text"
                                            value={label}
                                            onChange={e => {
                                                const newLabels = [...matrixConfig.likelihoodLabels];
                                                newLabels[idx] = e.target.value;
                                                handleConfigChange({ likelihoodLabels: newLabels });
                                            }}
                                            className="w-full mb-2 p-1.5 text-sm border rounded bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-5 font-medium">Use the sliders to visualize the impact of your improvements. (1 = Very Low, {matrixConfig.size} = Very High)</p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="space-y-5">
                            <RiskSlider
                                label="Severity of Impact"
                                value={riskData.beforeSeverity}
                                max={matrixConfig.size}
                                labels={matrixConfig.severityLabels}
                                onChange={(val) => handleRiskChange('beforeSeverity', val)}
                            />
                            <RiskSlider
                                label="Likelihood (Before Fixes)"
                                value={riskData.beforeLikelihood}
                                max={matrixConfig.size}
                                labels={matrixConfig.likelihoodLabels}
                                onChange={(val) => handleRiskChange('beforeLikelihood', val)}
                            />
                            <RiskSlider
                                label="Likelihood (After Fixes)"
                                value={riskData.afterLikelihood}
                                max={matrixConfig.size}
                                labels={matrixConfig.likelihoodLabels}
                                onChange={(val) => handleRiskChange('afterLikelihood', val)}
                            />
                        </div>
                        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex justify-center">
                            <RiskMatrix data={riskData} config={matrixConfig} />
                        </div>
                    </div>
                </div>
            )}

            <SectionControls onPrev={onPrev} onNext={onNext} nextDisabled={lfiData.validation.length < 5 || lfiData.horizontal.length < 5} />
        </div>
    );
};

export default Prevention;
