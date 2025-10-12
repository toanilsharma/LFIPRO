
import React from 'react';

interface RiskMatrixProps {
    data: {
        beforeSeverity: number;
        beforeLikelihood: number;
        afterLikelihood: number;
    }
}

const SEVERITY_LABELS = ['Very High', 'High', 'Moderate', 'Low', 'Very Low'];
const LIKELIHOOD_LABELS = ['Very Low', 'Low', 'Moderate', 'High', 'Very High'];

const getRiskColor = (severity: number, likelihood: number): string => {
    const riskScore = severity * likelihood;
    if (riskScore >= 15) return 'bg-red-500';
    if (riskScore >= 10) return 'bg-orange-500';
    if (riskScore >= 5) return 'bg-yellow-400';
    return 'bg-green-500';
};

const getRiskLevelText = (severity: number, likelihood: number): string => {
    const riskScore = severity * likelihood;
    if (riskScore >= 15) return 'High';
    if (riskScore >= 10) return 'Medium';
    if (riskScore >= 5) return 'Low';
    return 'Very Low';
};

const RiskMatrix: React.FC<RiskMatrixProps> = ({ data }) => {
    const { beforeSeverity, beforeLikelihood, afterLikelihood } = data;

    // CSS grid rows/cols are 1-based.
    // Row is inverted because severity 5 is at the top (row 1).
    const beforeRow = 6 - beforeSeverity;
    const beforeCol = beforeLikelihood;
    const afterRow = 6 - beforeSeverity;
    const afterCol = afterLikelihood;
    
    const beforeRiskText = getRiskLevelText(beforeSeverity, beforeLikelihood);
    const afterRiskText = getRiskLevelText(beforeSeverity, afterLikelihood);


    return (
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-inner">
            <div className="grid grid-cols-[auto_repeat(5,minmax(0,1fr))] grid-rows-[repeat(5,minmax(0,1fr))_auto] gap-1 w-full max-w-sm relative">
                {/* Severity Labels */}
                {SEVERITY_LABELS.map((label, i) => (
                    <div key={label} className="flex items-center justify-end pr-2 text-xs font-semibold text-gray-600" style={{ gridRow: i + 1 }}>
                        {label}
                    </div>
                ))}

                {/* Grid Cells */}
                {Array.from({ length: 5 }).map((_, r) =>
                    Array.from({ length: 5 }).map((_, c) => (
                        <div key={`${r}-${c}`} className={`aspect-square rounded-sm text-white flex items-center justify-center text-sm font-bold ${getRiskColor(5-r, c+1)}`}>
                        </div>
                    ))
                )}
                
                {/* Likelihood Labels */}
                <div style={{ gridColumn: 1 }}></div> {/* Empty cell bottom-left */}
                {LIKELIHOOD_LABELS.map((label, i) => (
                    <div key={label} className="flex items-center justify-center pt-2 text-xs font-semibold text-gray-600" style={{ gridColumn: i + 2 }}>
                        {label}
                    </div>
                ))}

                {/* Risk Points */}
                 <div
                    className="absolute w-6 h-6 bg-red-700 border-2 border-white rounded-full flex items-center justify-center text-white text-xs font-bold shadow-2xl z-10"
                    style={{
                        top: `calc(${(beforeRow - 1) * 20}% + 10% - 12px)`,
                        left: `calc(16.66% + ${(beforeCol - 1) * 16.66}% + 8.33% - 12px)`
                    }}
                    title={`Before: Severity ${beforeSeverity}, Likelihood ${beforeLikelihood}`}
                >B</div>
                 <div
                    className="absolute w-6 h-6 bg-green-700 border-2 border-white rounded-full flex items-center justify-center text-white text-xs font-bold shadow-2xl z-10"
                     style={{
                        top: `calc(${(afterRow - 1) * 20}% + 10% - 12px)`,
                        left: `calc(16.66% + ${(afterCol - 1) * 16.66}% + 8.33% - 12px)`
                    }}
                    title={`After: Severity ${beforeSeverity}, Likelihood ${afterLikelihood}`}
                >A</div>

                {/* Arrow */}
                <svg className="absolute w-full h-full top-0 left-0 overflow-visible z-0" style={{ pointerEvents: 'none' }}>
                    <line 
                         x1={`calc(16.66% + ${(beforeCol - 1) * 16.66}% + 8.33%)`}
                         y1={`calc(${(beforeRow - 1) * 20}% + 10%)`}
                         x2={`calc(16.66% + ${(afterCol - 1) * 16.66}% + 8.33%)`}
                         y2={`calc(${(afterRow - 1) * 20}% + 10%)`}
                        stroke="black"
                        strokeWidth="2"
                        strokeDasharray="4"
                        markerEnd="url(#arrowhead)"
                    />
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="black" />
                        </marker>
                    </defs>
                </svg>

            </div>
            <div className="mt-4 text-center">
                <p className="text-sm font-semibold">Risk Level Improvement:</p>
                <p className="text-lg font-bold"><span className="text-red-600">{beforeRiskText}</span> → <span className="text-green-600">{afterRiskText}</span></p>
            </div>
             <p className="text-xs text-gray-500 mt-2 text-center max-w-xs">
                This matrix visualizes the reduction in risk likelihood due to the implemented corrective and systemic actions.
             </p>
        </div>
    );
};

export default RiskMatrix;
