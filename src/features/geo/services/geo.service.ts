import { apiRequest } from "../../../api/http/apiRequest";
import { getCountries, searchGeo } from "../../../api/api.js";
import type { CountriesMap, GeoResponse } from "../domain/geo.dto";

import { attachIcon, mapGeoToUI } from "../ui/mappers/geo.ui.mapper";
import type { GeoUICountry, GeoUIEntity } from "../ui/types/geo.ui.types";

let countriesCache: GeoUICountry[] | null = null;
const searchCache = new Map<string, GeoUIEntity[]>();

export async function fetchCountries(): Promise<GeoUICountry[]> {
  if (countriesCache) return countriesCache;

  const raw = await apiRequest<CountriesMap>(getCountries());

  const list: GeoUICountry[] = Object.values(raw).map(
    (c) => attachIcon({ ...c, type: "country" }) as GeoUICountry
  );

  countriesCache = list;
  return list;
}

export async function fetchGeoSearch(query: string): Promise<GeoUIEntity[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  if (searchCache.has(trimmed)) {
    return searchCache.get(trimmed)!;
  }

  const data = await apiRequest<GeoResponse>(searchGeo(trimmed));
  const list = mapGeoToUI(data);

  searchCache.set(trimmed, list);

  return list;
}
