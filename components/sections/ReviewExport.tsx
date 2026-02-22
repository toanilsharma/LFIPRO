import React, { useMemo } from 'react';
import { LfiData, SectionKey } from '../../types';
import SectionControls from '../ui/SectionControls';
import Button from '../ui/Button';
import { TEMPLATE_NAMES, REQUIRED_FIELDS_MAP } from '../../constants';
import LfiPreviewContent from '../LfiPreviewContent';

interface ReviewExportProps {
    lfiData: LfiData;
    onPrev: () => void;
    onSwitchSection: (section: SectionKey) => void;
}

const ReviewExport: React.FC<ReviewExportProps> = ({ lfiData, onPrev, onSwitchSection }) => {

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
        const text = `
# LFI: ${lfiData.problemTitle}
**Template:** ${lfiData.template ? TEMPLATE_NAMES[lfiData.template] : 'Standard Format'}

## 1. Problem Identification & Team
**Team Members:** ${lfiData.teamMembers}

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
        <div className="animate-fade-in text-gray-900 dark:text-gray-100 max-w-5xl mx-auto">
            <div className="mb-6 text-center print:hidden">
                <span className="inline-block px-3 py-1 mb-2 text-xs font-bold tracking-wider text-purple-700 uppercase bg-purple-100 dark:bg-purple-900/50 dark:text-purple-300 rounded-full">
                    Final Step
                </span>
                <h2 className="text-xl md:text-2xl font-extrabold mb-2 font-heading">Review & Export</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your world-class Learning From Incident report is ready to be shared.
                </p>
            </div>

            {missingFields.length === 0 ? (
                <div className="bg-emerald-50 dark:bg-emerald-900/30 border-l-4 border-emerald-500 text-emerald-800 dark:text-emerald-200 p-5 rounded-r-2xl mb-8 flex items-center gap-4 shadow-sm print:hidden">
                    <span className="text-2xl bg-white dark:bg-emerald-900/50 rounded-full p-2">🎉</span>
                    <p className="text-base"><strong>Congratulations!</strong> Your LFI document is 100% complete and ready for export.</p>
                </div>
            ) : (
                <div className="bg-amber-50 dark:bg-amber-900/30 border-l-4 border-amber-500 text-amber-800 dark:text-amber-200 p-5 rounded-r-2xl mb-8 shadow-sm print:hidden">
                    <p className="text-base flex items-center gap-3 mb-2 font-bold"><span className="text-xl">⚠️</span> Missing required sections:</p>
                    <ul className="list-none mt-3 text-sm ml-2 font-medium space-y-2 flex flex-col items-start">
                        {missingFields.map(field => (
                            <li key={field.key}>
                                <button
                                    onClick={() => handleFixMissingField(field.key)}
                                    className="flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 dark:bg-amber-800/50 dark:hover:bg-amber-700/60 rounded-lg text-amber-900 dark:text-amber-100 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                                >
                                    <span>👉</span> Fix {field.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl mb-6 border border-gray-200 dark:border-gray-700 shadow-sm print:hidden">
                <div className="flex justify-between items-end mb-2">
                    <h3 className="font-extrabold text-base text-gray-900 dark:text-white">Document Completeness</h3>
                    <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">{completionPercentage}%</span>
                </div>
                <div className="bg-gray-100 dark:bg-gray-900 h-2 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full rounded-full transition-all duration-1000 ease-out bg-indigo-500 dark:bg-indigo-400" style={{ width: `${completionPercentage}%` }}></div>
                </div>
            </div>

            {/* Document Preview should ALWAYS be light mode so it looks like paper */}
            <div id="previewContainer" className="bg-white text-black border border-gray-300 rounded-xl p-8 md:p-12 mb-10 shadow-2xl relative overflow-hidden print:border-none print:shadow-none print:p-0 print:m-0 print:overflow-visible text-[11pt]">
                <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-4 py-1 rounded-bl-xl shadow-md print:hidden">
                    Print Preview
                </div>
                <div id="previewContent" className="mt-4">
                    <h3 className="text-center font-extrabold text-2xl uppercase tracking-widest mb-2" style={{ color: '#1a237e' }}>LESSONS FOR IMPLEMENTATION</h3>
                    <p className="text-center text-gray-500 mb-10 font-medium tracking-wider uppercase text-sm border-b pb-6">
                        {lfiData.template ? TEMPLATE_NAMES[lfiData.template] : 'Standard Format'}
                    </p>
                    <LfiPreviewContent lfiData={lfiData} />
                </div>
            </div>

            <div className="flex gap-4 mt-8 flex-wrap justify-center border-t border-gray-200 dark:border-gray-700 pt-8 print:hidden">
                <button
                    onClick={onPrev}
                    className="px-5 py-3 rounded-xl font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-gray-300 dark:border-gray-600"
                >
                    ← Go Back
                </button>
                <button
                    onClick={window.print}
                    className="px-6 py-3 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 transition-all hover:-translate-y-1 flex items-center gap-2"
                >
                    📄 Export as PDF
                </button>
                <button
                    onClick={exportWord}
                    className="px-6 py-3 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-1 flex items-center gap-2"
                >
                    📝 Export as Word
                </button>
                <button
                    onClick={copyLFI}
                    className="px-6 py-3 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-1 flex items-center gap-2"
                >
                    📋 Copy Text
                </button>
                <button
                    onClick={exportJSON}
                    className="px-6 py-3 rounded-xl font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/30 transition-all hover:-translate-y-1 flex items-center gap-2"
                >
                    💾 Export Source (.json)
                </button>
            </div>
        </div>
    );
};

export default ReviewExport;