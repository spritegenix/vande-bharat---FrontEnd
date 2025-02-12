import { useState, useEffect, useCallback } from 'react';

interface UseCountdownTimerProps {
    initialTime: number; // Timer duration in seconds
}

const useCountdownTimer = ({ initialTime }: UseCountdownTimerProps) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
            return () => clearTimeout(timerId); // Cleanup the timer
        } else if (timeLeft === 0) {
            setIsRunning(false);
        }
    }, [isRunning, timeLeft]);

    const resetTimer = useCallback(() => {
        setTimeLeft(initialTime);
        setIsRunning(true);
    }, [initialTime]);

    return {
        timeLeft,
        isRunning,
        resetTimer,
    };
};

export default useCountdownTimer;
