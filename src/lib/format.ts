/* قیمت را به ریال می‌دهد */
export const formatPrice = (rial?: number) =>
  typeof rial === "number" ? (rial / 10).toLocaleString("fa-IR") : "—";