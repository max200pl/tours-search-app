import { stopSearch } from "../../services/stop.service";
import type { SearchRefs, SearchState } from "./types";

export function useSearchCancel(refs: SearchRefs, state: SearchState) {
  return async function cancelSearch() {
    const token = refs.activeToken.current;

    refs.isSearching.current = false;

    // Abort polling
    refs.abortController.current?.abort();
    refs.abortController.current = null;

    // Stop server-side search
    if (token) {
      try {
        await stopSearch(token);
      } catch {}
    }

    refs.activeToken.current = null;
    state.setIsLoading(false);
  };
}
