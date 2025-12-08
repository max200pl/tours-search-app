import type { PriceOfferDto } from "../../domain/search.dto";
import type { CountryDto, HotelDto } from "../../../geo/domain/geo.dto";

export interface UITour extends PriceOfferDto {
  hotel: HotelDto | null;
  flag: CountryDto["flag"] | null;
}
