import React from 'react';
import { LfiData } from '../../types';
import SectionControls from '../ui/SectionControls';
import MarkdownTextarea from '../ui/MarkdownTextarea';
import { Upload, Trash2, Image as ImageIcon } from 'lucide-react';

interface ProblemContextProps {
    lfiData: LfiData;
    updateLfiData: (data: Partial<LfiData>) => void;
    onNext: () => void;
    onPrev: () => void;
}

const FeedbackItem: React.FC<{ status: 'good' | 'warn' | 'error' | 'neutral', icon: string, label: string, value: string | number }> = ({ status, icon, label, value }) => {
    const statusClasses = {
        good: 'bg-emerald-50 dark:bg-emerald-900/20 border-l-emerald-500 text-emerald-800 dark:text-emerald-300',
        warn: 'bg-amber-50 dark:bg-amber-900/20 border-l-amber-500 text-amber-800 dark:text-amber-300',
        error: 'bg-rose-50 dark:bg-rose-900/20 border-l-rose-500 text-rose-800 dark:text-rose-300',
        neutral: 'bg-gray-100 dark:bg-gray-800 border-l-gray-400 text-gray-800 dark:text-gray-300',
    };
    return (
        <div className={`p-3 rounded-xl flex items-center gap-3 border-l-4 shadow-sm ${statusClasses[status]} transition-colors`}>
            <span className="text-2xl bg-white dark:bg-gray-900 p-1.5 rounded-full shadow-inner">{icon}</span>
            <div>
                <span className="text-xs font-bold opacity-70 block uppercase tracking-wider">{label}</span>
                <span className="text-base font-bold">{value}</span>
            </div>
        </div>
    );
};

const SmartTextarea: React.FC<{ id: string, value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void; placeholder: string; isTextarea?: boolean, required?: boolean }> = ({ id, value, onChange, placeholder, isTextarea = true, required = false }) => (
    <div className="mb-6 p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors">
        <label htmlFor={id} className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 block">
            {placeholder.split('(')[0].trim()} {required && <span className="text-rose-500 ml-1" title="Required">*</span>}
        </label>
        <p className="text-gray-500 dark:text-gray-400 mb-3 text-xs font-medium">
            {placeholder}
        </p>
        {isTextarea ? (
            <MarkdownTextarea
                id={id}
                minRows={5}
                value={value}
                onChange={onChange as any}
                placeholder="Type your answer here..."
            />
        ) : (
            <input id={id} type="text" value={value} onChange={onChange} placeholder="Type your answer here..." className={`w-full p-3 border-2 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 ${!value ? 'bg-indigo-50/50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800/60 placeholder:text-indigo-400 dark:placeholder:text-indigo-500/70' : 'bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white'}`} />
        )}
    </div>
);

