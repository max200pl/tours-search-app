import { useState } from "react";
import type { HotelsMap } from "../../../geo/domain/geo.dto";
import type { GeoUICountry } from "../../../geo/ui/types/geo.ui.types";
import type { PricesMap } from "../../domain/search.dto";
import type { UITour } from "../../ui/types/search.ui.types";

export function useSearchState() {
  const [tours, setTours] = useState<UITour[] | null>(null);
  const [rawPrices, setRawPrices] = useState<PricesMap | null>(null);
  const [hotels, setHotels] = useState<HotelsMap | null>(null);
  const [countries, setCountries] = useState<GeoUICountry[] | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return {
    tours,
    setTours,
    rawPrices,
    setRawPrices,
    hotels,
    setHotels,
    countries,
    setCountries,

    isLoading,
    setIsLoading,
    isEmpty,
    setIsEmpty,
    error,
    setError,
  };
}
