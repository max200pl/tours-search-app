import { apiRequest } from "../../../api/http/apiRequest";
import type { HotelsMap } from "../../geo/domain/geo.dto";
import { getHotels } from "../../../api/api";

const hotelsCache = new Map<string, HotelsMap>();

export async function fetchHotelsByCountry(
  countryId: string
): Promise<HotelsMap> {
  if (hotelsCache.has(countryId)) {
    return hotelsCache.get(countryId)!;
  }

  const data = await apiRequest<HotelsMap>(getHotels(countryId));

  hotelsCache.set(countryId, data);

  return data;
}
