export function getUAWordEnding(word: string, amount: number) {
  if (amount >= 10 && amount <= 19) return word;

  if (String(amount).endsWith("1")) {
    return word + "а";
  }
  if ([0, 5, 6, 7, 8, 9].includes(Number(String(amount).slice(-1)))) {
    return word;
  }
  return word + "и";
}
