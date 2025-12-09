import { useRef } from "react";

export function useSearchRefs() {
  const activeToken = useRef<string | null>(null);
  const abortController = useRef<AbortController | null>(null);
  const lastCountryId = useRef<string | null>(null);
  const isSearching = useRef(false);

  return {
    activeToken,
    abortController,
    lastCountryId,
    isSearching,
  };
}
