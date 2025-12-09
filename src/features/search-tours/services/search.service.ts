import { startSearchPrices, getSearchPrices } from "../../../api/api.js";
import type { ErrorResponseDto } from "../../../api/http/error.types.js";

import type {
  StartSearchResponseDto,
  PricesResponseDto,
} from "../domain/search.dto";

import { mapPollError, mapStartError } from "../helpers/searchErrorMapper.js";
import { waitUntilISO } from "../helpers/waitUntilISO.js";

export async function pollSearch(countryId: string, signal?: AbortSignal) {
  let retryCount = 0;
  let startResp: Response;

  try {
    startResp = await startSearchPrices(countryId);
  } catch (e: any) {
    if (signal?.aborted) {
      return { ok: false, cancelled: true } as const;
    }

    if (e instanceof Response) {
      try {
        const err = (await e.json()) as ErrorResponseDto;
        return { ok: false, error: mapStartError(err) } as const;
      } catch {}
    }

    return { ok: false, error: "Сталася невідома помилка." } as const;
  }

  if (signal?.aborted) {
    return { ok: false, cancelled: true } as const;
  }

  if (!startResp.ok) {
    const err = (await startResp.json()) as ErrorResponseDto;
    return { ok: false, error: mapStartError(err) } as const;
  }

  const startJson = (await startResp.json()) as StartSearchResponseDto;
  const token = startJson.token;
  let waitUntil = startJson.waitUntil;

  while (true) {
    if (signal?.aborted) {
      return { ok: false, cancelled: true, token } as const;
    }

    await waitUntilISO(waitUntil);

    if (signal?.aborted) {
      return { ok: false, cancelled: true, token } as const;
    }

    try {
      const response = await getSearchPrices(token);

      if (signal?.aborted) {
        return { ok: false, cancelled: true, token } as const;
      }

      if (response.status === 200) {
        const data = (await response.json()) as PricesResponseDto;
        return {
          ok: true,
          token,
          prices: data.prices,
        } as const;
      }

      const err = (await response.json()) as ErrorResponseDto;

      if (err.code === 425 && err.waitUntil) {
        waitUntil = err.waitUntil;
        continue;
      }

      return {
        ok: false,
        token,
        error: mapPollError(err),
      } as const;
    } catch {
      retryCount++;
      if (retryCount >= 2) {
        return {
          ok: false,
          token,
          error: "Не вдалося отримати результати. Спробуйте пізніше.",
        } as const;
      }
    }
  }
}
