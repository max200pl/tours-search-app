import type { GeoEntity, GeoCountry, GeoCity, GeoHotel } from "./geo.entity";

export const isCountry = (e: GeoEntity): e is GeoCountry =>
  e.type === "country";
export const isCity = (e: GeoEntity): e is GeoCity => e.type === "city";
export const isHotel = (e: GeoEntity): e is GeoHotel => e.type === "hotel";
