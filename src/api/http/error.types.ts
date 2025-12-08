export interface ErrorResponseDto {
  code: number;
  error: true;
  message: string;
  waitUntil?: string;
}
