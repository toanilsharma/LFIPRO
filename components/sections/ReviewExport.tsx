import React, { useMemo } from 'react';
import { LfiData } from '../../types';
import SectionControls from '../ui/SectionControls';
import Button from '../ui/Button';
import { TEMPLATE_NAMES, REQUIRED_FIELDS_MAP } from '../../constants';
import LfiPreviewContent from '../LfiPreviewContent'; // Import the new component

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
        <div>
            {missingFields.length === 0 ? (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-r-lg">
                    <p>🎉 <strong>Congratulations!</strong> Your LFI document is complete and ready for export!</p>
                </div>
            ) : (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-r-lg">
                    <p><strong>Missing required sections:</strong></p>
                    <ul className="list-disc list-inside mt-2 text-sm">
                        {missingFields.map(field => <li key={field}>{field}</li>)}
                    </ul>
                </div>
            )}
            
            <div className="bg-gray-100 p-6 rounded-lg my-6">
                <h3 className="font-bold text-lg mb-4 text-[var(--primary)]">Document Completeness Check</h3>
                <div className="bg-gray-200 h-2.5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${completionPercentage}%`, background: 'var(--gradient-1)' }}></div>
                </div>
            </div>

            <div id="previewContainer" className="bg-white border-2 border-gray-200 rounded-lg p-8 my-6">
                <div id="previewContent">
                    <h3 className="text-center font-bold text-xl" style={{ color: 'var(--primary)' }}>LESSONS FOR IMPLEMENTATION</h3>
                    <p className="text-center text-gray-500 mb-8">{lfiData.template ? TEMPLATE_NAMES[lfiData.template] : 'Standard Format'}</p>
                    <LfiPreviewContent lfiData={lfiData} />
                </div>
            </div>

            <div className="flex gap-4 mt-8 flex-wrap">
                <Button onClick={onPrev} variant="secondary">← Previous</Button>
                <Button onClick={window.print} variant="success">📄 Export as PDF</Button>
                <Button onClick={exportWord} variant="success">📝 Export as Word</Button>
                <Button onClick={copyLFI} variant="primary">📋 Copy to Clipboard</Button>
            </div>
        </div>
    );
};

export default ReviewExport;