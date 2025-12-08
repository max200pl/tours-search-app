import { useGeoAutocomplete } from "../../../hooks/useGeoAutocomplete/index.ts";
import { useClickOutside } from "../../../../../hooks/useClickOutside";

import SearchInput from "../../../../../components/SearchInput/SearchInput";
import SearchToursDropdown from "./components/SearchToursDropdown";
import { fetchCountries, fetchGeoSearch } from "../../../services/geo.service";
import { isCountry } from "../../../domain/geo.guards";

import styles from "./SearchToursForm.module.scss";
import ActionButton from "../../../../../components/ActionButton/ActionButton.tsx";

export const SearchToursForm = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selected) {
      console.warn("No selection made");
      return;
    }

    console.log("Form submitted with selection:", selected);

    closeDropdown();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.form__title}>Форма пошуку турів</h1>
      <div className={styles.form__inputWrapper} ref={wrapperRef}>
        <SearchInput
          value={value}
          onChange={setValue}
          onFocus={openDropdown}
          onClick={openDropdown}
          onClear={clear}
          placeholder="Країна, місто або готель"
        />
        {error ? (
          <div className={styles.form__error}>{error}</div>
        ) : (
          <SearchToursDropdown
            items={items}
            isOpen={isOpen}
            isLoading={isLoading}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        )}
      </div>

      <ActionButton type="submit" label="Знайти" />
    </form>
  );
};
