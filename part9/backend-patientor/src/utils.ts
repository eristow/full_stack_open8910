/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  NewPatient,
  Gender,
  EntryTypes,
  HealthCheckRating,
  SickLeave,
  Diagnosis,
  Discharge,
  NewBaseEntry,
  NewEntry,
} from './types';

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isEntryType = (param: any): param is EntryTypes => {
  return Object.values(EntryTypes).includes(param);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const isArrayOfStrings = (param: any[]): param is string[] => {
  return param.every(a => isString(a));
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }

  return gender;
};

const parseToString = (param: any, paramName: string): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing ${paramName}: ${param || ''}`);
  }

  return param;
};

const parseToDate = (param: any, paramName: string): string => {
  if (!param || !isString(param) || !isDate(param)) {
    throw new Error(`Incorrect or missing ${paramName}: ${param || ''}`);
  }

  return param;
};

export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseToString(object.name, 'name'),
    dateOfBirth: parseToDate(object.dateOfBirth, 'dateOfBirth'),
    ssn: parseToString(object.ssn, 'ssn'),
    gender: parseGender(object.gender),
    occupation: parseToString(object.occupation, 'occupation'),
  };

  return newPatient;
};

const parseType = (type: any): EntryTypes => {
  if (!type || !isEntryType(type)) {
    throw new Error(`Inocorrect or missing type: ${type}`);
  }

  return type;
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis['code']> => {
  if (!Array.isArray(diagnosisCodes) || !isArrayOfStrings(diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnoses');
  }

  return diagnosisCodes;
};

const toNewBaseEntry = (object: any): NewBaseEntry => {
  return {
    type: parseType(object.type),
    description: parseToString(object.description, 'description'),
    diagnosisCodes:
      object.diagnosisCodes && parseDiagnosisCodes(object.diagnosisCodes),
    date: parseToDate(object.date, 'date'),
    specialist: parseToString(object.specialist, 'specialist'),
  };
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (
    healthCheckRating === null ||
    healthCheckRating === undefined ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error(
      `Incorrect or missing healthCheckRating: ${healthCheckRating}`,
    );
  }

  return healthCheckRating;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave) {
    throw new Error(`Missing sickLeave: ${sickLeave}`);
  }

  const newParam: SickLeave = {
    startDate: parseToDate(sickLeave.startDate, 'sickLeave.startDate'),
    endDate: parseToDate(sickLeave.endDate, 'sickLeave.endDate'),
  };

  return newParam;
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge) {
    throw new Error(`Missing discharge: ${discharge}`);
  }

  const newParam: Discharge = {
    date: parseToDate(discharge.date, 'discharge.date'),
    criteria: parseToString(discharge.criteria, 'discharge.criteria'),
  };

  return newParam;
};

export const toNewEntry = (object: any): NewEntry => {
  const newBaseEntry = toNewBaseEntry(object) as NewEntry;

  switch (newBaseEntry.type) {
    case EntryTypes.HealthCheck:
      return {
        ...newBaseEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case EntryTypes.Hospital:
      return {
        ...newBaseEntry,
        discharge: parseDischarge(object.discharge),
      };
    case EntryTypes.OccupationalHealthcare:
      return {
        ...newBaseEntry,
        employerName: parseToString(object.employerName, 'employerName'),
        sickLeave: object.sickLeave && parseSickLeave(object.sickLeave),
      };
    default:
      return assertNever(newBaseEntry);
  }
};
