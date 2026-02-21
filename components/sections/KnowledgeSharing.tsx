import React from 'react';
import { LfiData } from '../../types';
import SectionControls from '../ui/SectionControls';

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
            <div className="mb-10 text-center">
                <span className="inline-block px-4 py-1.5 mb-4 text-sm font-bold tracking-wider text-blue-700 uppercase bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300 rounded-full">
                    Step 7 of 7
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-heading">Knowledge Sharing</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Who needs to know about this? Ensure the right people learn from this incident.
                </p>
            </div>

            <div className="mb-8 p-6 md:p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <label className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 block">Who is the Target Audience?</label>
                <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm font-medium">Select all departments or groups that should review this LFI.</p>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {audiences.map(audience => {
                        const isChecked = lfiData.audience.includes(audience.toLowerCase());
                        return (
                            <label
                                key={audience}
                                className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all border-2 ${isChecked
                                        ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 font-bold text-blue-800 dark:text-blue-200 shadow-sm'
                                        : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 text-gray-700 dark:text-gray-300'
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    value={audience.toLowerCase()}
                                    checked={isChecked}
                                    onChange={handleAudienceChange}
                                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <span className={isChecked ? 'font-bold' : 'font-medium'}>{audience}</span>
                            </label>
                        );
                    })}
                </div>
            </div>

            <div className="mb-8 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <label htmlFor="distribution" className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 block">Distribution & Training Plan</label>
                <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm font-medium">How exactly will you share this? Provide a concrete plan.</p>
                <textarea
                    id="distribution"
                    value={lfiData.distribution}
                    onChange={e => updateLfiData({ distribution: e.target.value })}
                    placeholder="E.g., 1. Present at Weekly Production Meeting. 2. Add to Quality Knowledge Base portal..."
                    className="w-full min-h-[140px] p-4 border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl text-lg resize-vertical transition-all duration-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                />
            </div>

            <div className="mb-8 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <label htmlFor="tags" className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 block">Key Searchable Tags</label>
                <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm font-medium">List keywords separated by commas to make this easy to find later.</p>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🏷️</span>
                    <input
                        id="tags"
                        type="text"
                        value={lfiData.tags}
                        onChange={e => updateLfiData({ tags: e.target.value })}
                        placeholder="e.g., welding, thermal runaway, sensor calibration..."
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl text-lg transition-all duration-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                    />
                </div>
            </div>

            <SectionControls onPrev={onPrev} onNext={onNext} nextText="Done! Review & Export 🚀" />
        </div>
    );
};

export default KnowledgeSharing;