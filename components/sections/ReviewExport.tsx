import React, { useMemo, useState, useEffect } from 'react';
import { LfiData, SectionKey } from '../../types';
import SectionControls from '../ui/SectionControls';
import Button from '../ui/Button';
import { TEMPLATE_NAMES, REQUIRED_FIELDS_MAP } from '../../constants';
import LfiPreviewContent from '../LfiPreviewContent';
import { Settings, Eye, EyeOff } from 'lucide-react';

export interface PrintConfig {
    showTeam: boolean;
    showTimeline: boolean;
    showPhotos: boolean;
    showMatrix: boolean;
}

interface ReviewExportProps {
    lfiData: LfiData;
    onPrev: () => void;
    onSwitchSection: (section: SectionKey) => void;
}

const ReviewExport: React.FC<ReviewExportProps> = ({ lfiData, onPrev, onSwitchSection }) => {

    const [printConfig, setPrintConfig] = useState<PrintConfig>({
        showTeam: true,
        showTimeline: true,
        showPhotos: true,
        showMatrix: true
    });

    const FIELD_ROUTING: Record<keyof typeof REQUIRED_FIELDS_MAP, { section: SectionKey, id: string }> = {
        problemTitle: { section: 'problem', id: 'problemTitle' },
        problemStatement: { section: 'problem', id: 'problemStatement' },
        rootCause: { section: 'rootcause', id: 'rootCause' },
        lessons: { section: 'lessons', id: 'lesson1' },
        immediateAction: { section: 'actions', id: 'immediateAction' },
        correctiveAction: { section: 'actions', id: 'correctiveAction' },
        systemicAction: { section: 'actions', id: 'systemicAction' },
        validation: { section: 'prevention', id: 'validation' },
        horizontal: { section: 'prevention', id: 'horizontal' },
    };

    const { missingFields, completionPercentage } = useMemo(() => {
        const requiredKeys = Object.keys(REQUIRED_FIELDS_MAP) as (keyof typeof REQUIRED_FIELDS_MAP)[];
        let completedCount = 0;
        const missing: { key: keyof typeof REQUIRED_FIELDS_MAP, label: string }[] = [];

        requiredKeys.forEach(field => {
            if (field === 'lessons') {
                if (lfiData.lessons.some(l => l && l.trim() !== '')) {
                    completedCount++;
                } else {
                    missing.push({ key: field, label: REQUIRED_FIELDS_MAP[field] });
                }
            } else {
                const value = lfiData[field as keyof LfiData];
                if (typeof value === 'string' && value.trim() !== '') {
                    completedCount++;
                } else {
                    missing.push({ key: field, label: REQUIRED_FIELDS_MAP[field as keyof LfiData] });
                }
            }
        });

        return {
            missingFields: missing,
            completionPercentage: Math.round((completedCount / requiredKeys.length) * 100)
        };
    }, [lfiData]);

    // The "Golden Thread" Validation
    const [goldenThreadWarning, setGoldenThreadWarning] = useState<string | null>(null);

    useEffect(() => {
        if (!lfiData.rootCause || (!lfiData.correctiveAction && !lfiData.systemicAction)) {
            setGoldenThreadWarning(null);
            return;
        }

        // Extract meaningful nouns/keywords from Root Cause (super basic stopword removal)
        const stopWords = new Set(['the', 'is', 'at', 'which', 'on', 'and', 'a', 'to', 'in', 'of', 'that', 'this', 'for', 'it', 'with', 'as', 'by', 'was', 'be', 'are', 'not', 'or', 'an', 'from', 'but', 'what', 'all', 'were', 'when', 'we']);
        const words = lfiData.rootCause.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);

        // Find words longer than 4 chars that aren't stopwords
        const keywords = words.filter(w => w.length > 4 && !stopWords.has(w));

        if (keywords.length === 0) {
            setGoldenThreadWarning(null);
            return; // Not enough meat in the root cause to validate
        }

        const actionsText = `${lfiData.correctiveAction} ${lfiData.systemicAction}`.toLowerCase();

        // Check if ANY root cause keyword appears in the actions
        const hasAlignment = keywords.some(keyword => actionsText.includes(keyword));

        if (!hasAlignment) {
            setGoldenThreadWarning(`The "Golden Thread" may be broken. Your corrective actions don't mention key terms from your Root Cause (e.g., "${keywords[0]}"). Ensure your actions directly address the root problem.`);
        } else {
            setGoldenThreadWarning(null);
        }

    }, [lfiData.rootCause, lfiData.correctiveAction, lfiData.systemicAction]);

    const handleFixMissingField = (fieldKey: keyof typeof REQUIRED_FIELDS_MAP) => {
        const route = FIELD_ROUTING[fieldKey];
        if (route && onSwitchSection) {
            onSwitchSection(route.section);
            setTimeout(() => {
                const el = document.getElementById(route.id);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    el.focus();
                }
            }, 400); // Wait for Framer Motion transitions
        }
    };


    const exportWord = () => {
        const content = document.getElementById('previewContent')?.innerHTML;
        if (!content) return;
        const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>LFI Document</title><style>body{font-family:Arial,sans-serif;} h3{color:#1a237e; border-bottom:1px solid #ccc; padding-bottom:5px; font-size:1.1em;} p{margin-top:4px; margin-bottom: 4px;} strong{font-weight:bold;}</style></head><body>${content}</body></html>`;
        const blob = new Blob(['\ufeff', header], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const fileName = `LFI_${lfiData.problemTitle.substring(0, 20).replace(/[^a-z0-9]/gi, '_') || 'document'}.doc`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    const exportJSON = () => {
        const jsonString = JSON.stringify(lfiData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const sanitizedTitle = lfiData.problemTitle ? lfiData.problemTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'lfi_report';
        a.download = `LFI_Source_${sanitizedTitle}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const copyLFI = () => {
        const customFieldsMd = (lfiData.customFields && lfiData.customFields.length > 0)
            ? '\n**Custom Metadata:**\n' + lfiData.customFields.map(f => `- **${f.label}:** ${f.value || 'N/A'}`).join('\n')
            : '';

        const text = `
# LFI: ${lfiData.problemTitle}
**Template:** ${lfiData.template ? TEMPLATE_NAMES[lfiData.template] : 'Standard Format'}

## 1. Problem Identification & Team
**Team Members:** ${lfiData.teamMembers}${customFieldsMd}

**Problem Statement:**
${lfiData.problemStatement}

## 2. Root Cause Analysis
**Method Used:** ${lfiData.rcaMethod || 'Not specified'}

**Root Cause:**
${lfiData.rootCause}

## 3. Lessons Learned
${lfiData.lessons.filter(l => l.trim()).map((l, i) => `${i + 1}. ${l}`).join('\n')}

## 4. Implementation Actions
**Immediate Actions:**
${lfiData.immediateAction}

**Corrective Actions:**
${lfiData.correctiveAction}

**Systemic Improvements:**
${lfiData.systemicAction}

## 5. Prevention & Validation
**Validation Plan:**
${lfiData.validation}

**Horizontal Deployment:**
${lfiData.horizontal}

## 6. Knowledge Sharing
**Target Audience:** ${lfiData.audience && lfiData.audience.length > 0 ? lfiData.audience.join(', ') : 'Not specified'}
**Distribution Plan:**
${lfiData.distribution}

**Tags:** ${lfiData.tags}
`.trim();

        navigator.clipboard.writeText(text).then(() => {
            alert('✅ Clean LFI Markdown copied to clipboard! Ready to paste into an email or ticket.');
        }, () => {
            alert('❌ Copy failed. Please try again or copy manually.');
        });
    }

    return (
        <div className="animate-fade-in text-gray-900 dark:text-gray-100 max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

            {/* Left Column: Controls (Sticky on Desktop) */}
            <div className="w-full lg:w-[350px] flex-shrink-0 flex flex-col gap-6 lg:sticky lg:top-0 print:hidden z-10">

                <div className="text-left">
                    <span className="inline-block px-3 py-1 mb-2 text-xs font-bold tracking-wider text-purple-700 uppercase bg-purple-100 dark:bg-purple-900/50 dark:text-purple-300 rounded-full">
                        Final Step
                    </span>
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-2 font-heading">Review & Export</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Your world-class Learning From Incident report is ready to be shared.
                    </p>
                </div>

                {/* Primary Export Actions Card */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md">
                    <h3 className="font-extrabold text-xs uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Quick Actions
                    </h3>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={window.print}
                            className="w-full flex items-center justify-between px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/20 hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <span className="flex items-center gap-3 text-lg">📄 Export as PDF</span>
                            <span className="opacity-50 text-sm font-normal">Print dialog</span>
                        </button>
                        <button
                            onClick={exportWord}
                            className="w-full flex items-center justify-between px-5 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <span className="flex items-center gap-3 text-lg">📝 Export as Word</span>
                            <span className="opacity-50 text-sm font-normal">.doc file</span>
                        </button>
                        <button
                            onClick={copyLFI}
                            className="w-full flex items-center justify-between px-5 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20 hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <span className="flex items-center gap-3 text-lg">📋 Copy Markdown</span>
                            <span className="opacity-50 text-sm font-normal">Clipboard</span>
                        </button>

                        <div className="grid grid-cols-2 gap-3 mt-2 pt-4 border-t border-gray-100 dark:border-gray-700/50">
                            <button
                                onClick={onPrev}
                                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-bold transition-all"
                            >
                                ← Go Back
                            </button>
                            <button
                                onClick={exportJSON}
                                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-amber-500/20"
                            >
                                💾 Raw .json
                            </button>
                        </div>
                    </div>
                </div>

                {/* Print Layout Controls */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="font-extrabold text-sm flex items-center gap-2 mb-3 text-gray-900 dark:text-white uppercase tracking-wider">
                        <Settings className="text-emerald-500" size={16} />
                        Document Layout
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                        Toggle sections to customize the export for different audiences.
                    </p>
                    <div className="flex flex-col gap-2">
                        {Object.entries({
                            showTeam: 'Team Members',
                            showTimeline: 'Incident Timeline',
                            showPhotos: 'Evidence Photos',
                            showMatrix: 'Risk Matrix'
                        }).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setPrintConfig(prev => ({ ...prev, [key]: !prev[key as keyof PrintConfig] }))}
                                className={`flex justify-between items-center p-3 rounded-xl border transition-all ${printConfig[key as keyof PrintConfig] ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300' : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 opacity-70 hover:opacity-100'}`}
                            >
                                <span className="font-bold text-sm">{label}</span>
                                {printConfig[key as keyof PrintConfig] ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Validation and Completeness UI */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex justify-between items-end mb-2">
                        <h3 className="font-extrabold text-sm uppercase tracking-wider text-gray-900 dark:text-white">Completeness</h3>
                        <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">{completionPercentage}%</span>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-900 h-2 rounded-full overflow-hidden shadow-inner mb-4">
                        <div className="h-full rounded-full transition-all duration-1000 ease-out bg-indigo-500 dark:bg-indigo-400" style={{ width: `${completionPercentage}%` }}></div>
                    </div>

                    {missingFields.length === 0 ? (
                        <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-300 p-3 rounded-xl flex items-start gap-3 text-sm">
                            <span className="text-lg">🎉</span>
                            <p className="font-medium mt-0.5">100% complete and ready.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <p className="text-xs font-bold text-amber-600 dark:text-amber-500 flex items-center gap-1.5"><span className="text-sm">⚠️</span> Missing required details:</p>
                            <div className="flex flex-wrap gap-2">
                                {missingFields.map(field => (
                                    <button
                                        key={field.key}
                                        onClick={() => handleFixMissingField(field.key)}
                                        className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/40 border border-amber-200 dark:border-amber-800/50 rounded-lg text-amber-800 dark:text-amber-300 transition-colors text-xs font-semibold cursor-pointer whitespace-nowrap"
                                    >
                                        Fix {field.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {goldenThreadWarning && (
                        <div className="mt-4 bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 text-rose-800 dark:text-rose-300 p-3 rounded-xl flex items-start gap-3">
                            <span className="text-lg">🔗</span>
                            <div>
                                <p className="font-bold text-xs uppercase tracking-wider mb-1">Alignment Warning</p>
                                <p className="text-xs font-medium leading-relaxed">{goldenThreadWarning}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column: Document Preview */}
            <div className="w-full flex-1 min-w-0">
                {/* Document Preview should ALWAYS be light mode so it looks like paper */}
                <div id="previewContainer" className="bg-white text-black border border-gray-200 dark:border-gray-800 rounded-[20px] p-6 sm:p-10 shadow-xl relative overflow-hidden print:border-none print:shadow-none print:p-0 print:m-0 print:overflow-visible text-[11pt] min-h-[1056px]">
                    <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-md print:hidden flex items-center gap-2">
                        <Eye size={14} /> LIVE PREVIEW
                    </div>

                    <div id="previewContent" className="mt-2">
                        <h3 className="text-center font-extrabold text-2xl uppercase tracking-widest mb-2" style={{ color: '#1a237e' }}>LESSONS FOR IMPLEMENTATION</h3>
                        <p className="text-center text-gray-500 mb-10 font-medium tracking-wider uppercase text-sm border-b border-gray-200 pb-6">
                            {lfiData.template ? TEMPLATE_NAMES[lfiData.template] : 'Standard Format'}
                        </p>
                        <LfiPreviewContent lfiData={lfiData} printConfig={printConfig} />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ReviewExport;