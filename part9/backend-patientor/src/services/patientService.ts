import patients from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatient } from '../types';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newId = `d277${String(Math.floor(1000 + Math.random() * 9000))}-f723-11e9-8f0b-362b9e155667`;
  const newPatient = {
    id: newId,
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
};
