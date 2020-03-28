export function formatCurrency(value) {
  return Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency'}).format(value);
}
