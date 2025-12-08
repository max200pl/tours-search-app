import { useCallback } from "react";
import type { LoadersConfig } from "./types";
import type { ErrorResponseDto } from "../../../../api/http/error.types";

export function useGeoLoaders(config: LoadersConfig) {
  const { fetchCountries, fetchSearch, setError, onError } = config;

  const handleError = useCallback(
    (err: unknown): string => {
      const msg =
        (err as ErrorResponseDto)?.message ??
        (err instanceof Error ? err.message : null) ??
        "Помилка завантаження. Спробуйте пізніше.";

      setError(msg);
      onError?.(msg);

      return msg;
    },
    [setError, onError]
  );

  const loadCountries = useCallback(async () => {
    try {
      const list = await fetchCountries();
      setError(null);
      return list;
    } catch (err) {
      handleError(err);
      return [];
    }
  }, [fetchCountries, setError, handleError]);

  const loadSearch = useCallback(
    async (query: string) => {
      try {
        const list = await fetchSearch(query);
        setError(null);
        return list;
      } catch (err) {
        handleError(err);
        return [];
      }
    },
    [fetchSearch, setError, handleError]
  );

  return { loadCountries, loadSearch };
}
