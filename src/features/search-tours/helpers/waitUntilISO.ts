export function waitUntilISO(iso: string): Promise<void> {
  const target = new Date(iso).getTime();
  const now = Date.now();
  const diff = target - now;

  return diff > 0
    ? new Promise((res) => setTimeout(res, diff))
    : Promise.resolve();
}
