import data from '../../data/patients.ts';
import type { NonSensitivePatientData } from '../../types.ts';

const getEntries = (): NonSensitivePatientData[] => {
  return data.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getEntries
};