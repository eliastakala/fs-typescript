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

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NewPatient = Omit<Patient, 'id'>;

export type NonSensitivePatientData = Omit<Patient, 'ssn'>;