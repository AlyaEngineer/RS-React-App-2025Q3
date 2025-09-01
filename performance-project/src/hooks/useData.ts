import { use } from 'react';
import type { CO2Data } from '../types/dataTypes';
import { DATA_SOURCE_URL } from '../constants/dataSourceURL';

let dataPromise: Promise<CO2Data> | null = null;
let yearsPromise: Promise<number[]> | null = null;

function fetchData(): Promise<CO2Data> {
  return fetch(DATA_SOURCE_URL).then((res) => res.json());
}

function fetchYears(): Promise<number[]> {
  if (!dataPromise) dataPromise = fetchData();
  return dataPromise.then((data) => {
    const years = Array.from(
      new Set(Object.values(data).flatMap((country) => country.data.map((d) => d.year)))
    ).sort((a, b) => a - b);
    return years;
  });
}

export function useData(): CO2Data {
  if (!dataPromise) {
    dataPromise = fetchData();
  }
  return use(dataPromise);
}

export function useYears(): number[] {
  if (!yearsPromise) {
    yearsPromise = fetchYears();
  }
  return use(yearsPromise);
}
