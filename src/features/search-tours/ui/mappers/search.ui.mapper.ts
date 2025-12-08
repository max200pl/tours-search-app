import type { PricesMap } from "../../domain/search.dto";
import type { Tour } from "../types/search.ui.types";

export function mapPricesToUI(raw: PricesMap): Tour[] {
  return Object.values(raw).map((p) => ({
    id: p.id,
    amount: p.amount,
    currency: p.currency,
    startDate: p.startDate,
    endDate: p.endDate,
    hotelId: p.hotelID ?? null,
  }));
}
