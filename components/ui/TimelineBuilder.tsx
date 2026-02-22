import React, { useState } from 'react';
import { TimelineEvent } from '../../types';
import { Plus, Trash2, Clock, Calendar, GripVertical } from 'lucide-react';

interface TimelineBuilderProps {
    events: TimelineEvent[];
    onChange: (events: TimelineEvent[]) => void;
}

const TimelineBuilder: React.FC<TimelineBuilderProps> = ({ events, onChange }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');

    const handleAddEvent = () => {
        if (!date || !time || !description) return;

        const newEvent: TimelineEvent = {
            id: crypto.randomUUID(),
            date,
            time,
            description
        };

        const newEvents = [...events, newEvent];
        // Only sort if it's the first time or user hasn't manually reordered
        // For simplicity in this D&D update, we just append to the end
        // users can then drag to prioritize/reorder

        onChange(newEvents);
        setDescription('');
    };

    // Drag and Drop State
    const [draggedId, setDraggedId] = useState<string | null>(null);

    const handleDragStart = (e: React.DragEvent, id: string) => {
        setDraggedId(id);
        // Required for Firefox
        e.dataTransfer.setData('text/plain', id);
        e.dataTransfer.effectAllowed = 'move';

        // Slight delay to make the drag image look right while original is faded
        setTimeout(() => {
            const el = document.getElementById(`timeline-item-${id}`);
            if (el) el.classList.add('opacity-50');
        }, 0);
    };

    const handleDragEnd = (e: React.DragEvent, id: string) => {
        setDraggedId(null);
        const el = document.getElementById(`timeline-item-${id}`);
        if (el) el.classList.remove('opacity-50');
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault(); // Necessary to allow dropping
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, targetId: string) => {
        e.preventDefault();
        if (!draggedId || draggedId === targetId) return;

        const draggedIndex = events.findIndex(event => event.id === draggedId);
        const targetIndex = events.findIndex(event => event.id === targetId);

        if (draggedIndex < 0 || targetIndex < 0) return;

        const newEvents = [...events];
        const [draggedItem] = newEvents.splice(draggedIndex, 1);
        newEvents.splice(targetIndex, 0, draggedItem);

        onChange(newEvents);
    };

    const isFutureDate = (dateString: string, timeString: string) => {
        if (!dateString) return false;

        const [year, month, day] = dateString.split('-').map(Number);
        let [hours, minutes] = [0, 0];
        if (timeString) {
            [hours, minutes] = timeString.split(':').map(Number);
        }

        // Use local time for timeline events since they usually reflect local incident time
        const eventDate = new Date(year, month - 1, day, hours, minutes);
        const now = new Date();

        return eventDate > now;
    };

    const handleRemoveEvent = (id: string) => {
        onChange(events.filter(e => e.id !== id));
    };

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 mb-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <Clock className="text-indigo-500" size={20} />
                Visual Timeline Builder
            </h3>

            <div className="flex flex-col md:flex-row gap-3 mb-6 items-start">
                <div className="w-full md:w-1/4">
                    <label className="text-xs font-bold text-gray-500 tracking-wider uppercase mb-1 block">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-gray-100"
                    />
                </div>
                <div className="w-full md:w-1/4">
                    <label className="text-xs font-bold text-gray-500 tracking-wider uppercase mb-1 block">Time</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full p-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-gray-100"
                    />
                </div>
                <div className="w-full md:w-2/4">
                    <label className="text-xs font-bold text-gray-500 tracking-wider uppercase mb-1 block">Event Description</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Pump seal failed..."
                            className="flex-1 p-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-gray-100"
                            onKeyDown={(e) => { if (e.key === 'Enter') handleAddEvent() }}
                        />
                        <button
                            onClick={handleAddEvent}
                            disabled={!date || !time || !description}
                            className="p-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {events.length > 0 && (
                <div className="relative pl-6 border-l-2 border-indigo-200 dark:border-indigo-900/50 space-y-4 mt-8">
                    {events.map((event, index) => (
                        <div
                            key={event.id}
                            id={`timeline-item-${event.id}`}
                            draggable
                            onDragStart={(e) => handleDragStart(e, event.id)}
                            onDragEnd={(e) => handleDragEnd(e, event.id)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, event.id)}
                            className={`relative group transition-all duration-200 ${draggedId === event.id ? 'opacity-50 scale-95' : 'scale-100'}`}
                        >
                            <span className="absolute -left-[31px] top-1/2 -translate-y-1/2 h-5 w-5 rounded-full border-4 border-white dark:border-gray-800 bg-indigo-500 shadow-sm z-10 hidden sm:block"></span>
                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3 border border-gray-100 dark:border-gray-800 flex items-stretch gap-2 group-hover:border-indigo-300 dark:group-hover:border-indigo-700 transition-colors shadow-sm">

                                <div className="flex items-center justify-center cursor-grab active:cursor-grabbing px-1 text-gray-400 hover:text-indigo-500 transition-colors" title="Drag to reorder">
                                    <GripVertical size={18} />
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1.5 border ${isFutureDate(event.date, event.time) ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800' : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/50'}`}>
                                            <Calendar size={12} /> {event.date}
                                        </span>
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1.5 border ${isFutureDate(event.date, event.time) ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700'}`}>
                                            <Clock size={12} /> {event.time}
                                        </span>
                                        {isFutureDate(event.date, event.time) && (
                                            <span className="text-[10px] uppercase font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-1 translate-y-[1px]" title="Timeline events are usually in the past.">
                                                <span className="text-sm">⚠️</span> Future Date
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-800 dark:text-gray-200 text-sm font-medium mt-1">{event.description}</p>
                                </div>

                                <button
                                    onClick={() => handleRemoveEvent(event.id)}
                                    className="text-gray-400 hover:text-rose-500 transition-colors p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/30 h-fit self-center"
                                    title="Remove Event"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TimelineBuilder;
