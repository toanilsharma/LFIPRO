import React, { useMemo } from 'react';
import { LfiData } from '../types';
import { motion } from 'framer-motion';

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

    const getColor = () => {
        if (score >= 90) return 'var(--success)';
        if (score >= 60) return 'var(--warning)';
        return 'var(--danger)';
    };

    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>LFI Quality Score</h3>

            <div style={{ position: 'relative', width: '160px', height: '160px', marginBottom: '1rem' }}>
                <svg width="160" height="160" viewBox="0 0 160 160">
                    <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="12"
                    />
                    <motion.circle
                        cx="80"
                        cy="80"
                        r={radius}
                        fill="none"
                        stroke={getColor()}
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
                    />
                </svg>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.span
                        style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 }}
                    >
                        {score}%
                    </motion.span>
                </div>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Complete all sections for optimal quality and actionable intelligence.</p>
        </div>
    );
};

export default QualityScore;
