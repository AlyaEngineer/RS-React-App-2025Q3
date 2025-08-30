import { use } from 'react';
import type { CO2Data } from '../types/types';
import { DATA_SOURCE_URL } from '../constants/dataSourceURL';

let dataPromise: Promise<CO2Data> | null = null;

function fetchData(): Promise<CO2Data> {
  return fetch(DATA_SOURCE_URL).then((res) => res.json());
}

export function useData(): CO2Data {
  if (!dataPromise) {
    dataPromise = fetchData();
  }
  return use(dataPromise);
}
