import { type NewPatient, Gender, HealthCheckRating, type EntryWithoutId } from "./types.ts";
import { z } from "zod";

const newPatientEntry = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export const parseNewPatient = (object: unknown): NewPatient => {
  return newPatientEntry.parse(object);
};

const newHospitalEntry = z.object({
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  type: z.literal("Hospital"),
  discharge: z.object({ date: z.string(), criteria: z.string() }),
});

const newOccupationalHealthcareEntry = z.object({
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
});

const newHealthCheckEntry = z.object({
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  type: z.literal("HealthCheck"),
  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
  ]),
});

export const parseNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object" || !("type" in object)) {
    throw new Error("Incorrect or missing data");
  }

  switch (object.type) {
    case "HealthCheck":
      return newHealthCheckEntry.parse(object);
    case "Hospital":
      return newHospitalEntry.parse(object);
    case "OccupationalHealthcare":
      return newOccupationalHealthcareEntry.parse(object);
    default:
      throw new Error(`Unhandled entry type: ${String(object.type)}`);
  }
};
