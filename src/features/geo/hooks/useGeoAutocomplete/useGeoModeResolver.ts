import { useMemo } from "react";
import type { ModeResolverConfig } from "./types";

export function useGeoModeResolver({
  debouncedValue,
  selected,
  isCountry,
  getLabel,
}: ModeResolverConfig): "countries" | "search" {
  return useMemo(() => {
    const trimmed = debouncedValue.trim();

    if (!trimmed) return "countries";

    if (selected && isCountry(selected)) {
      const label = getLabel(selected)?.trim();
      if (trimmed === label) return "countries";
    }

    return "search";
  }, [debouncedValue, selected, isCountry, getLabel]);
}
