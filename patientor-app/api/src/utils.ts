import { z } from "zod";
import { Diagnosis, Gender } from "./types";

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
})

const toNewEntry = (object: unknown) => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  const newEntrySchema = z.object({
    date: z.string().date(),
    description: z.string(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
  })
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};