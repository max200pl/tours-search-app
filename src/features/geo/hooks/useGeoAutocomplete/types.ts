import type { GeoUIEntity } from "../../ui/types/geo.ui.types";

/* Public config for the hook */
export interface GeoConfig {
  fetchCountries: () => Promise<GeoUIEntity[]>;
  fetchSearch: (q: string) => Promise<GeoUIEntity[]>;
  getLabel: (item: GeoUIEntity) => string;
  isCountry: (item: GeoUIEntity) => boolean;
  onError?: (msg: string) => void;
}

/* Internal types */
export interface LoadersConfig {
  fetchCountries: GeoConfig["fetchCountries"];
  fetchSearch: GeoConfig["fetchSearch"];
  setError: (msg: string | null) => void;
  onError?: GeoConfig["onError"];
}

export interface ModeResolverConfig {
  debouncedValue: string;
  selected: GeoUIEntity | null;
  isCountry: GeoConfig["isCountry"];
  getLabel: GeoConfig["getLabel"];
}
