import React from 'react';
import { LfiData } from '../../types';
import SectionControls from '../ui/SectionControls';
import RiskMatrix from '../RiskMatrix';

interface PreventionProps {
    lfiData: LfiData;
    updateLfiData: (data: Partial<LfiData>) => void;
    onNext: () => void;
    onPrev: () => void;
}

const RiskSlider: React.FC<{ label: string, value: number, onChange: (val: number) => void }> = ({ label, value, onChange }) => (
    <div className="flex flex-col bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <label className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-3 flex justify-between">
            {label}
            <span className="font-exrabold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/50 px-3 py-0.5 rounded-full">{value}</span>
        </label>
        <input
            type="range"
            min="1"
            max="5"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value, 10))}
            className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400"
        />
        <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-2 font-medium px-1">
            <span>Low (1)</span>
            <span>High (5)</span>
        </div>
    </div>
);


const Prevention: React.FC<PreventionProps> = ({ lfiData, updateLfiData, onNext, onPrev }) => {

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

    return (
        <div className="animate-fade-in text-gray-900 dark:text-gray-100 max-w-4xl mx-auto">
            <div className="mb-10 text-center">
                <span className="inline-block px-4 py-1.5 mb-4 text-sm font-bold tracking-wider text-teal-700 uppercase bg-teal-100 dark:bg-teal-900/50 dark:text-teal-300 rounded-full">
                    Step 6 of 7
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-heading">Prevention & Validation</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    How do we know the fix actually worked, and where else should it be applied?
                </p>
            </div>

            <div className="mb-8 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:border-teal-300 dark:hover:border-teal-600 transition-colors">
                <label htmlFor="validation" className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 block">
                    How will you verify effectiveness? <span className="text-rose-500 ml-1" title="Required">*</span>
                </label>
                <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm font-medium">How will you measure success? Be specific and concise.</p>
                <textarea
                    id="validation"
                    value={lfiData.validation}
                    onChange={e => updateLfiData({ validation: e.target.value })}
                    placeholder="E.g., Track Line 3 defect rate for 90 days. Target: <0.1%. Audit SOP compliance weekly..."
                    className="w-full min-h-[140px] p-4 border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl text-lg resize-vertical transition-all duration-300 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20"
                />
            </div>

            <div className="mb-8 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:border-teal-300 dark:hover:border-teal-600 transition-colors">
                <label htmlFor="horizontal" className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 block">
                    Horizontal Deployment Plan <span className="text-rose-500 ml-1" title="Required">*</span>
                </label>
                <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm font-medium">Where else in the company will this fix be applied to prevent identical failures?</p>
                <textarea
                    id="horizontal"
                    value={lfiData.horizontal}
                    onChange={e => updateLfiData({ horizontal: e.target.value })}
                    placeholder="E.g., Roll out updated SOP to Lines 4 & 5 by EOY. Review all similar processes in Plant B..."
                    className="w-full min-h-[140px] p-4 border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl text-lg resize-vertical transition-all duration-300 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20"
                />
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 md:p-8 my-8 shadow-inner">
                <h4 className="font-extrabold text-2xl text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    📊 Risk Assessment Matrix
                </h4>
                <p className="text-base text-gray-600 dark:text-gray-400 mb-8 font-medium">Use the sliders to visualize the impact of your improvements. (1 = Very Low, 5 = Very High)</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6">
                        <h5 className="font-bold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-3 uppercase tracking-wider text-sm">Interactive Risk Sliders</h5>
                        <RiskSlider
                            label="Severity of Impact"
                            value={riskData.beforeSeverity}
                            onChange={(val) => handleRiskChange('beforeSeverity', val)}
                        />
                        <RiskSlider
                            label="Likelihood (Before Fixes)"
                            value={riskData.beforeLikelihood}
                            onChange={(val) => handleRiskChange('beforeLikelihood', val)}
                        />
                        <RiskSlider
                            label="Likelihood (After Fixes)"
                            value={riskData.afterLikelihood}
                            onChange={(val) => handleRiskChange('afterLikelihood', val)}
                        />
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex justify-center">
                        <RiskMatrix data={riskData} />
                    </div>
                </div>
            </div>

            <SectionControls onPrev={onPrev} onNext={onNext} nextDisabled={lfiData.validation.length < 5 || lfiData.horizontal.length < 5} />
        </div>
    );
};

export default Prevention;
