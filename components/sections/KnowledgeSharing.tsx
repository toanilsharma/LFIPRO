import React from 'react';
import { LfiData } from '../../types';
import SectionControls from '../ui/SectionControls';
import MarkdownTextarea from '../ui/MarkdownTextarea';

interface KnowledgeSharingProps {
    lfiData: LfiData;
    updateLfiData: (data: Partial<LfiData>) => void;
    onNext: () => void;
    onPrev: () => void;
}

const audiences = ['Production', 'Quality', 'Maintenance', 'Engineering', 'Management', 'Global'];

const KnowledgeSharing: React.FC<KnowledgeSharingProps> = ({ lfiData, updateLfiData, onNext, onPrev }) => {

    const handleAudienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const currentAudiences = lfiData.audience || [];
        const newAudiences = checked
            ? [...currentAudiences, value]
            : currentAudiences.filter(audience => audience !== value);
        updateLfiData({ audience: newAudiences });
    };

    return (
        <div className="animate-fade-in text-gray-900 dark:text-gray-100 max-w-4xl mx-auto">
            <div className="mb-6 text-center">
                <span className="inline-block px-3 py-1 mb-2 text-xs font-bold tracking-wider text-blue-700 uppercase bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300 rounded-full">
                    Step 7 of 7
                </span>
                <h2 className="text-xl md:text-2xl font-extrabold mb-2 font-heading">Knowledge Sharing</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Who needs to know about this? Ensure the right people learn from this incident.
                </p>
            </div>

            <div className="mb-5 p-4 md:p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <label className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1 block">Who is the Target Audience?</label>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-3 font-medium">Select all departments or groups that should review this LFI.</p>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {audiences.map(audience => {
                        const isChecked = lfiData.audience.includes(audience.toLowerCase());
                        return (
                            <label
                                key={audience}
                                className={`flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all border-2 ${isChecked
                                    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 font-bold text-blue-800 dark:text-blue-200 shadow-sm'
                                    : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 text-gray-700 dark:text-gray-300'
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    value={audience.toLowerCase()}
                                    checked={isChecked}
                                    onChange={handleAudienceChange}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <span className={isChecked ? 'font-bold' : 'font-medium'}>{audience}</span>
                            </label>
                        );
                    })}
                </div>
            </div>

            <div className="mb-5 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <label htmlFor="distribution" className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1 block">Distribution & Training Plan</label>
                <p className="text-gray-500 dark:text-gray-400 mb-2.5 text-[10px] font-medium">How exactly will you share this? Provide a concrete plan.</p>
                <MarkdownTextarea
                    id="distribution"
                    minRows={4}
                    value={lfiData.distribution}
                    onChange={e => updateLfiData({ distribution: e.target.value })}
                    placeholder="E.g., 1. Present at Weekly Production Meeting. 2. Add to Quality Knowledge Base portal..."
                />
            </div>

            <div className="mb-6 p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <label htmlFor="tags" className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1 block">Key Searchable Tags</label>
                <p className="text-gray-500 dark:text-gray-400 mb-2.5 text-[10px] font-medium">List keywords separated by commas to make this easy to find later.</p>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🏷️</span>
                    <input
                        id="tags"
                        type="text"
                        value={lfiData.tags}
                        onChange={e => updateLfiData({ tags: e.target.value })}
                        placeholder="e.g., communication, process failure, software bug, training..."
                        className="w-full pl-12 pr-4 py-3 border-2 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 placeholder-shown:bg-blue-50/50 dark:placeholder-shown:bg-blue-900/20 placeholder-shown:border-blue-200 dark:placeholder-shown:border-blue-800/60 placeholder-shown:placeholder:text-blue-400 dark:placeholder-shown:placeholder:text-blue-500/70 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                </div>
            </div>

            <SectionControls onPrev={onPrev} onNext={onNext} nextText="Done! Review & Export 🚀" />
        </div>
    );
};

export default KnowledgeSharing;