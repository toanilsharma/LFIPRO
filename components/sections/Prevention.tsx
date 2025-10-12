
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

const RiskSlider: React.FC<{label: string, value: number, onChange: (val: number) => void}> = ({ label, value, onChange }) => (
    <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-700">{label}: <span className="font-bold text-indigo-600">{value}</span></label>
        <input 
            type="range"
            min="1"
            max="5"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
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
        <div>
            <div className="mb-6">
                <label htmlFor="validation" className="text-lg font-semibold text-gray-700 mb-2 block">How will you verify effectiveness? <span className="text-red-500">*</span></label>
                <textarea
                    id="validation"
                    value={lfiData.validation}
                    onChange={e => updateLfiData({ validation: e.target.value })}
                    placeholder="How will you measure success? Be specific and concise. (e.g., 'Track Line 3 defect rate for 90 days. Target: <0.1%. Audit SOP compliance weekly.')"
                    className="w-full min-h-[120px] p-4 border-2 border-gray-200 rounded-xl text-base leading-relaxed resize-vertical transition-all duration-300 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="horizontal" className="text-lg font-semibold text-gray-700 mb-2 block">Horizontal Deployment Plan <span className="text-red-500">*</span></label>
                <textarea
                    id="horizontal"
                    value={lfiData.horizontal}
                    onChange={e => updateLfiData({ horizontal: e.target.value })}
                    placeholder="Where else will this be applied? (e.g., 'Roll out updated SOP to Lines 4 & 5 by EOY. Review all similar processes in Plant B.')"
                    className="w-full min-h-[120px] p-4 border-2 border-gray-200 rounded-xl text-base leading-relaxed resize-vertical transition-all duration-300 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-8">
                 <h4 className="font-bold text-lg text-gray-800 mb-4">Risk Assessment</h4>
                 <p className="text-sm text-gray-600 mb-6">Use the sliders to assess the risk on a 5x5 matrix (1=Very Low, 5=Very High). This visualizes the impact of your improvements.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                         <h5 className="font-semibold text-gray-800 border-b pb-2">Set Risk Levels</h5>
                         <RiskSlider 
                            label="Severity of Impact"
                            value={riskData.beforeSeverity}
                            onChange={(val) => handleRiskChange('beforeSeverity', val)}
                         />
                         <RiskSlider 
                            label="Likelihood (Before Actions)"
                            value={riskData.beforeLikelihood}
                            onChange={(val) => handleRiskChange('beforeLikelihood', val)}
                         />
                         <RiskSlider 
                            label="Likelihood (After Actions)"
                            value={riskData.afterLikelihood}
                            onChange={(val) => handleRiskChange('afterLikelihood', val)}
                         />
                    </div>
                     <RiskMatrix data={riskData} />
                </div>
            </div>
            
            <SectionControls onPrev={onPrev} onNext={onNext} />
        </div>
    );
};

export default Prevention;
