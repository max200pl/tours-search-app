import type { PricesMap } from "../../domain/search.dto";
import type { HotelsMap } from "../../../geo/domain/geo.dto";
import type { UITour } from "../types/search.ui.types";
import type { GeoUICountry } from "../../../geo/ui/types/geo.ui.types";

export function buildCountriesMap(list: GeoUICountry[]) {
  return Object.fromEntries(list.map((c) => [c.id, c]));
}

export function mapPricesToUI(
  prices: PricesMap,
  hotels: HotelsMap,
  countries: Record<string, GeoUICountry>
): UITour[] {
  return Object.values(prices).map((price) => {
    const hotel = hotels[price.hotelID ?? ""] ?? null;
    const country = hotel ? countries[hotel.countryId] : null;

    return {
      ...price,
      hotel,
      flag: country?.flag ?? null,
    };
  });
}

export function mergeSearchUI(
  raw: PricesMap,
  hotels: HotelsMap,
  countries: GeoUICountry[]
): UITour[] {
  const countriesList = buildCountriesMap(countries);
  return mapPricesToUI(raw, hotels, countriesList);
}
