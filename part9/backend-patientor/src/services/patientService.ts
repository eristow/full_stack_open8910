import patients from '../../data/patients';
import { NonSensitivePatient, Patient } from '../types';

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

const addPatient = (): [] => {
  return [];
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
};
