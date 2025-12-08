import { useState } from "react";
import ActionButton from "../../components/ActionButton/ActionButton";
import SearchToursInput from "../../features/geo/ui/components/SearchToursInput/SearchToursInput";
import type { GeoUIEntity } from "../../features/geo/ui/types/geo.ui.types";
import { useSearchTours } from "../../features/search-tours/hooks/useSearchTours";
import SearchToursEmpty from "../../features/search-tours/ui/components/SearchToursEmpty";
import SearchToursError from "../../features/search-tours/ui/components/SearchToursError";
import SearchToursLoader from "../../features/search-tours/ui/components/SearchToursLoader";
import SearchToursGrid from "../../features/search-tours/ui/components/SearchToursGrid";

import styles from "./SearchToursPage.module.scss";

export const SearchToursPage = () => {
  const [selectedCountry, setSelectedCountry] = useState<GeoUIEntity | null>(
    null
  );

  const { search, tours, isLoading, error, isEmpty } = useSearchTours();

  const handleSearchClick = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCountry) {
      console.warn("Country not selected");
      return;
    }

    if (selectedCountry.type !== "country") {
      console.warn("Selected entity is not a country");
      return;
    }

    search(selectedCountry.id);
  };

  return (
    <div className={styles.page}>
      <form className={styles.page__form} onSubmit={handleSearchClick}>
        <h1 className={styles.page__form_title}>Форма пошуку турів</h1>

        <SearchToursInput onSelectChange={setSelectedCountry} />

        <ActionButton
          type="submit"
          disabled={!selectedCountry || selectedCountry.type !== "country"}
          label="Знайти"
        />

        {error && <SearchToursError message={error} />}
      </form>

      <div className={styles.page__results}>
        {isLoading && <SearchToursLoader />}

        {isEmpty && !isLoading && !error && <SearchToursEmpty />}

        {!isLoading && !error && tours && tours.length > 0 && (
          <SearchToursGrid tours={tours} />
        )}
      </div>
    </div>
  );
};

export default SearchToursPage;
