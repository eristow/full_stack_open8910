export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

interface BaseEntry {
  type: EntryTypes;
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export enum EntryTypes {
  HealthCheck = 'HealthCheck',
  OccupationalHealthcare = 'OccupationalHealthcare',
  Hospital = 'Hospital',
}

interface Discharge {
  date: string;
  criteria: string;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryTypes.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryTypes.OccupationalHealthcare;
  sickLeave?: SickLeave;
  employerName: string;
}

export interface HospitalEntry extends BaseEntry {
  type: EntryTypes.Hospital;
  discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

export type NewBaseEntry = Omit<BaseEntry, 'id'>;

export type NewEntry = DistributiveOmit<Entry, 'id'>;
