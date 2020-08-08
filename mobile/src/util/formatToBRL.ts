export default function formatToBRL(number: number): string {
  const formatted = number.toString().split('.');

  if (formatted.length > 1) {
    return `R$ ${formatted[0]},${(formatted[0] + '00').substr(0, 2)}`;
  }

  return `R$ ${formatted[0]},00`;
}
