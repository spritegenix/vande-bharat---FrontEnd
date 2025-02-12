import { useState, useEffect } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue; // For SSR

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Save to local storage whenever the value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Function to update local storage value
  const setValue = (value: T | ((val: T) => T)) => {
    setStoredValue((prevValue) =>
      value instanceof Function ? value(prevValue) : value
    );
  };

  // Function to remove item from local storage
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue] as const;
};

// const [loginCredentials, setLoginCredentials, clearLoginCredentials] = useLocalStorage("loginCredentials", {
//   email: "",
//   password: "",
// });

// const [theme, setTheme, clearTheme] = useLocalStorage("theme", "light");