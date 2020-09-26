import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import EntryDetails from './EntryDetails';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import { useStateValue, addPatientSensitive } from '../state';

const PatientInfo: React.FC = () => {
  const [{ patientsSensitive }, dispatch] = useStateValue();
  const [patientDetails, setPatientDetails] = React.useState<Patient>();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        if (!patientsSensitive[id]) {
          const { data: patientDetailsFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`,
          );
          dispatch(addPatientSensitive(patientDetailsFromApi));
          setPatientDetails(patientDetailsFromApi);
        } else {
          setPatientDetails(patientsSensitive[id]);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientDetails();
  }, [id]); // eslint-disable-line


  if (!patientDetails) {
    return <p>loading...</p>;
  }

  const patientGender = () => {
    switch (patientDetails.gender) {
      case 'male':
        return 'mars';
      case 'female':
        return 'venus';
      case 'other':
        return 'genderless';
      default:
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(
            patientDetails.gender,
          )}`,
        );
    }
  };

  return (
    <div>
      <h1>
        {patientDetails.name}
        <Icon name={patientGender()} />
      </h1>
      {patientDetails.ssn && <p>SSN: {patientDetails.ssn}</p>}
      <p>Occupation: {patientDetails.occupation}</p>
      {patientDetails.dateOfBirth && (
        <p>Date of birth: {patientDetails.dateOfBirth}</p>
      )}
      <h3>Entries</h3>
      {patientDetails.entries.map(e => (
        <EntryDetails key={e.id} entry={e} />
      ))}
    </div>
  );
};

export default PatientInfo;
