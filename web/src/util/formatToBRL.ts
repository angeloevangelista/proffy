export default function formatToBRL(number: number): string {
  const formatter = new Intl.NumberFormat([], {
    style: 'currency',
    currency: 'BRL',
  });

  return formatter.format(number);
}
