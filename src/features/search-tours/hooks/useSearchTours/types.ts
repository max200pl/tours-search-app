import type { RefObject } from "react";
import type { HotelsMap } from "../../../geo/domain/geo.dto";
import type { GeoUICountry } from "../../../geo/ui/types/geo.ui.types";
import type { PricesMap } from "../../domain/search.dto";
import type { UITour } from "../../ui/types/search.ui.types";

export interface SearchRefs {
  activeToken: RefObject<string | null>;
  abortController: RefObject<AbortController | null>;
  lastCountryId: RefObject<string | null>;
  isSearching: RefObject<boolean>;
}

export interface SearchState {
  tours: UITour[] | null;
  rawPrices: PricesMap | null;
  hotels: HotelsMap | null;
  countries: GeoUICountry[] | null;

  isLoading: boolean;
  isEmpty: boolean;
  error: string | null;

  setTours: (t: UITour[] | null) => void;
  setRawPrices: (p: PricesMap | null) => void;
  setHotels: (h: HotelsMap | null) => void;
  setCountries: (c: GeoUICountry[] | null) => void;
  setIsLoading: (v: boolean) => void;
  setIsEmpty: (v: boolean) => void;
  setError: (e: string | null) => void;
}

export interface UseSearchResult {
  search: (countryId: string) => Promise<void>;
  cancelSearch: () => Promise<void>;
  tours: UITour[] | null;
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
}
