import { useState, useEffect, useRef, useCallback } from "react";

type Cancelable = () => void;

export const useDebounce = <T>(value: T, delay: number): [T, Cancelable] => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    cancel(); // Cancel the previous timeout if value or delay changes
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return cancel; // Cleanup on unmount
  }, [value, delay, cancel]);

  return [debouncedValue, cancel];
};
