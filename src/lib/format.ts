export const indianNumberFormatter = new Intl.NumberFormat("en-IN");
export const indianCurrencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

export function formatIndianNumber(value: number | bigint) {
  return indianNumberFormatter.format(Number(value));
}

export function formatIndianCurrency(value: number) {
  return indianCurrencyFormatter.format(value);
}

export default formatIndianNumber;
