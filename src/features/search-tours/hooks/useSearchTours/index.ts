import { useSearchState } from "./useSearchState";
import { useSearchRefs } from "./useSearchRefs";
import { useSearchLoader } from "./useSearchLoaders";
import { useSearchCancel } from "./useSearchCancel";
import { useSearchExecutor } from "./useSearchExecutor";

import type { UseSearchResult } from "./types";

export function useSearchTours(): UseSearchResult {
  const state = useSearchState();
  const refs = useSearchRefs();

  const loaders = useSearchLoader(state);
  const cancel = useSearchCancel(refs, state);
  const search = useSearchExecutor(refs, state, loaders);

  return {
    search,
    cancelSearch: cancel,
    tours: state.tours,
    isLoading: state.isLoading,
    error: state.error,
    isEmpty: state.isEmpty,
  };
}
