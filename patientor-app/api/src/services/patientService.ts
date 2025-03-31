import patients from '../../data/patients';
import { Gender, NewPatientEntry, NonSensitivePatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
  return patients.map(p => ({
    id: p.id,
    name: p.name,
    dateOfBirth: p.dateOfBirth,
    gender: p.gender as Gender,
    occupation: p.occupation,
  }));
} 

const getPatientById = ( id: string ): Patient | undefined => {
  return patients.find(p => p.id === id);
}

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const newPatientEntry : Patient = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getNonSensitiveEntries,
  getPatientById,
  addPatient,
};