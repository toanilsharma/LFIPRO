
import React, { useMemo } from 'react';
import { LfiData } from '../types';

interface QualityScoreProps {
    lfiData: LfiData;
}

const calculateQualityScore = (data: LfiData): number => {
    let score = 0;
    if (data.template) score += 10;
    
    // Problem Title: Concise but descriptive
    if (data.problemTitle && data.problemTitle.length >= 15 && data.problemTitle.length <= 100) score += 5;

    // Problem Statement: The sweet spot for detail
    const statementWords = data.problemStatement ? data.problemStatement.trim().split(/\s+/).length : 0;
    if (statementWords >= 50 && statementWords <= 150) score += 15;
    else if (statementWords >= 25) score += 7;

    // Root Cause: Concise and systemic
    const rcWords = data.rootCause ? data.rootCause.trim().split(/\s+/).length : 0;
    if (rcWords >= 40 && rcWords <= 100) score += 20;
    else if (rcWords >= 20) score += 10;

    // Lessons Learned: Punchy and transferable
    const lesson1Words = data.lessons[0] ? data.lessons[0].trim().split(/\s+/).length : 0;
    if (lesson1Words >= 15 && lesson1Words <= 50) score += 15;
    else if (lesson1Words > 0) score += 7;
    if (data.lessons[1] && data.lessons[1].length > 10) score += 5;

    // Actions: All three present
    if (data.immediateAction && data.correctiveAction && data.systemicAction) score += 15;
    else if (data.correctiveAction) score += 7;

    // Prevention: Both present
    if (data.validation && data.horizontal) score += 10;
    else if (data.validation) score += 5;

    // Sharing: Complete
    if (data.distribution && data.audience.length > 0) score += 5;
    
    return Math.min(100, score);
};


const QualityScore: React.FC<QualityScoreProps> = ({ lfiData }) => {
    const score = useMemo(() => calculateQualityScore(lfiData), [lfiData]);

    const getGradient = () => {
        if (score >= 90) return 'linear-gradient(135deg, #43a047 0%, #66bb6a 100%)';
        if (score >= 60) return 'linear-gradient(135deg, #fb8c00 0%, #ffa726 100%)';
        return 'linear-gradient(135deg, #e53935 0%, #ef5350 100%)';
    };

    return (
        <div className="mt-8 p-5 rounded-2xl text-white text-center" style={{ background: getGradient() }}>
            <h3 className="font-bold text-lg">LFI Quality Score</h3>
            <div className="w-32 h-32 rounded-full bg-white/30 backdrop-blur-sm text-white flex items-center justify-center text-4xl font-bold mx-auto my-4 shadow-inner">
                {score}%
            </div>
            <p className="text-sm opacity-90">Complete all sections for optimal quality</p>
        </div>
    );
};

export default QualityScore;
