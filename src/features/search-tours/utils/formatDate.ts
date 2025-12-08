export function formatTourDate(dateStr: string): string {
  if (!dateStr || dateStr.length < 10) return dateStr;

  const [year, month, day] = dateStr.split("-");

  return `${day}.${month}.${year}`;
}
