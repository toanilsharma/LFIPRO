import React from 'react';
import { LfiData } from '../../types';
import SectionControls from '../ui/SectionControls';
import RiskMatrix from '../RiskMatrix';
import MarkdownTextarea from '../ui/MarkdownTextarea';

interface PreventionProps {
    lfiData: LfiData;
    updateLfiData: (data: Partial<LfiData>) => void;
    onNext: () => void;
    onPrev: () => void;
}

const getLikelihoodLabel = (val: number) => {
    switch (val) {
        case 1: return "1 - Rare (1/yr)";
        case 2: return "2 - Unlikely (1/qtr)";
        case 3: return "3 - Possible (1/mo)";
        case 4: return "4 - Likely (1/wk)";
        case 5: return "5 - Certain (Daily)";
        default: return "";
    }
};

const getSeverityLabel = (val: number) => {
    switch (val) {
        case 1: return "1 - Negligible";
        case 2: return "2 - Minor";
        case 3: return "3 - Moderate";
        case 4: return "4 - Major";
        case 5: return "5 - Catastrophic";
        default: return "";
    }
};

const RiskSlider: React.FC<{ label: string, value: number, onChange: (val: number) => void }> = ({ label, value, onChange }) => {
    const isSeverity = label.toLowerCase().includes('severity');
    const tooltipText = isSeverity ? getSeverityLabel(value) : getLikelihoodLabel(value);

    return (
        <div className="flex flex-col bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm relative group hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-3 flex items-center justify-between">
                {label}
                <div className="flex bg-indigo-50 dark:bg-indigo-900/40 rounded-lg px-2.5 py-1 items-center gap-2 border border-indigo-100 dark:border-indigo-800/50">
                    <span className="font-extrabold text-indigo-700 dark:text-indigo-300 text-base leading-none">{value}</span>
                    <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wide border-l border-indigo-200 dark:border-indigo-700/50 pl-2 leading-none">
                        {tooltipText.split(' - ')[1]}
                    </span>
                </div>
            </label>
            <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value, 10))}
                className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
            />
            <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-3 font-semibold px-1">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
            </div>
        </div>
    );
};


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

            <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 md:p-5 my-5 shadow-inner">
                <h4 className="font-extrabold text-lg text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                    📊 Risk Assessment Matrix
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-5 font-medium">Use the sliders to visualize the impact of your improvements. (1 = Very Low, 5 = Very High)</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-5">
                        <h5 className="font-bold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2 uppercase tracking-wider text-[10px]">Interactive Risk Sliders</h5>
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
