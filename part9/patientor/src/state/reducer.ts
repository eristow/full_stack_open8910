import { State } from './state';
import { Diagnosis, Patient } from '../types';

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patients,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient,
  };
};

export const addPatientSensitive = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT_SENSITIVE',
    payload: patient,
  };
};

export const setDiagnoses = (diagnoses: Array<Diagnosis>): Action => {
  return {
    type: 'SET_DIAGNOSES',
    payload: diagnoses,
  };
};

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'ADD_PATIENT_SENSITIVE';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSES';
      payload: Array<Diagnosis>;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {},
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'ADD_PATIENT_SENSITIVE':
      return {
        ...state,
        patientsSensitive: {
          ...state.patientsSensitive,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_DIAGNOSES':
      return {
        ...state,
        diagnoses: action.payload,
      };
    default:
      return state;
  }
};
