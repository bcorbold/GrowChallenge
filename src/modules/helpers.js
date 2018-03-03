
export function copyJsonData(data) { return JSON.parse(JSON.stringify(data)); }

export function formatDollarAmount(amount) {
  let amountString = `${amount.toFixed(2)}`;
  if (amount < 0) {
    return `${amountString.slice(0, 1)}$${amountString.slice(1)}`;
  }
  return `$${amountString}`;
}
