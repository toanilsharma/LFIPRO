import React, { useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Bold, Italic, List } from 'lucide-react';

interface MarkdownTextareaProps {
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    minRows?: number;
    className?: string;
    invalid?: boolean;
}

const MarkdownTextarea: React.FC<MarkdownTextareaProps> = ({
    id, value, onChange, placeholder, minRows = 4, className, invalid = false
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const insertFormat = (prefix: string, suffix: string = '') => {
        const el = textareaRef.current;
        if (!el) return;

        const start = el.selectionStart;
        const end = el.selectionEnd;
        const text = el.value;
        const selectedText = text.substring(start, end);

        const newText = text.substring(0, start) + prefix + selectedText + suffix + text.substring(end);

        // Create synthetic event
        const event = {
            target: { value: newText }
        } as React.ChangeEvent<HTMLTextAreaElement>;

        onChange(event);

        // Reset focus and selection
        setTimeout(() => {
            el.focus();
            el.setSelectionRange(start + prefix.length, end + prefix.length);
        }, 0);
    };

    return (
        <div className="relative rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/20 transition-all duration-300 overflow-hidden">
            <div className="flex items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/20">
                <button
                    onClick={() => insertFormat('**', '**')}
                    className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded transition-colors"
                    title="Bold"
                    type="button"
                >
                    <Bold size={16} />
                </button>
                <button
                    onClick={() => insertFormat('*', '*')}
                    className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded transition-colors"
                    title="Italic"
                    type="button"
                >
                    <Italic size={16} />
                </button>
                <div className="w-px h-4 bg-gray-300 dark:bg-gray-700 mx-1"></div>
                <button
                    onClick={() => insertFormat('\n- ')}
                    className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded transition-colors"
                    title="Bullet List"
                    type="button"
                >
                    <List size={16} />
                </button>
            </div>
            <TextareaAutosize
                id={id}
                ref={textareaRef}
                minRows={minRows}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                aria-invalid={invalid}
                className={`w-full p-4 bg-transparent text-gray-900 dark:text-white text-lg resize-none focus:outline-none ${className || ''}`}
            />
        </div>
    );
};

export default MarkdownTextarea;
