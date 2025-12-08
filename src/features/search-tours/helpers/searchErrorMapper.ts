import type { ErrorResponseDto } from "../../../api/http/error.types";

export function mapStartError(err: ErrorResponseDto) {
  switch (err.code) {
    case 400:
      return "Потрібно обрати країну зі списку.";
    case 404:
      return "Країну не знайдено. Будь ласка, оберіть іншу.";
    default:
      return err.message ?? "Сталася невідома помилка.";
  }
}

export function mapPollError(err: ErrorResponseDto) {
  if (err.code === 425 && err.waitUntil) return null;

  return err.message ?? "Сталася помилка під час отримання результатів.";
}
