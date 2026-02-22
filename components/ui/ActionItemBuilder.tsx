import React, { useState, useRef, useEffect } from 'react';
import { ActionItem } from '../../types';
import { Plus, Trash2, Calendar, User, CheckCircle2, Clock, GripVertical, Building2 } from 'lucide-react';

interface ActionItemBuilderProps {
    type: 'Immediate' | 'Corrective' | 'Systemic';
    title: string;
    description: string;
    items: ActionItem[];
    onChange: (items: ActionItem[]) => void;
}

const ActionItemBuilder: React.FC<ActionItemBuilderProps> = ({ type, title, description, items, onChange }) => {
    const [descInput, setDescInput] = useState('');
    const [ownerInput, setOwnerInput] = useState('');
    const [departmentInput, setDepartmentInput] = useState('');
    const [dateInput, setDateInput] = useState('');
    const [statusInput, setStatusInput] = useState<'Open' | 'In Progress' | 'Closed'>('Open');
    const [showQuickInsert, setShowQuickInsert] = useState(false);
    const dropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropRef.current && !dropRef.current.contains(event.target as Node)) {
                setShowQuickInsert(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const quickInserts = {
        Immediate: [
            "Quarantine affected materials",
            "Stop production on Line X",
            "Sort existing inventory",
            "Alert all operators on shift",
            "Replace defective component"
        ],
        Corrective: [
            "Update Work Instruction (WI)",
            "Retrain operators on new WI",
            "Calibrate sensor/equipment",
            "Install physical guard/poka-yoke",
            "Adjust machine parameters"
        ],
        Systemic: [
            "Update FMEA / Control Plan",
            "Implement automated vision check",
            "Revise PM (Preventative Maintenance) schedule",
            "Change supplier material spec",
            "Audit similar processes plant-wide"
        ]
    };

    const handleAdd = () => {
        if (!descInput.trim() || !ownerInput.trim() || !dateInput) return;

        const newItem: ActionItem = {
            id: crypto.randomUUID(),
            type,
            description: descInput.trim(),
            owner: ownerInput.trim(),
            department: departmentInput.trim() || undefined,
            dueDate: dateInput,
            status: statusInput
        };

        onChange([...items, newItem]);
        setDescInput('');
        setOwnerInput('');
        setDepartmentInput('');
        setDateInput('');
        setStatusInput('Open');
    };

    const handleRemove = (id: string) => {
        onChange(items.filter(item => item.id !== id));
    };

    const getStatusColor = (status: string) => {
        if (status === 'Closed') return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50';
        if (status === 'In Progress') return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800/50';
        return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300 border-rose-200 dark:border-rose-800/50';
    };

    const isOverdue = (dateString: string, status: string) => {
        if (!dateString || status === 'Closed') return false;

        // Parse date strings as UTC to avoid timezone shifting issues comparing to local today
        const [year, month, day] = dateString.split('-').map(Number);
        const dueDate = new Date(year, month - 1, day);

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Start of today

        return dueDate < today;
    };

    // Drag and Drop State
    const [draggedId, setDraggedId] = useState<string | null>(null);

    const handleDragStart = (e: React.DragEvent, id: string) => {
        setDraggedId(id);
        e.dataTransfer.setData('text/plain', id);
        e.dataTransfer.effectAllowed = 'move';

        setTimeout(() => {
            const el = document.getElementById(`action-item-${id}`);
            if (el) el.classList.add('opacity-50');
        }, 0);
    };

    const handleDragEnd = (e: React.DragEvent, id: string) => {
        setDraggedId(null);
        const el = document.getElementById(`action-item-${id}`);
        if (el) el.classList.remove('opacity-50');
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, targetId: string) => {
        e.preventDefault();
        if (!draggedId || draggedId === targetId) return;

        const draggedIndex = items.findIndex(item => item.id === draggedId);
        const targetIndex = items.findIndex(item => item.id === targetId);

        if (draggedIndex < 0 || targetIndex < 0) return;

        const newItems = [...items];
        const [draggedItem] = newItems.splice(draggedIndex, 1);
        newItems.splice(targetIndex, 0, draggedItem);

        onChange(newItems);
    };

    return (
        <div className="mb-8 p-5 md:p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">{title}</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-5 text-sm font-medium">{description}</p>

            <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 mb-3">
                    <div className="xl:col-span-4 relative" ref={dropRef}>
                        <div className="flex items-center justify-between mb-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Action Description</label>
                            <button
                                onClick={() => setShowQuickInsert(!showQuickInsert)}
                                className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                            >
                                Quick Insert ⚡
                            </button>
                        </div>
                        <input
                            type="text"
                            value={descInput}
                            onChange={e => setDescInput(e.target.value)}
                            className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow"
                            placeholder="E.g. Update SOP-123 to include verification step"
                        />
                        {showQuickInsert && (
                            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl overflow-hidden">
                                {quickInserts[type].map((phrase, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setDescInput(prev => prev ? `${prev} ${phrase}` : phrase);
                                            setShowQuickInsert(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors border-b last:border-0 border-gray-100 dark:border-gray-700/50"
                                    >
                                        {phrase}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="xl:col-span-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block flex items-center gap-1"><User size={12} /> Owner</label>
                        <input
                            type="text"
                            value={ownerInput}
                            onChange={e => setOwnerInput(e.target.value)}
                            className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="xl:col-span-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block flex items-center gap-1"><Building2 size={12} /> Department</label>
                        <input
                            type="text"
                            value={departmentInput}
                            onChange={e => setDepartmentInput(e.target.value)}
                            className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow"
                            placeholder="Quality Team"
                        />
                    </div>
                    <div className="xl:col-span-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block flex items-center gap-1"><Calendar size={12} /> Due Date</label>
                        <input
                            type="date"
                            value={dateInput}
                            onChange={e => setDateInput(e.target.value)}
                            className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow"
                        />
                    </div>
                    <div className="xl:col-span-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Status</label>
                        <select
                            value={statusInput}
                            onChange={e => setStatusInput(e.target.value as any)}
                            className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-semibold text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow"
                        >
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleAdd}
                        disabled={!descInput.trim() || !ownerInput.trim() || !dateInput}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm"
                    >
                        <Plus size={16} /> Add Action Item
                    </button>
                </div>
            </div>

            {items.length > 0 ? (
                <div className="flex flex-col gap-3">
                    {items.map((item, idx) => (
                        <div
                            key={item.id}
                            id={`action-item-${item.id}`}
                            draggable
                            onDragStart={(e) => handleDragStart(e, item.id)}
                            onDragEnd={(e) => handleDragEnd(e, item.id)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, item.id)}
                            className={`group flex flex-col sm:flex-row justify-between sm:items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700/60 rounded-xl transition-all duration-200 hover:border-emerald-200 dark:hover:border-emerald-800/50 ${draggedId === item.id ? 'opacity-50 scale-[0.98]' : 'scale-100'}`}
                        >
                            <div className="flex items-center gap-3 flex-1">
                                <div className="flex items-center justify-center cursor-grab active:cursor-grabbing text-gray-400 hover:text-emerald-500 transition-colors hidden sm:block" title="Drag to reorder prioritize">
                                    <GripVertical size={18} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-gray-900 dark:text-gray-100 text-sm">Action #{idx + 1}</span>
                                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 font-medium text-sm leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400 self-end sm:self-auto flex-wrap justify-end">
                                {item.department && (
                                    <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-md">
                                        <Building2 size={12} className="text-gray-500" /> {item.department}
                                    </div>
                                )}
                                <div className="flex items-center gap-1.5"><User size={14} className="text-emerald-500" /> {item.owner}</div>
                                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${isOverdue(item.dueDate, item.status) ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 font-bold border border-rose-200 dark:border-rose-800' : ''}`}>
                                    <Calendar size={14} className={isOverdue(item.dueDate, item.status) ? "text-rose-600 dark:text-rose-400" : "text-indigo-500"} />
                                    {item.dueDate}
                                    {isOverdue(item.dueDate, item.status) && <span title="Action is overdue!" className="ml-1 cursor-help">⚠️</span>}
                                </div>
                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="p-2 text-gray-400 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/30 -mr-2"
                                    title="Delete action"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center p-6 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                    <p className="text-sm font-semibold text-gray-400 dark:text-gray-500">No {type.toLowerCase()} actions added yet.</p>
                </div>
            )}
        </div>
    );
};

export default ActionItemBuilder;
