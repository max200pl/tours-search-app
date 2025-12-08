export function formatCurrency(amount: number, currency: string) {
  switch (currency.toLowerCase()) {
    case "usd":
      return `$${amount.toLocaleString("en-US")}`;
    case "eur":
      return `€${amount.toLocaleString("de-DE")}`;
    case "uah":
    case "грн":
      return `${amount.toLocaleString("uk-UA")} ₴`;
    default:
      return `${amount} ${currency}`;
  }
}
