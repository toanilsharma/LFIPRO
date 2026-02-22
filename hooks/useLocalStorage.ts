import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
    // Get from local storage then parse stored json or return initialValue
    const readValue = (): T => {
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    };

    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState<T>(readValue);
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    // Return a wrapped version of useState's setter function that persists the new value to localStorage.
    const setValue = useCallback((value: T | ((val: T) => T)) => {
        try {
            setIsSaving(true);
            // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
                // Dispatch a custom event so other tabs/components can listen if needed
                window.dispatchEvent(new Event('local-storage'));
            }

            // Simulate network/disk delay for psychological reassurance
            setTimeout(() => {
                setIsSaving(false);
                setLastSaved(new Date());
            }, 800);

        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
            setIsSaving(false);
        }
    }, [key, storedValue]);

    return [storedValue, setValue, isSaving, lastSaved] as const;
}
