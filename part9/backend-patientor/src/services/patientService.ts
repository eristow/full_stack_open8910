import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import {
  Patient,
  NewPatient,
  Entry,
  NewEntry,
  NonSensitivePatient,
} from '../types';

let savedPatients = [...patients];

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return savedPatients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    }),
  );
};

const addPatient = (patient: NewPatient): Patient => {
  const newId = uuid();
  const newPatient = {
    id: newId,
    ...patient,
    entries: [] as Entry[],
  };

  savedPatients = savedPatients.concat(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const patient = savedPatients.find(p => p.id === id);
  return patient;
};

const addEntry = (patient: Patient, entry: NewEntry): Patient => {
  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };
  const updatedPatient = {
    ...patient,
    entries: patient.entries.concat(newEntry),
  };

  savedPatients = savedPatients.map(p =>
    p.id === updatedPatient.id ? updatedPatient : p,
  );

  return updatedPatient;
};

export default {
  getNonSensitivePatients,
  addPatient,
  findById,
  addEntry,
};
