import data from '../../data/diagnoses.ts';
import type { Diagnosis } from '../../types.ts';

const getEntries = (): Diagnosis[] => {
  return data;
};

export default {
  getEntries
};