export function formatDisplayOrderNumber(orderId: string): string {
  return orderId.replace(/-/g, "").slice(0, 8).toUpperCase();
}
