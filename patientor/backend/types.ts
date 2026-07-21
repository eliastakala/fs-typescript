// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export const Gender = {
  Male: 'male',
  Female: 'female',
} as const;

export type Gender = typeof Gender[keyof typeof Gender];
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type NewPatient = Omit<Patient, 'id'>;

export type NonSensitivePatientData = Omit<Patient, 'ssn'>;