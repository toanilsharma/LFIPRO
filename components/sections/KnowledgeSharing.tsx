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
        <div>
            <div className="mb-6">
                <label className="text-lg font-semibold text-gray-700 mb-2 block">Target Audience for this LFI</label>
                 <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {audiences.map(audience => (
                        <label key={audience} className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-indigo-50">
                            <input 
                                type="checkbox"
                                value={audience.toLowerCase()}
                                checked={lfiData.audience.includes(audience.toLowerCase())}
                                onChange={handleAudienceChange}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                            />
                            {audience}
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <label htmlFor="distribution" className="text-lg font-semibold text-gray-700 mb-2 block">Distribution & Training Plan</label>
                <textarea
                    id="distribution"
                    value={lfiData.distribution}
                    onChange={e => updateLfiData({ distribution: e.target.value })}
                    placeholder="How will you share this LFI? Example: '1. Present at Weekly Production Meeting... 2. Add to Quality Knowledge Base...'"
                    className="w-full min-h-[120px] p-4 border-2 border-gray-200 rounded-xl text-base leading-relaxed resize-vertical transition-all duration-300 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                />
            </div>
            
             <div className="mb-6">
                <label htmlFor="tags" className="text-lg font-semibold text-gray-700 mb-2 block">Key Searchable Tags</label>
                <input
                    id="tags"
                    type="text"
                    value={lfiData.tags}
                    onChange={e => updateLfiData({ tags: e.target.value })}
                    placeholder="e.g., welding, temperature control, sensor calibration, maintenance procedure"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-base leading-relaxed transition-all duration-300 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                />
            </div>
            
            <SectionControls onPrev={onPrev} onNext={onNext} />
        </div>
    );
};

export default KnowledgeSharing;