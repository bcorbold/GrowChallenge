
/*
  used for deep cloning JSON data. This wouldn't work if objects had functions attached to them, but for this purpose
  it's good enough
 */
export function copyJsonData(data) { return JSON.parse(JSON.stringify(data)); }

// puts the $ sign in the right place and adds decimals if needed
export function formatDollarAmount(amount) {
  let amountString = `${amount.toFixed(2)}`;
  if (amount < 0) {
    return `${amountString.slice(0, 1)}$${amountString.slice(1)}`;
  }
  return `$${amountString}`;
}
