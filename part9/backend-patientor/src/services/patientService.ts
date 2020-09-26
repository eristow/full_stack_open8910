import patients from '../../data/patients';
import { Patient, NewPatient, PublicPatient } from '../types';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newId = `d277${String(
    Math.floor(1000 + Math.random() * 9000),
  )}-f723-11e9-8f0b-362b9e155667`;
  const newPatient = {
    id: newId,
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  findById,
};
