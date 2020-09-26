import React from 'react';
import axios from 'axios';

import { apiBaseUrl } from '../constants';
import { Diagnosis, Entry, EntryTypes, assertNever } from '../types';
import { useStateValue, setDiagnoses } from '../state';
import HealthCheckEntry from './HealthCheckEntry';
import OccupationalEntry from './OccupationalEntry';
import HospitalEntry from './HospitalEntry';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        if (diagnoses.length === 0) {
          const { data: diagnosesFromApi } = await axios.get<Array<Diagnosis>>(
            `${apiBaseUrl}/diagnoses`,
          );
          dispatch(setDiagnoses(diagnosesFromApi));
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchDiagnoses();
  }, []); // eslint-disable-line

  switch (entry.type) {
    case EntryTypes.Hospital:
      return <HospitalEntry entry={entry} />;
    case EntryTypes.OccupationalHealthcare:
      return <OccupationalEntry entry={entry} />;
    case EntryTypes.HealthCheck:
      return <HealthCheckEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
