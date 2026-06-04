/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import data from "../../data/patients.ts";
import type {
  NonSensitivePatientData,
  Patient,
  NewPatient,
} from "../../types.ts";
import { v1 as uuid } from "uuid";

const patients = data;

const getPatients = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const personId: string = uuid();
  const newPatient = {
    id: personId,
    ...entry,
  };
  console.log("new patient", newPatient);

  patients.push(newPatient);
  return newPatient;
};
export default {
  getPatients,
  addPatient,
};
