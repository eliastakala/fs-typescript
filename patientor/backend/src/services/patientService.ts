/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import data from "../../data/patients.ts";
import type {
  NonSensitivePatient,
  Patient,
  NewPatient,
  EntryWithoutId,
} from "../../types.ts";
import { v1 as uuid } from "uuid";

const patients = data;

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const personId: string = uuid();
  const newPatient = {
    id: personId,
    ...entry,
    entries: []
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: EntryWithoutId): Patient => {
  const patient = getPatientById(id);
  if (!patient) {
    throw new Error(`Patient not found: ${id}`);
  }
  const entryId: string = uuid();
  const entryToAdd = {...entry, id: entryId};
  patient.entries.push(entryToAdd);
  return patient;
};

export default {
  getPatients,
  getPatientById,
  addPatient,
  addEntry
};
