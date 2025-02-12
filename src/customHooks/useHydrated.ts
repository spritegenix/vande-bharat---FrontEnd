import { useEffect, useState } from "react";

/**
 * Hook to handle client-side hydration.
 * Returns `true` once the component has been hydrated and it's safe to use client-side features like localStorage.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Mark hydrated when the component mounts in the client
    setHydrated(true);
  }, []);

  return hydrated;
}



// const [activeTab, setActiveTab] = useLocalStorage("businessProfileActiveTab", "Basic Information");
// const hydrated = useHydrated();

// if (!hydrated) return null; // Avoid rendering mismatched UI during hydration