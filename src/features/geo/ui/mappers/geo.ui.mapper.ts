import type { GeoResponse } from "../../domain/geo.dto";
import type { GeoEntityType, GeoEntity } from "../../domain/geo.entity";
import type { GeoUIEntity } from "../types/geo.ui.types";

export const GEO_ICONS: Record<GeoEntityType, string> = {
  country: "🌍",
  city: "🏙️",
  hotel: "🏨",
};

export function attachIcon(entity: GeoEntity): GeoUIEntity {
  return {
    ...entity,
    icon: GEO_ICONS[entity.type],
  };
}

export function mapGeoToUI(geo: GeoResponse): GeoUIEntity[] {
  return Object.values(geo).map(attachIcon);
}
