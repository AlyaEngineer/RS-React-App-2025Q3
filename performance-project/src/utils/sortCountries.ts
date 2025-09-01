import { CO2Data } from '@/types/dataTypes';

export function sortCountriesByPopulation(
  data: CO2Data,
  countries: string[],
  year: number,
  order: 'ascending' | 'descending' = 'descending'
): string[] {
  return [...countries].sort((a, b) => {
    const populationA = data[a].data.find((d) => d.year === year)?.population ?? 0;
    const populationB = data[b].data.find((d) => d.year === year)?.population ?? 0;

    return order === 'ascending' ? populationA - populationB : populationB - populationA;
  });
}
