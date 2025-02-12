import { useRef } from "react";

export function useDebounce<T extends (...args: any[]) => void>(func: T, delay: number) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    return (...args: Parameters<T>) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            func(...args);
        }, delay);
    };
}