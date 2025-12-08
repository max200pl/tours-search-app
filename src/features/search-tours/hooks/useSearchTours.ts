import { useState, useRef, useCallback } from "react";
import { pollSearch } from "../services/search.service";
import { mapPricesToUI } from "../ui/mappers/search.ui.mapper";
import type { PricesMap } from "../domain/search.dto";

export function useSearchTours() {
  const [tours, setTours] = useState<any[] | null>(null);
  const [raw, setRaw] = useState<PricesMap | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const lastCountryId = useRef<string | null>(null);

  const search = useCallback(
    async (countryId: string) => {
      if (lastCountryId.current === countryId && raw) {
        return;
      }

      setIsLoading(true);
      setError(null);
      setIsEmpty(false);

      const result = await pollSearch(countryId);

      if (!result.ok) {
        setError(result.error);
        setIsLoading(false);
        setTours(null);
        return;
      }

      lastCountryId.current = countryId;

      setRaw(result.prices);

      const ui = mapPricesToUI(result.prices);

      setTours(ui);
      setIsEmpty(ui.length === 0);
      setIsLoading(false);
    },
    [raw, tours]
  );

  return {
    search,
    tours,
    isLoading,
    error,
    isEmpty,
  };
}
