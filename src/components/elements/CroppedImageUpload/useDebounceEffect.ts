import { useEffect, DependencyList } from 'react';

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps: DependencyList = [] // Default to an empty array if not provided
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn();
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, [fn, waitTime, ...deps]); // Include fn and waitTime to avoid potential stale closures
}
