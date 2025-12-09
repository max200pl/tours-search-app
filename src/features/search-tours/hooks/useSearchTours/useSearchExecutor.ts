import { pollSearch } from "../../services/search.service";
import { mergeSearchUI } from "../../ui/mappers/search.ui.mapper";

import type { SearchState, SearchRefs } from "./types";

export function useSearchExecutor(
  refs: SearchRefs,
  state: SearchState,
  loaders: { loadHotels: any; loadCountries: any }
) {
  return async function search(countryId: string) {
    state.setError(null);

    if (refs.isSearching.current) {
      refs.abortController.current?.abort();
    }

    refs.isSearching.current = true;
    state.setIsLoading(true);
    state.setIsEmpty(false);

    refs.abortController.current = new AbortController();
    const signal = refs.abortController.current.signal;

    const result = await pollSearch(countryId, signal);

    if (!refs.isSearching.current) return;

    if (!result.ok) {
      state.setError(result.error ?? "Сталася помилка");
      state.setTours(null);
      state.setIsLoading(false);
      refs.isSearching.current = false;
      return;
    }

    refs.activeToken.current = result.token;
    refs.lastCountryId.current = countryId;
    state.setRawPrices(result.prices);

    const [hotels, countries] = await Promise.all([
      loaders.loadHotels(countryId),
      loaders.loadCountries(),
    ]);

    if (!refs.isSearching.current) return;

    const ui = mergeSearchUI(result.prices, hotels, countries);

    state.setTours(ui);
    state.setIsEmpty(ui.length === 0);
    state.setIsLoading(false);

    refs.activeToken.current = null;
    refs.abortController.current = null;
    refs.isSearching.current = false;
  };
}
