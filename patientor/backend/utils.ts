import { type NewPatient, Gender } from "./types.ts";
import { z } from "zod";

const newPatientEntry = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

const parseNewPatient = (object: unknown): NewPatient => {
  return newPatientEntry.parse(object);
};

export default parseNewPatient;
