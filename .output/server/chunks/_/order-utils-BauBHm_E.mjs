function formatDisplayOrderNumber(orderId) {
  return orderId.replace(/-/g, "").slice(0, 8).toUpperCase();
}
export {
  formatDisplayOrderNumber as f
};
