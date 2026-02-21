import React, { useMemo } from 'react';
import { LfiData } from '../../types';
import SectionControls from '../ui/SectionControls';
import Button from '../ui/Button';
import { TEMPLATE_NAMES, REQUIRED_FIELDS_MAP } from '../../constants';
import LfiPreviewContent from '../LfiPreviewContent';

interface ReviewExportProps {
    lfiData: LfiData;
    onPrev: () => void;
}

const ReviewExport: React.FC<ReviewExportProps> = ({ lfiData, onPrev }) => {

    const { missingFields, completionPercentage } = useMemo(() => {
        const requiredKeys = Object.keys(REQUIRED_FIELDS_MAP) as (keyof typeof REQUIRED_FIELDS_MAP)[];
        let completedCount = 0;
        const missing: string[] = [];

        requiredKeys.forEach(field => {
            if (field === 'lessons') {
                if (lfiData.lessons.some(l => l && l.trim() !== '')) {
                    completedCount++;
                } else {
                    missing.push(REQUIRED_FIELDS_MAP[field]);
                }
            } else {
                const value = lfiData[field as keyof LfiData];
                if (typeof value === 'string' && value.trim() !== '') {
                    completedCount++;
                } else {
                    missing.push(REQUIRED_FIELDS_MAP[field as keyof LfiData]);
                }
            }
        });

        return {
            missingFields: missing,
            completionPercentage: Math.round((completedCount / requiredKeys.length) * 100)
        };
    }, [lfiData]);


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
    }

    const copyLFI = () => {
        const text = document.getElementById('previewContent')?.innerText;
        if (text) {
            navigator.clipboard.writeText(text).then(() => {
                alert('✅ LFI content copied to clipboard!');
            }, () => {
                alert('❌ Copy failed. Please try again or copy manually.');
            });
        }
    }


    return (
        <div className="animate-fade-in text-gray-900 dark:text-gray-100 max-w-5xl mx-auto">
            <div className="mb-10 text-center">
                <span className="inline-block px-4 py-1.5 mb-4 text-sm font-bold tracking-wider text-purple-700 uppercase bg-purple-100 dark:bg-purple-900/50 dark:text-purple-300 rounded-full">
                    Final Step
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-heading">Review & Export</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Your world-class Learning From Incident report is ready to be shared.
                </p>
            </div>

            {missingFields.length === 0 ? (
                <div className="bg-emerald-50 dark:bg-emerald-900/30 border-l-4 border-emerald-500 text-emerald-800 dark:text-emerald-200 p-6 rounded-r-2xl mb-8 flex items-center gap-4 shadow-sm">
                    <span className="text-3xl bg-white dark:bg-emerald-900/50 rounded-full p-2">🎉</span>
                    <p className="text-lg"><strong>Congratulations!</strong> Your LFI document is 100% complete and ready for export.</p>
                </div>
            ) : (
                <div className="bg-amber-50 dark:bg-amber-900/30 border-l-4 border-amber-500 text-amber-800 dark:text-amber-200 p-6 rounded-r-2xl mb-8 shadow-sm">
                    <p className="text-lg flex items-center gap-3 mb-2 font-bold"><span className="text-2xl">⚠️</span> Missing required sections:</p>
                    <ul className="list-disc list-inside mt-2 text-base ml-8 font-medium space-y-1">
                        {missingFields.map(field => <li key={field}>{field}</li>)}
                    </ul>
                </div>
            )}

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl mb-10 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex justify-between items-end mb-4">
                    <h3 className="font-extrabold text-xl text-gray-900 dark:text-white">Document Completeness</h3>
                    <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{completionPercentage}%</span>
                </div>
                <div className="bg-gray-100 dark:bg-gray-900 h-4 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full rounded-full transition-all duration-1000 ease-out bg-indigo-500 dark:bg-indigo-400" style={{ width: `${completionPercentage}%` }}></div>
                </div>
            </div>

            {/* Document Preview should ALWAYS be light mode so it looks like paper */}
            <div id="previewContainer" className="bg-white text-black border border-gray-300 rounded-xl p-8 md:p-12 mb-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-4 py-1 rounded-bl-xl shadow-md">
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

            <div className="flex gap-4 mt-8 flex-wrap justify-center border-t border-gray-200 dark:border-gray-700 pt-8">
                <button
                    onClick={onPrev}
                    className="px-6 py-4 rounded-xl font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-gray-300 dark:border-gray-600"
                >
                    ← Go Back
                </button>
                <button
                    onClick={window.print}
                    className="px-8 py-4 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 transition-all hover:-translate-y-1 flex items-center gap-2"
                >
                    📄 Export as PDF
                </button>
                <button
                    onClick={exportWord}
                    className="px-8 py-4 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-1 flex items-center gap-2"
                >
                    📝 Export as Word
                </button>
                <button
                    onClick={copyLFI}
                    className="px-8 py-4 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-1 flex items-center gap-2"
                >
                    📋 Copy Text
                </button>
            </div>
        </div>
    );
};

export default ReviewExport;