import type { GeoCity, GeoCountry, GeoHotel } from "../../domain/geo.entity";

export interface GeoUICountry extends GeoCountry {
  icon: string;
}

export interface GeoUICity extends GeoCity {
  icon: string;
}

export interface GeoUIHotel extends GeoHotel {
  icon: string;
}

export type GeoUIEntity = GeoUICountry | GeoUICity | GeoUIHotel;
