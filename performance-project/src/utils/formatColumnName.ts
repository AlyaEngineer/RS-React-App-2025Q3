export function formatColumnName(col: string) {
  let formatted = col
    .replace(/_/g, ' ')
    .replace(/co2/gi, 'CO₂')
    .replace(/ch4/gi, 'CH₄')
    .replace(/n2o/gi, 'N₂O')
    .replace(/ghg/gi, 'GHG')
    .replace(/lucf/gi, 'LUCF')
    .replace(/luc/gi, 'LUC')
    .replace(/abs/gi, 'ABS')
    .replace(/prct/gi, '%');

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
