import React from 'react';
import { List } from 'semantic-ui-react';

import { Diagnosis } from '../types';
import { useStateValue } from '../state';

interface Props {
  diagnosesCodes: Array<Diagnosis['code']>;
}

const DiagnosisList: React.FC<Props> = ({ diagnosesCodes }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <List>
      <List.Item>
        <List.Header>Diagnoses:</List.Header>
      </List.Item>
      {diagnosesCodes.map(d => {
        const diagnosis = diagnoses.find(dia => dia.code === d);
        return (
          <List.Item key={d}>
            <List.Content>
              <List.Description>
                {diagnosis && `${diagnosis.code} ${diagnosis.name}`}
              </List.Description>
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
};

export default DiagnosisList;
