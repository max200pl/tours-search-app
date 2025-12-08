import { useCallback, useRef, useState } from "react";
import { fetchCountries } from "../../geo/services/geo.service";
import { fetchHotelsByCountry } from "../services/hotels.service";
import { pollSearch } from "../services/search.service";
import { mergeSearchUI } from "../ui/mappers/search.ui.mapper";

import type { PricesMap } from "../domain/search.dto";
import type { HotelsMap } from "../../geo/domain/geo.dto";
import type { GeoUICountry } from "../../geo/ui/types/geo.ui.types";
import type { UITour } from "../ui/types/search.ui.types";

export function useSearchTours() {
  const [tours, setTours] = useState<UITour[] | null>(null);
  const [rawPrices, setRawPrices] = useState<PricesMap | null>(null);
  const [hotels, setHotels] = useState<HotelsMap | null>(null);
  const [countries, setCountries] = useState<GeoUICountry[] | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const lastCountryId = useRef<string | null>(null);

  const loadHotelsIfNeeded = async (countryId: string) => {
    if (hotels && lastCountryId.current === countryId) return hotels;
    const loaded = await fetchHotelsByCountry(countryId);
    setHotels(loaded);
    return loaded;
  };

  const loadCountriesIfNeeded = async () => {
    if (countries) return countries;
    const list = await fetchCountries();
    setCountries(list);
    return list;
  };

  const search = useCallback(
    async (countryId: string) => {
      setError(null);

      if (
        lastCountryId.current === countryId &&
        rawPrices &&
        hotels &&
        countries
      ) {
        const ui = mergeSearchUI(rawPrices, hotels, countries);
        setTours(ui);
        setIsEmpty(ui.length === 0);
        return;
      }

      setIsLoading(true);
      setIsEmpty(false);

      const result = await pollSearch(countryId);

      if (!result.ok) {
        setError(result.error);
        setTours(null);
        setIsLoading(false);
        return;
      }

      setRawPrices(result.prices);

      const [hotelsMap, countriesList] = await Promise.all([
        loadHotelsIfNeeded(countryId),
        loadCountriesIfNeeded(),
      ]);

      const ui = mergeSearchUI(result.prices, hotelsMap, countriesList);

      lastCountryId.current = countryId;

      setTours(ui);
      setIsEmpty(ui.length === 0);
      setIsLoading(false);
    },
    [rawPrices, hotels, countries]
  );

  return {
    search,
    tours,
    isLoading,
    error,
    isEmpty,
  };
}
