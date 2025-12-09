import { fetchCountries } from "../../../geo/services/geo.service";
import { fetchHotelsByCountry } from "../../services/hotels.service";

import type { SearchState } from "./types";

export function useSearchLoader(state: SearchState) {
  const loadHotels = async (countryId: string) => {
    const loaded = await fetchHotelsByCountry(countryId);
    state.setHotels(loaded);
    return loaded;
  };

  const loadCountries = async () => {
    if (state.countries) return state.countries;

    const loaded = await fetchCountries();
    state.setCountries(loaded);
    return loaded;
  };

  return { loadHotels, loadCountries };
}
