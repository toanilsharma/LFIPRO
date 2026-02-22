import React, { useMemo, useState, useEffect } from 'react';
import { LfiData } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles, ChevronRight, X, AlertCircle } from 'lucide-react';

interface QualityScoreProps {
    lfiData: LfiData;
    onNavigate?: (section: string) => void;
}

interface ScoreBreakdown {
    score: number;
    missing: Array<{ id: string; message: string; section: string; anchor?: string }>;
}

const calculateQualityScore = (data: LfiData): ScoreBreakdown => {
    let score = 0;
    const missing: ScoreBreakdown['missing'] = [];

    if (data.template) score += 10;
    else missing.push({ id: 'tmpl', message: 'Select a Template', section: 'template' });

    // Problem Title: Concise but descriptive
    if (data.problemTitle && data.problemTitle.length >= 15 && data.problemTitle.length <= 100) score += 5;
    else missing.push({ id: 'title', message: 'Add a descriptive title (15-100 chars)', section: 'problem', anchor: 'problemTitle' });

    // Problem Statement: The sweet spot for detail
    const statementWords = data.problemStatement ? data.problemStatement.trim().split(/\s+/).length : 0;
    if (statementWords >= 50 && statementWords <= 150) score += 15;
    else if (statementWords >= 25) { score += 7; missing.push({ id: 'stmt', message: 'Expand Problem Statement (aim for 50-150 words)', section: 'problem', anchor: 'problemStatement' }); }
    else missing.push({ id: 'stmt', message: 'Provide a detailed Problem Statement', section: 'problem', anchor: 'problemStatement' });

    // Root Cause: Concise and systemic
    const rcWords = data.rootCause ? data.rootCause.trim().split(/\s+/).length : 0;
    if (rcWords >= 40 && rcWords <= 100) score += 20;
    else if (rcWords >= 20) { score += 10; missing.push({ id: 'rc', message: 'Flesh out the Root Cause analysis', section: 'rootcause', anchor: 'rootCause' }); }
    else missing.push({ id: 'rc', message: 'Complete the Root Cause analysis', section: 'rootcause', anchor: 'rootCause' });

    // Lessons Learned: Punchy and transferable
    const lesson1Words = data.lessons[0] ? data.lessons[0].trim().split(/\s+/).length : 0;
    if (lesson1Words >= 15 && lesson1Words <= 50) score += 15;
    else if (lesson1Words > 0) { score += 7; missing.push({ id: 'll1', message: 'Detailed primary Lesson Learned needed', section: 'lessons', anchor: 'lesson1' }); }
    else missing.push({ id: 'll1', message: 'Add at least one Lesson Learned', section: 'lessons', anchor: 'lesson0' });

    if (data.lessons[1] && data.lessons[1].length > 10) score += 5;
    else missing.push({ id: 'll2', message: 'Add a second Lesson Learned', section: 'lessons', anchor: 'lesson1' });

    // Actions: All three present
    if (data.immediateAction && data.correctiveAction && data.systemicAction) score += 15;
    else {
        if (data.correctiveAction) { score += 7; missing.push({ id: 'act', message: 'Add Systemic Actions to prevent recurrence', section: 'actions', anchor: 'systemicAction' }); }
        else missing.push({ id: 'act', message: 'Add Corrective and Systemic Actions', section: 'actions', anchor: 'correctiveAction' });
    }

    // Prevention: Both present
    if (data.validation && data.horizontal) score += 10;
    else {
        if (data.validation) { score += 5; missing.push({ id: 'prev', message: 'Add Horizontal Deployment plan', section: 'prevention', anchor: 'horizontal' }); }
        else missing.push({ id: 'prev', message: 'Add Validation & Horizontal plans', section: 'prevention', anchor: 'validation' });
    }

    // Sharing: Complete
    if (data.distribution && data.audience.length > 0) score += 5;
    else missing.push({ id: 'share', message: 'Select Audience & Distribution', section: 'sharing' });

    return { score: Math.min(100, score), missing };
};

