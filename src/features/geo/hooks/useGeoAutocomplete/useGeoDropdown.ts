import { useCallback } from "react";

export function useGeoDropdown() {
  const openDropdown = useCallback(() => true, []);
  const closeDropdown = useCallback(() => false, []);

  return { openDropdown, closeDropdown };
}
