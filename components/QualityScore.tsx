import React, { useMemo, useState, useEffect } from 'react';
import { LfiData } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles } from 'lucide-react';

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
    const [debouncedData, setDebouncedData] = useState(lfiData);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedData(lfiData);
        }, 300);
        return () => clearTimeout(handler);
    }, [lfiData]);

    const score = useMemo(() => calculateQualityScore(debouncedData), [debouncedData]);

    const getColor = () => {
        if (score === 100) return '#eab308'; // yellow-500 (gold)
        if (score >= 90) return '#10b981'; // emerald-500
        if (score >= 60) return '#f59e0b'; // amber-500
        return '#f43f5e'; // rose-500
    };

    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Celebration Background for 100% */}
            <AnimatePresence>
                {score === 100 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-yellow-50 dark:bg-yellow-900/20"
                    />
                )}
            </AnimatePresence>

            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2 z-10">
                {score === 100 ? <Trophy className="text-yellow-500" size={20} /> : <Sparkles className="text-primary" size={20} />}
                Document Quality
            </h3>

            <div className="relative w-40 h-40 mb-4 z-10">
                <svg width="160" height="160" viewBox="0 0 160 160" className="transform -rotate-90">
                    {/* Background Track */}
                    <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        fill="none"
                        className="stroke-gray-100 dark:stroke-gray-700"
                        strokeWidth="12"
                    />
                    {/* Progress Arc */}
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
                        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                    />
                </svg>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        key={score} // Forces re-animation on score change
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-4xl font-extrabold ${score === 100 ? 'text-yellow-500' : 'text-gray-900 dark:text-white'}`}
                    >
                        {score}%
                    </motion.span>
                </div>

                {/* 100% Particle Burst Effect */}
                <AnimatePresence>
                    {score === 100 && (
                        <>
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={`particle-${i}`}
                                    className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-yellow-400"
                                    initial={{ x: "-50%", y: "-50%", scale: 1, opacity: 1 }}
                                    animate={{
                                        x: `calc(-50% + ${Math.cos((i * 60) * (Math.PI / 180)) * 70}px)`,
                                        y: `calc(-50% + ${Math.sin((i * 60) * (Math.PI / 180)) * 70}px)`,
                                        scale: 0,
                                        opacity: 0,
                                    }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                />
                            ))}
                        </>
                    )}
                </AnimatePresence>
            </div>

            <p className="text-sm text-center text-gray-500 dark:text-gray-400 z-10">
                {score === 100
                    ? "Perfect! Ready for executive review."
                    : "Add detail and actions to increase score."}
            </p>
        </motion.div>
    );
};

export default QualityScore;
