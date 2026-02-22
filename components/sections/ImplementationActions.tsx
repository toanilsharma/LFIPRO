import React from 'react';
import { LfiData } from '../../types';
import ActionItemBuilder from '../ui/ActionItemBuilder';
import SectionControls from '../ui/SectionControls';
import { ActionItem } from '../../types';
import { Download } from 'lucide-react';

interface ImplementationActionsProps {
    lfiData: LfiData;
    updateLfiData: (data: Partial<LfiData>) => void;
    onNext: () => void;
    onPrev: () => void;
}

const ImplementationActions: React.FC<ImplementationActionsProps> = ({ lfiData, updateLfiData, onNext, onPrev }) => {

    const actionItems = lfiData.actionItems || [];

    const immediateItems = actionItems.filter(i => i.type === 'Immediate');
    const correctiveItems = actionItems.filter(i => i.type === 'Corrective');
    const systemicItems = actionItems.filter(i => i.type === 'Systemic');

    const handleUpdate = (type: ActionItem['type'], newTypeItems: ActionItem[]) => {
        const otherItems = actionItems.filter(i => i.type !== type);
        updateLfiData({ actionItems: [...otherItems, ...newTypeItems] });
    };

    const handleExportCSV = () => {
        const rows = [
            ['Type', 'Description', 'Owner', 'Due Date', 'Status'],
            ...actionItems.map(item => [
                item.type,
                `"${item.description.replace(/"/g, '""')}"`,
                `"${item.owner.replace(/"/g, '""')}"`,
                item.dueDate,
                item.status
            ])
        ];

        const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `LFI_Action_Items_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="animate-fade-in text-gray-900 dark:text-gray-100 max-w-5xl mx-auto">
            <div className="mb-6 flex flex-col items-center text-center">
                <span className="inline-block px-3 py-1 mb-2 text-xs font-bold tracking-wider text-emerald-700 uppercase bg-emerald-100 dark:bg-emerald-900/50 dark:text-emerald-300 rounded-full">
                    Step 5 of 6
                </span>
                <div className="flex w-full justify-between items-end mb-2">
                    <h2 className="text-xl md:text-2xl font-extrabold font-heading text-center w-full">Take Action</h2>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-4">
                    How are we fixing this? Define the immediate containment, the specific corrective fix, and the broader systemic improvement.
                </p>
                {actionItems.length > 0 && (
                    <button
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold text-gray-700 hover:text-emerald-600 hover:border-emerald-300 dark:text-gray-300 dark:hover:text-emerald-400 dark:hover:border-emerald-700 transition shadow-sm"
                    >
                        <Download size={16} /> Export Actions to CSV
                    </button>
                )}
            </div>

            <ActionItemBuilder
                type="Immediate"
                title="1. Immediate Action (Containment)"
                description="What was done to stop the bleeding immediately?"
                items={immediateItems}
                onChange={(items) => handleUpdate('Immediate', items)}
            />

            <ActionItemBuilder
                type="Corrective"
                title="2. Corrective Action (The Fix)"
                description="How will you fix the specific root cause? Be specific with WHO and WHEN."
                items={correctiveItems}
                onChange={(items) => handleUpdate('Corrective', items)}
            />

            <ActionItemBuilder
                type="Systemic"
                title="3. Systemic Improvement (The Prevention)"
                description="What system change prevents this type of issue ANYWHERE else in the business?"
                items={systemicItems}
                onChange={(items) => handleUpdate('Systemic', items)}
            />

            <div className="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-400 p-4 rounded-r-2xl my-5">
                <h4 className="font-extrabold text-emerald-800 dark:text-emerald-300 text-sm mb-1.5 flex items-center gap-2">
                    <span className="text-lg">✨</span> Be SMART (Specific, Measurable, Actionable, Relevant, Time-bound)
                </h4>
                <div className="text-gray-800 dark:text-gray-200 space-y-2.5 text-sm bg-white/50 dark:bg-black/20 p-3.5 rounded-xl">
                    <p className="flex items-start gap-3">
                        <strong className="text-rose-600 dark:text-rose-400 font-bold whitespace-nowrap pt-1">❌ Vague:</strong>
                        <span className="italic">"Fix the maintenance procedure."</span>
                    </p>
                    <p className="flex items-start gap-3">
                        <strong className="text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap pt-1">✅ SMART:</strong>
                        <span className="italic font-bold">"Update SOP-M-442 to add barcode scan verification (Sec 4.2). Owner: J. Smith. Due: 11/15/2026."</span>
                    </p>
                </div>
            </div>

            <SectionControls
                onPrev={onPrev}
                onNext={onNext}
                nextDisabled={actionItems.length === 0}
            />
        </div>
    );
};

export default ImplementationActions;
