import React, { useState } from 'react';
import { FishboneData, FishboneNode } from '../../types';
import { Plus, X } from 'lucide-react';

interface FishboneGraphProps {
    data: FishboneData;
    onChange: (data: FishboneData) => void;
}

const CATEGORIES: { key: keyof FishboneData; label: string; color: string }[] = [
    { key: 'man', label: 'Man (People)', color: 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-300' },
    { key: 'machine', label: 'Machine (Equipment)', color: 'bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700 text-orange-800 dark:text-orange-300' },
    { key: 'material', label: 'Material', color: 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-800 dark:text-green-300' },
    { key: 'method', label: 'Method (Process)', color: 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 text-purple-800 dark:text-purple-300' },
    { key: 'measurement', label: 'Measurement', color: 'bg-teal-100 dark:bg-teal-900/30 border-teal-300 dark:border-teal-700 text-teal-800 dark:text-teal-300' },
    { key: 'environment', label: 'Mother Nature (Environment)', color: 'bg-rose-100 dark:bg-rose-900/30 border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-300' },
];

const FishboneGraph: React.FC<FishboneGraphProps> = ({ data, onChange }) => {
    const [activeCategory, setActiveCategory] = useState<keyof FishboneData | null>(null);
    const [inputValue, setInputValue] = useState('');

    const handleAddNode = (category: keyof FishboneData) => {
        if (!inputValue.trim()) return;

        const newNode: FishboneNode = {
            id: crypto.randomUUID(),
            text: inputValue.trim(),
        };

        onChange({
            ...data,
            [category]: [...data[category], newNode]
        });

        setInputValue('');
        setActiveCategory(null);
    };

    const handleRemoveNode = (category: keyof FishboneData, nodeId: string) => {
        onChange({
            ...data,
            [category]: data[category].filter(n => n.id !== nodeId)
        });
    };

    // A simple grid layout simulating the bones
    const topCategories = CATEGORIES.slice(0, 3);
    const bottomCategories = CATEGORIES.slice(3, 6);

    const renderCategory = (cat: typeof CATEGORIES[0], isTop: boolean) => {
        const nodes = data[cat.key] || [];

        return (
            <div key={cat.key} className="flex flex-col relative w-full px-2">
                {/* Category Header Box */}
                <div className={`p-3 rounded-lg border-2 font-bold text-center shadow-sm relative z-10 ${cat.color} ${isTop ? 'mb-4' : 'mt-4'}`}>
                    {cat.label}
                    <button
                        onClick={() => setActiveCategory(activeCategory === cat.key ? null : cat.key)}
                        className="ml-2 inline-flex items-center justify-center bg-white/50 hover:bg-white dark:bg-black/30 dark:hover:bg-black/60 rounded-full w-6 h-6 transition-colors"
                        title="Add Root Cause"
                    >
                        <Plus size={14} />
                    </button>
                </div>

                {/* The Bone Branch connecting to the Spine */}
                <div className={`absolute left-1/2 w-1 bg-gray-300 dark:bg-gray-600 ${isTop ? 'bottom-0 h-8 translate-y-full' : 'top-0 h-8 -translate-y-full'}`}></div>

                {/* Input Field Overlay */}
                {activeCategory === cat.key && (
                    <div className={`absolute left-0 right-0 z-20 ${isTop ? 'top-16' : 'bottom-16'}`}>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-xl border border-indigo-200 dark:border-indigo-800 flex gap-2">
                            <input
                                autoFocus
                                type="text"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                placeholder="E.g., Untrained operator..."
                                className="flex-1 p-2 text-sm border rounded bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                onKeyDown={e => {
                                    if (e.key === 'Enter') handleAddNode(cat.key);
                                    if (e.key === 'Escape') setActiveCategory(null);
                                }}
                            />
                            <button onClick={() => handleAddNode(cat.key)} className="p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Nodes Display */}
                <div className={`flex flex-col gap-2 ${isTop ? 'mt-8' : 'mb-8'}`}>
                    {nodes.map(node => (
                        <div key={node.id} className="relative group bg-white dark:bg-gray-800 p-2 text-sm rounded shadow-sm border border-gray-200 dark:border-gray-700 pr-8">
                            <span className="text-gray-800 dark:text-gray-200">{node.text}</span>
                            <button
                                onClick={() => handleRemoveNode(cat.key, node.id)}
                                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="w-full bg-gray-50/50 dark:bg-gray-900/20 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl p-6 md:p-10 my-8 overflow-x-auto">
            <div className="min-w-[800px] relative">

                {/* Top Branches */}
                <div className="grid grid-cols-3 gap-6 mb-16 relative z-10 w-[85%]">
                    {topCategories.map(cat => renderCategory(cat, true))}
                </div>

                {/* The Central Spine */}
                <div className="absolute top-1/2 left-0 right-0 h-3 bg-gray-800 dark:bg-gray-400 -translate-y-1/2 rounded-full flex items-center shadow-inner pt-2 pb-2 pl-2 z-0">
                    <div className="w-full h-full border-t-2 border-b-2 border-gray-600 dark:border-gray-500 mx-2"></div>
                </div>

                {/* Bottom Branches */}
                <div className="grid grid-cols-3 gap-6 mt-16 relative z-10 w-[85%]">
                    {bottomCategories.map(cat => renderCategory(cat, false))}
                </div>

                {/* The Fish Head (Problem Statement Target) */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[15%] pl-4 z-20">
                    <div className="bg-rose-100 dark:bg-rose-900/30 border-2 border-rose-400 dark:border-rose-600 p-4 rounded-xl shadow-lg relative">
                        {/* Connecting triangle representing the head connection */}
                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[15px] border-y-transparent border-r-[15px] border-r-rose-400 dark:border-r-rose-600"></div>
                        <h4 className="font-extrabold text-rose-800 dark:text-rose-300 text-center leading-tight">Primary Effect (The Incident)</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FishboneGraph;
