import patients from '../../data/patients';
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';
import { v1 as uuid } from 'uuid';
const id = uuid()

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
} 

const addEntry = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    id: String(id),
    ...entry
  }
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
};