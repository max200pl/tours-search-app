import type { ErrorResponseDto } from "../../../api/http/error.types";

export interface CountryDto {
  id: string;
  name: string;
  flag: string;
}

export interface CityDto {
  id: number;
  name: string;
}

export interface HotelDto {
  id: number;
  name: string;
  img: string;
  cityId: number;
  cityName: string;
  countryId: string;
  countryName: string;
}

export type CountriesMap = Record<string, CountryDto>;
export type CitiesMap = Record<number, CityDto>;
export type HotelsMap = Record<string, HotelDto>;

export type GeoEntityDto =
  | (CountryDto & { type: "country" })
  | (CityDto & { type: "city" })
  | (HotelDto & { type: "hotel" });

export type GeoResponse = Record<string, GeoEntityDto>;

export type GetCountriesResponseDto = CountriesMap;

export type GetHotelsResponseDto = HotelsMap;

export type GetHotelResponseDto = HotelDto | ErrorResponseDto;

export type SearchGeoResponseDto = GeoResponse;
