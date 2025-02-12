import { useEffect, useState, useRef } from "react";

const useDistanceFromLeft = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [distance, setDistance] = useState<number>(0);

  useEffect(() => {
    const updateDistance = () => {
      if (ref.current) {
        const { left } = ref.current.getBoundingClientRect();
        setDistance(left);
      }
    };

    // Initial calculation
    updateDistance();

    // Recalculate distance on window resize
    window.addEventListener("resize", updateDistance);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", updateDistance);
    };
  }, [ref]);

  return [ref, distance] as const;
};

export default useDistanceFromLeft;
