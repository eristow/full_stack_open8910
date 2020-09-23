import diagnoses from '../../data/diagnoses';
import { Diagnose } from '../types';

const getDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};

const addDiagnose = (): [] => {
  return [];
};

export default {
  getDiagnoses,
  addDiagnose,
};
