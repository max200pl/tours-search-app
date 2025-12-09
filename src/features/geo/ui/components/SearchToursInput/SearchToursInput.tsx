import SearchInput from "../../../../../components/SearchInput/SearchInput";
import { useClickOutside } from "../../../../../hooks/useClickOutside";
import { isCountry } from "../../../domain/geo.guards";
import { useGeoAutocomplete } from "../../../hooks/useGeoAutocomplete";
import { fetchCountries, fetchGeoSearch } from "../../../services/geo.service";
import type { GeoUIEntity } from "../../types/geo.ui.types";
import SearchToursDropdown from "./components/SearchToursDropdown";

import styles from "./SearchToursInput.module.scss";
interface SearchToursInputProps {
  onSelectChange?: (value: GeoUIEntity | null) => void;
  onTypingCancel?: () => void;
}

export default function SearchToursInput({
  onSelectChange,
  onTypingCancel,
}: SearchToursInputProps) {
  const {
    value,
    setValue,
    items,
    selected,
    isOpen,
    isLoading,
    select,
    clear,
    openDropdown,
    closeDropdown,
    error,
  } = useGeoAutocomplete({
    fetchCountries,
    fetchSearch: fetchGeoSearch,
    getLabel: (item) => item.name,
    isCountry,
    onError: (error) => console.error("Error fetching data:", error),
  });

  const wrapperRef = useClickOutside<HTMLDivElement>(() => {
    closeDropdown();
  });

  return (
    <div className={styles.input}>
      <div className={styles.input__control} ref={wrapperRef}>
        <SearchInput
          value={value}
          onChange={(text) => {
            setValue(text);
            onTypingCancel?.();
          }}
          onFocus={openDropdown}
          onClick={openDropdown}
          onClear={() => {
            clear();
            onSelectChange?.(null);
            onTypingCancel?.();
          }}
          placeholder="Країна, місто або готель"
        />

        {error && <div className={styles.input__error}>{error}</div>}

        {!error && (
          <SearchToursDropdown
            items={items}
            isOpen={isOpen}
            isLoading={isLoading}
            selectedId={selected?.id ?? null}
            onSelect={(item) => {
              select(item);
              onSelectChange?.(item);
            }}
          />
        )}
      </div>
    </div>
  );
}
