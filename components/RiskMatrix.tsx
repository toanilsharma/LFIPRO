import React, { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, ReferenceArea, ReferenceLine, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

interface RiskMatrixProps {
    data: {
        beforeSeverity: number;
        beforeLikelihood: number;
        afterLikelihood: number;
    }
}

const getRiskLevelText = (severity: number, likelihood: number): string => {
    const riskScore = severity * likelihood;
    if (riskScore >= 15) return 'High';
    if (riskScore >= 10) return 'Medium';
    if (riskScore >= 5) return 'Low';
    return 'Very Low';
};

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl">
                <p className="font-bold text-gray-900 dark:text-gray-100 mb-2">{data.name} Risk</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Severity: <span className="font-semibold">{data.y}</span></p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Likelihood: <span className="font-semibold">{data.x}</span></p>
            </div>
        );
    }
    return null;
};

const RiskMatrix: React.FC<RiskMatrixProps> = ({ data }) => {
    const { beforeSeverity, beforeLikelihood, afterLikelihood } = data;
    const beforeRiskText = getRiskLevelText(beforeSeverity, beforeLikelihood);
    const afterRiskText = getRiskLevelText(beforeSeverity, afterLikelihood);

    const scatterData = [
        { name: 'Before', x: beforeLikelihood, y: beforeSeverity, z: 200, fill: '#EF4444' }, // Red-500
        { name: 'After', x: afterLikelihood, y: beforeSeverity, z: 200, fill: '#10B981' } // Emerald-500
    ];

    const areas = useMemo(() => {
        const arr = [];
        for (let x = 1; x <= 5; x++) {
            for (let y = 1; y <= 5; y++) {
                const score = x * y;
                let color = 'rgba(16, 185, 129, 0.1)'; // Green
                if (score >= 15) color = 'rgba(239, 68, 68, 0.15)'; // Red
                else if (score >= 10) color = 'rgba(249, 115, 22, 0.15)'; // Orange
                else if (score >= 5) color = 'rgba(250, 204, 21, 0.15)'; // Yellow

                arr.push(
                    <React.Fragment key={`${x}-${y}`}>
                        {/* @ts-expect-error recharts type definitions occasionally omit standard SVG attributes */}
                        <ReferenceArea x1={x - 0.5} x2={x + 0.5} y1={y - 0.5} y2={y + 0.5} fill={color} strokeOpacity={0} />
                    </React.Fragment>
                );
            }
        }
        return arr;
    }, []);

    return (
        <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/50 w-full transition-colors duration-300">
            <h4 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <span className="text-indigo-500">📊</span> Interactive Risk Matrix
            </h4>

            <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 30, right: 30, bottom: 30, left: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 163, 175, 0.2)" />
                        <XAxis
                            type="number"
                            dataKey="x"
                            name="Likelihood"
                            domain={[0.5, 5.5]}
                            ticks={[1, 2, 3, 4, 5]}
                            tickFormatter={(tick) => ['Very Low', 'Low', 'Moderate', 'High', 'Very High'][tick - 1] || ''}
                            stroke="rgba(156, 163, 175, 0.5)"
                            tick={{ fill: 'var(--text-secondary)' }}
                        />
                        <YAxis
                            type="number"
                            dataKey="y"
                            name="Severity"
                            domain={[0.5, 5.5]}
                            ticks={[1, 2, 3, 4, 5]}
                            tickFormatter={(tick) => ['Very Low', 'Low', 'Moderate', 'High', 'Very High'][tick - 1] || ''}
                            stroke="rgba(156, 163, 175, 0.5)"
                            tick={{ fill: 'var(--text-secondary)' }}
                        />
                        <ZAxis type="number" dataKey="z" range={[200, 400]} />
                        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />

                        {areas}

                        <ReferenceLine
                            segment={[{ x: beforeLikelihood, y: beforeSeverity }, { x: afterLikelihood, y: beforeSeverity }]}
                            stroke="currentColor"
                            className="text-gray-400 dark:text-gray-500"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                        />

                        <Scatter name="Risk Progression" data={scatterData} isAnimationActive={true} animationDuration={1000}>
                            {scatterData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                            <LabelList dataKey="name" position="top" style={{ fill: 'var(--text-primary)', fontWeight: 'bold', fontSize: '12px' }} />
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-8 p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700/50 w-full text-center">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Risk Level Improvement</p>
                <div className="flex items-center justify-center gap-6 text-2xl font-black">
                    <span className="text-red-500 dark:text-red-400 drop-shadow-sm">{beforeRiskText}</span>
                    <span className="text-gray-300 dark:text-gray-600 text-3xl">→</span>
                    <span className="text-emerald-500 dark:text-emerald-400 drop-shadow-sm">{afterRiskText}</span>
                </div>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-4 text-center max-w-md mx-auto leading-relaxed">
                This matrix dynamically visualizes the reduction in risk likelihood achieved through your documented corrective and systemic actions.
            </p>
        </div>
    );
};

export default RiskMatrix;
