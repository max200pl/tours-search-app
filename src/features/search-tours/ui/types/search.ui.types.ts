export interface Tour {
  id: string;
  amount: number;
  currency: string;
  startDate: string;
  endDate: string;
  hotelId: string | null;
}
