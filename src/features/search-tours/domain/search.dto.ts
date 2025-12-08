export interface PriceOfferDto {
  id: string;
  amount: number;
  currency: "usd";
  startDate: string;
  endDate: string;
  hotelID?: string;
}

export type PricesMap = Record<string, PriceOfferDto>;

export interface PricesResponseDto {
  prices: PricesMap;
}

export interface StartSearchResponseDto {
  token: string;
  waitUntil: string;
}