const ProblemContext: React.FC<ProblemContextProps> = ({ lfiData, updateLfiData, onNext, onPrev }) => {
    const { problemTitle, problemStatement, teamMembers } = lfiData;

    const titleLength = problemTitle.length;
    const statementWords = problemStatement.trim().split(/\s+/).filter(Boolean).length;
    const dataPoints = (problemStatement.match(/(\d[\d,.]*|\%)/g) || []).length;

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        if (lfiData.images.length + files.length > 3) {
            alert('Maximum 3 images allowed to keep the report lightweight.');
            return;
        }

        files.forEach((file: File) => {
            if (!file.type.startsWith('image/')) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    const MAX_DIM = 800;

                    if (width > height && width > MAX_DIM) {
                        height *= MAX_DIM / width;
                        width = MAX_DIM;
                    } else if (height > MAX_DIM) {
                        width *= MAX_DIM / height;
                        height = MAX_DIM;
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.drawImage(img, 0, 0, width, height);
                        // Compress to 60% quality JPEG to save local storage space
                        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
                        updateLfiData({ images: [...(lfiData.images || []), compressedBase64] });
                    }
                };
                if (event.target?.result) {
                    img.src = event.target.result as string;
                }
            };
            reader.readAsDataURL(file);
        });

        // Reset input
        e.target.value = '';
    };

    const removeImage = (indexToRemove: number) => {
        const newImages = lfiData.images.filter((_, idx) => idx !== indexToRemove);
        updateLfiData({ images: newImages });
    };

    const getWordCountFeedback = (): { status: 'good' | 'warn' | 'error'; value: string } => {
        if (statementWords < 25) return { status: 'error', value: 'Too short' };
        if (statementWords <= 150) return { status: 'good', value: 'Perfectly Concise' };
        return { status: 'warn', value: 'A Bit Long' };
    };
    const wordCountFeedback = getWordCountFeedback();

    const getClarityFeedback = (): { status: 'good' | 'warn' | 'error' | 'neutral'; value: string } => {
        if (statementWords === 0) return { status: 'neutral', value: 'Waiting for input...' };
        let score = 0;
        const checks = {
            impact: /cost|\$|dollar|delay|time|hour|day|scrap|defect|rate|%|return|failure/i,
            what: /problem|issue|defect|failure|error|concern/i,
            when: /date|week|month|q[1-4]|20\d{2}/i,
            where: /line|area|plant|location|site|facility/i,
        };

        if (checks.impact.test(problemStatement)) score++;
        if (checks.what.test(problemStatement)) score++;
        if (checks.when.test(problemStatement)) score++;
        if (checks.where.test(problemStatement)) score++;

        if (score >= 3) return { status: 'good', value: 'Extremely Clear' };
        if (score >= 1) return { status: 'warn', value: 'Add Date/Location/Cost' };
        return { status: 'error', value: 'Too Vague' };
    };
    const clarityFeedback = getClarityFeedback();

    const getSmartExample = (template: string | null) => {
        switch (template) {
            case 'iso9001':
                return {
                    title: 'ISO 9001 Compliant Problem Statement',
                    text: '"Audit non-conformity NCR-891: On Oct 12, final pressure testing on Line A bypassed QMS verification points, causing 15% scrap rate and violating clause 8.5.1 of ISO 9001:2015."'
                };
            case 'apqp':
                return {
                    title: '8D/APQP Problem Statement',
                    text: '"Customer Delta Corp reported critical defect at assembly. 15% of delivered units failed pressure validation (D1). Containment actions isolated 400 affected parts across shifts 1 and 2."'
                };
            case 'sixsigma':
                return {
                    title: 'Six Sigma DMAIC Problem Statement',
                    text: '"Historical baseline for Line A pressure test failures is 1.2%. During Oct 1-12, the defect rate shifted to 15.0% (p < 0.05), resulting in a $12,500 variance in Q4 scrap costs."'
                };
            case 'a3':
                return {
                    title: 'A3 Current Condition Statement',
                    text: '"Current condition: Line A pressure test yield dropped from 98% to 85% this week. Target condition: Return yield to 98% within 14 days without increasing cycle time."'
                };
            default:
                return {
                    title: 'Example of a Perfect Problem Statement',
                    text: '"On October 12, 2026, 15% of units from Assembly Line A failed the final pressure test, delaying the shipment to Delta Corp by 48 hours and incurring $12,500 in scrap costs."'
                };
        }
    };
    const smartExample = getSmartExample(lfiData.template);

    // Calculate approximate localStorage consumption
    const dataSize = new Blob([JSON.stringify(lfiData)]).size;
    const maxStorage = 5 * 1024 * 1024; // ~5MB limit for typical localStorage
    const storagePercentage = Math.min(100, Math.round((dataSize / maxStorage) * 100));
    const isStorageWarning = storagePercentage > 85;

    return (
        <div className="animate-fade-in text-gray-900 dark:text-gray-100 max-w-4xl mx-auto">
            <div className="mb-8 text-center">
                <span className="inline-block px-4 py-1.5 mb-3 text-sm font-bold tracking-wider text-indigo-700 uppercase bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-full">
                    Step 2 of 6
                </span>
                <h2 className="text-xl md:text-2xl font-extrabold mb-2 font-heading">Define the Problem</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    What exactly went wrong? A clear problem definition is 50% of the solution.
                </p>
            </div>

            <SmartTextarea
                id="problemTitle"
                value={problemTitle}
                onChange={e => updateLfiData({ problemTitle: e.target.value })}
                placeholder="Give this incident a short, clear Name (e.g., 'Internal Communications Delay' or 'Server Downtime')"
                isTextarea={false}
                required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <FeedbackItem
                    status={titleLength === 0 ? 'neutral' : titleLength < 15 ? 'error' : titleLength > 100 ? 'warn' : 'good'}
                    icon="📏"
                    label="Title Length Rating"
                    value={titleLength === 0 ? 'Start typing...' : titleLength < 15 ? 'Too short' : titleLength > 100 ? 'Too long' : 'Perfect length'}
                />
            </div>

            <SmartTextarea
                id="teamMembers"
                value={teamMembers || ''}
                onChange={e => updateLfiData({ teamMembers: e.target.value })}
                placeholder="Team Members & Contributors (e.g., Jane Doe - Quality, John Smith - Production)"
                isTextarea={false}
                required={false}
            />

            <SmartTextarea
                id="problemStatement"
                value={problemStatement}
                onChange={e => updateLfiData({ problemStatement: e.target.value })}
                placeholder="Describe the incident in detail. Who, what, when, where, and how much did it cost?"
                required
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <FeedbackItem
                    status={statementWords === 0 ? 'neutral' : wordCountFeedback.status}
                    icon="📝"
                    label="Word Count"
                    value={statementWords === 0 ? '-' : `${statementWords} words (${wordCountFeedback.value})`}
                />
                <FeedbackItem
                    status={statementWords === 0 ? 'neutral' : dataPoints >= 2 ? 'good' : 'warn'}
                    icon="📊"
                    label="Data Points"
                    value={statementWords === 0 ? '-' : `${dataPoints} (Metrics/Numbers)`}
                />
                <FeedbackItem
                    status={clarityFeedback.status}
                    icon="🎯"
                    label="Clarity Rating"
                    value={clarityFeedback.value}
                />
            </div>

            {/* Evidence Uploader Section */}
            <div className="mb-6 p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <label className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1 block flex items-center gap-2">
                            <ImageIcon size={22} className="text-indigo-500" />
                            Evidence & Attachments
                        </label>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                            Upload photos of the incident, broken parts, or environment (Max 3).
                        </p>
                        <div className="mt-2 flex items-center gap-3" title="Browser storage limit meter">
                            <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className={`h-full transition-all duration-500 ${isStorageWarning ? 'bg-amber-500' : 'bg-indigo-500'}`} style={{ width: `${storagePercentage}%` }}></div>
                            </div>
                            <span className={`text-xs font-bold ${isStorageWarning ? 'text-amber-600 dark:text-amber-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                Storage: {(dataSize / 1024 / 1024).toFixed(2)}MB / 5.00MB
                            </span>
                        </div>
                    </div>
                    {(!lfiData.images || lfiData.images.length < 3) && (
                        <div>
                            <input
                                type="file"
                                id="evidence-upload"
                                accept="image/jpeg, image/png, image/webp"
                                multiple
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                            <label
                                htmlFor="evidence-upload"
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/40 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold rounded-lg transition-colors cursor-pointer border border-indigo-200 dark:border-indigo-800"
                            >
                                <Upload size={16} />
                                Add Photo
                            </label>
                        </div>
                    )}
                </div>

                {lfiData.images && lfiData.images.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                        {lfiData.images.map((imgSrc, idx) => (
                            <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 aspect-video bg-gray-100 dark:bg-gray-900">
                                <img src={imgSrc} alt={`Evidence ${idx + 1}`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        onClick={() => removeImage(idx)}
                                        className="p-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transform hover:scale-110 transition-all shadow-lg"
                                        title="Remove Image"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-400 p-5 rounded-r-2xl my-6">
                <h4 className="font-extrabold text-indigo-800 dark:text-indigo-300 text-sm mb-1.5 flex items-center gap-2">
                    <span className="text-lg">💡</span> {smartExample.title}:
                </h4>
                <p className="text-indigo-900 dark:text-indigo-100 text-sm leading-relaxed italic bg-white/50 dark:bg-black/20 p-2.5 rounded-xl">
                    {smartExample.text}
                </p>
            </div>

            <SectionControls onPrev={onPrev} onNext={onNext} nextDisabled={titleLength < 5 || statementWords < 10} />
        </div>
    );
};

export default ProblemContext;
