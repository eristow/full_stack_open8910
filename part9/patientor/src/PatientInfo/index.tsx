import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

import EntryDetails from './EntryDetails';
import { apiBaseUrl } from '../constants';
import { Patient, NewEntry } from '../types';
import { useStateValue, addPatientSensitive, addEntry } from '../state';
import AddEntryModal from '../AddEntryModal';

const PatientInfo: React.FC = () => {
  const [{ patientsSensitive }, dispatch] = useStateValue();
  const [patientDetails, setPatientDetails] = React.useState<Patient>();
  const { id } = useParams<{ id: string }>();
  const [error, setError] = React.useState<string | undefined>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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
  }, [id, patientsSensitive]); // eslint-disable-line

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

  const submitNewEntry = async (values: NewEntry) => {
    try {
      setError(undefined);
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        { ...values },
      );
      dispatch(addEntry(updatedPatient));
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={openModal}>Add New Entry</Button>
      {patientDetails.entries.map(e => (
        <EntryDetails key={e.id} entry={e} />
      ))}
    </div>
  );
};

export default PatientInfo;
