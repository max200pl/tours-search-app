import { stopSearchPrices } from "../../../api/api.js";
import type { ErrorResponseDto } from "../../../api/http/error.types.js";

export async function stopSearch(token: string) {
  if (!token) {
    return;
  }

  try {
    const resp = await stopSearchPrices(token);

    if (resp.ok) {
      return { ok: true as const };
    }

    const err = (await resp.json()) as ErrorResponseDto;
    return {
      ok: false as const,
      error: err.message ?? "Не вдалося скасувати пошук.",
    };
  } catch (e: any) {
    if (e instanceof Response) {
      try {
        const err = (await e.json()) as ErrorResponseDto;
        return {
          ok: false as const,
          error: err.message ?? "Не вдалося скасувати пошук.",
        };
      } catch {
        return {
          ok: false as const,
          error: "Помилка обробки відповіді сервера.",
        };
      }
    }

    return {
      ok: false as const,
      error: "Сталася невідома помилка при скасуванні.",
    };
  }
}
