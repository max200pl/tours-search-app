import type { CityDto, CountryDto, HotelDto } from "./geo.dto";

export type GeoEntityType = "country" | "city" | "hotel";

export interface GeoCountry extends CountryDto {
  type: "country";
}

export interface GeoCity extends CityDto {
  type: "city";
}

export interface GeoHotel extends HotelDto {
  type: "hotel";
}

export type GeoEntity = GeoCountry | GeoCity | GeoHotel;
