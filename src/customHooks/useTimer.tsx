import { useState, useEffect, useCallback } from "react";

// Converts total seconds into HH:MM:SS format
const formatTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds]
    .map((val) => (val < 10 ? `0${val}` : val)) // Adding leading zeros if necessary
    .join(":");
};

// Custom hook for a timer
const useTimer = (initialSeconds = 0) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  const toggle = useCallback(() => {
    setIsActive((prevIsActive) => !prevIsActive);
  }, []);

  const reset = useCallback(() => {
    setSeconds(0);
    setIsActive(false);
  }, []);

  const setTimer = useCallback((newSeconds: number) => {
    setSeconds(newSeconds);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0 && interval !== null) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  return {
    seconds,
    isActive,
    formattedTime: formatTime(seconds),
    toggle,
    reset,
    setTimer,
  };
};

export default useTimer;
