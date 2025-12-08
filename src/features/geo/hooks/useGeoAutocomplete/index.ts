import { useEffect } from "react";
import { useDebounce } from "../../../../hooks/useDebounce";
import type { GeoConfig } from "./types";

import { useGeoLoaders } from "./useGeoLoaders";
import { useGeoModeResolver } from "./useGeoModeResolver";
import { useGeoState } from "./useGeoState";
import type { GeoUIEntity } from "../../ui/types/geo.ui.types";

export function useGeoAutocomplete(config: GeoConfig) {
  const { fetchCountries, fetchSearch, getLabel, isCountry, onError } = config;

  const {
    value,
    setValue,
    selected,
    setSelected,
    items,
    setItems,
    isOpen,
    setIsOpen,
    isLoading,
    setIsLoading,
    error,
    setError,
  } = useGeoState();

  const debouncedValue = useDebounce(value, 300);

  const { loadCountries, loadSearch } = useGeoLoaders({
    fetchCountries,
    fetchSearch,
    setError,
    onError,
  });

  const mode = useGeoModeResolver({
    debouncedValue,
    selected,
    isCountry,
    getLabel,
  });

  useEffect(() => {
    if (!isOpen) return;

    let active = true;

    async function run() {
      try {
        setIsLoading(true);

        if (value.trim() === "") {
          const list = await loadCountries();
          if (!active) return;

          setItems(list);
          setError(null);
          return;
        }

        if (error) return;

        const list =
          mode === "countries"
            ? await loadCountries()
            : await loadSearch(debouncedValue);

        if (!active) return;

        setItems(list);
        setError(null);
      } finally {
        active && setIsLoading(false);
      }
    }

    run();
    return () => {
      active = false;
    };
  }, [isOpen, mode, value, debouncedValue]);

  const select = (item: GeoUIEntity) => {
    setSelected(item);
    setValue(getLabel(item));
    setError(null);
    setIsOpen(false);
  };

  const clear = () => {
    setSelected(null);
    setValue("");
    setIsOpen(true);
  };

  return {
    value,
    setValue,
    items,
    selected,
    isOpen,
    isLoading,
    error,
    select,
    clear,
    openDropdown: () => setIsOpen(true),
    closeDropdown: () => setIsOpen(false),
  };
}
