import type { ErrorResponseDto } from "./error.types";

export async function apiRequest<T>(call: Promise<Response>): Promise<T> {
  try {
    const res = await call;

    if (res.ok) {
      return res.json() as Promise<T>;
    }
    const err = (await res.json()) as ErrorResponseDto;
    throw err;
  } catch (e) {
    if (e instanceof Response) {
      const data = (await e.json()) as ErrorResponseDto;
      throw data;
    }

    throw {
      error: true,
      code: 500,
      message: "Unexpected client error",
    } satisfies ErrorResponseDto;
  }
}
