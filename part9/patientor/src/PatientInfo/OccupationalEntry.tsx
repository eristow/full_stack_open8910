import React from 'react';
import { Card, Icon, List } from 'semantic-ui-react';

import { OccupationalHealthcareEntry as OccupationalHealthcare } from '../types';
import DiagnosisList from './DiagnosisList';

const OccupationalEntry: React.FC<{ entry: OccupationalHealthcare }> = ({
  entry,
}) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="stethoscope" />
        </Card.Header>
        <Card.Meta>by {entry.specialist}</Card.Meta>
        <Card.Description>{entry.description}</Card.Description>
        {entry.diagnosisCodes && (
          <DiagnosisList diagnosesCodes={entry.diagnosisCodes} />
        )}
      </Card.Content>
      <Card.Content extra>
        <List>
          <List.Item>
            <List.Header>Employer: {entry.employerName}</List.Header>
            {entry.sickLeave &&
              `Sick Leave: ${entry.sickLeave.startDate} - ${entry.sickLeave.endDate}`}
          </List.Item>
        </List>
      </Card.Content>
    </Card>
  );
};

export default OccupationalEntry;
