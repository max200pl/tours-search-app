import { useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement>(handler: () => void) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current) return;
      if (ref.current.contains(event.target as Node)) return;

      handler();
    };

    document.addEventListener("mousedown", listener, true);
    document.addEventListener("touchstart", listener, true);

    return () => {
      document.removeEventListener("mousedown", listener, true);
      document.removeEventListener("touchstart", listener, true);
    };
  }, [handler]);

  return ref;
}