const QualityScore: React.FC<QualityScoreProps> = ({ lfiData, onNavigate }) => {
    const [debouncedData, setDebouncedData] = useState(lfiData);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedData(lfiData);
        }, 300);
        return () => clearTimeout(handler);
    }, [lfiData]);

    const { score, missing } = useMemo(() => calculateQualityScore(debouncedData), [debouncedData]);

    const getColor = (s: number) => {
        if (s === 100) return '#eab308'; // yellow-500 (gold)
        if (s >= 90) return '#10b981'; // emerald-500
        if (s >= 60) return '#f59e0b'; // amber-500
        return '#f43f5e'; // rose-500
    };

    const radius = 48;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center relative overflow-hidden"
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

            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2 z-10 text-sm">
                {score === 100 ? <Trophy className="text-yellow-500" size={20} /> : <Sparkles className="text-primary" size={20} />}
                Document Quality
            </h3>

            <div className={`relative w-32 h-32 ${score < 100 ? 'cursor-pointer hover:scale-105 transition-transform' : ''} mb-3 z-10`} onClick={() => score < 100 && setIsDrawerOpen(true)}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="transform -rotate-90">
                    {/* Background Track */}
                    <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        fill="none"
                        className="stroke-gray-100 dark:stroke-gray-700 hover:stroke-gray-200 dark:hover:stroke-gray-600 transition-colors"
                        strokeWidth="10"
                    />
                    {/* Progress Arc */}
                    <motion.circle
                        cx="64"
                        cy="64"
                        r={radius}
                        fill="none"
                        stroke={getColor(score)}
                        strokeWidth="10"
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
                        className={`text-3xl font-extrabold ${score === 100 ? 'text-yellow-500' : 'text-gray-900 dark:text-white'}`}
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

            <p className="text-sm text-center font-medium text-gray-500 dark:text-gray-400 z-10 w-full">
                {score === 100 ? (
                    "Perfect! Ready for executive review."
                ) : (
                    <button onClick={() => setIsDrawerOpen(true)} className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center justify-center gap-1 w-full mt-1">
                        View Missing Criteria <ChevronRight size={14} />
                    </button>
                )}
            </p>

            {/* Remediation Drawer Overlay */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm lg:hidden cursor-pointer"
                            onClick={() => setIsDrawerOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%", opacity: 0.5 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0.5 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed lg:absolute top-0 right-0 h-full w-[320px] bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-2xl z-50 flex flex-col"
                            style={{ position: window.innerWidth >= 1024 ? 'absolute' : 'fixed' }}
                        >
                            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                                <h3 className="font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                                    <AlertCircle className="text-amber-500" size={18} />
                                    Missing Criteria
                                </h3>
                                <button onClick={() => setIsDrawerOpen(false)} className="p-1.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                                {missing.length === 0 ? (
                                    <p className="text-gray-500 text-center mt-10">All criteria met!</p>
                                ) : (
                                    missing.map((item, i) => (
                                        <div key={i} className="p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors group">
                                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">{item.message}</p>
                                            {onNavigate && (
                                                <button
                                                    onClick={() => {
                                                        onNavigate(item.section);
                                                        // Fallback tiny delay to allow section mount before scroll
                                                        if (item.anchor) {
                                                            setTimeout(() => {
                                                                const el = document.getElementById(item.anchor as string);
                                                                if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.focus(); }
                                                            }, 300);
                                                        }
                                                        if (window.innerWidth < 1024) setIsDrawerOpen(false); // Auto close on mobile
                                                    }}
                                                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:text-indigo-700 dark:group-hover:text-indigo-300"
                                                >
                                                    Fix in {item.section.charAt(0).toUpperCase() + item.section.slice(1)} <ChevronRight size={12} />
                                                </button>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="p-5 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                                <p className="text-xs text-center text-gray-500 font-medium">Earn 100% to unlock full shareability.</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default QualityScore;
