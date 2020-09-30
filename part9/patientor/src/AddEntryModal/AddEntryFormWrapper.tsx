import React from 'react';
import { FormikHelpers } from 'formik';
import { Dropdown, DropdownProps, Form, Divider } from 'semantic-ui-react';
import * as yup from 'yup';

import { EntryTypes, NewEntry } from '../types';
import AddEntryForm from './AddEntryForm';

const dateRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;
const dateErrorMessage = 'Date must be formatted as YYYY-MM-DD';

const baseSchema: yup.ObjectSchema = yup.object().shape({
  description: yup.string().min(10).required(),
  date: yup.string().matches(dateRegex, dateErrorMessage),
  specialist: yup.string().min(6).required(),
  diagnosisCodes: yup.array().of(yup.string()),
});

const healthCheckSchema = baseSchema.concat(
  yup.object().shape({
    healthCheckRating: yup
      .number()
      .typeError('Health check rating must be a number')
      .min(0)
      .max(3)
      .required('Enter a rating from 0 (healthy) to 3 (critical)'),
  }),
);

const occupationalSchema = baseSchema.concat(
  yup.object().shape({
    employerName: yup.string().min(3).required(),
    sickLeave: yup.object().shape({
      startDate: yup.string().matches(dateRegex, dateErrorMessage),
      endDate: yup.string().matches(dateRegex, dateErrorMessage),
    }),
  }),
);

const hospitalSchema = baseSchema.concat(
  yup.object().shape({
    discharge: yup.object({
      date: yup
        .string()
        .matches(dateRegex, dateErrorMessage)
        .required('Enter a discharge date'),
      criteria: yup.string().min(10).required('Enter a discharge criteria'),
    }),
  }),
);

const baseInitialValues = {
  description: '',
  date: '',
  specialist: '',
  diagnosisCodes: [],
};

const healthCheckInitialValues: NewEntry = {
  ...baseInitialValues,
  type: EntryTypes.HealthCheck,
  healthCheckRating: 0,
};

const hospitalInitialValues: NewEntry = {
  ...baseInitialValues,
  type: EntryTypes.Hospital,
  discharge: { date: '', criteria: '' },
};

const occupationalInitialValues: NewEntry = {
  ...baseInitialValues,
  type: EntryTypes.OccupationalHealthcare,
  employerName: '',
  sickLeave: { startDate: '', endDate: '' },
};

const entryTypeOptions = [
  {
    key: EntryTypes.HealthCheck,
    value: EntryTypes.HealthCheck,
    text: 'Health Check',
  },
  { key: EntryTypes.Hospital, value: EntryTypes.Hospital, text: 'Hospital' },
  {
    key: EntryTypes.OccupationalHealthcare,
    value: EntryTypes.OccupationalHealthcare,
    text: 'Occupational Healthcare',
  },
];

interface Props {
  onSubmit: (values: NewEntry, actions: FormikHelpers<NewEntry>) => void;
  onCancel: () => void;
}

const AddEntryFormWrapper: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [entryType, setEntryType] = React.useState<EntryTypes>(
    EntryTypes.HealthCheck,
  );

  const handleChange = (
    _e: React.SyntheticEvent,
    { value }: DropdownProps,
  ): void => {
    if (value) {
      setEntryType(value as EntryTypes);
    }
  };

  const entryForm = () => {
    switch (entryType) {
      case EntryTypes.HealthCheck:
        return (
          <AddEntryForm
            onSubmit={onSubmit}
            onCancel={onCancel}
            initialValues={healthCheckInitialValues}
            validationSchema={healthCheckSchema}
          />
        );
      case EntryTypes.Hospital:
        return (
          <AddEntryForm
            onSubmit={onSubmit}
            onCancel={onCancel}
            initialValues={hospitalInitialValues}
            validationSchema={hospitalSchema}
          />
        );
      case EntryTypes.OccupationalHealthcare:
        return (
          <AddEntryForm
            onSubmit={onSubmit}
            onCancel={onCancel}
            initialValues={occupationalInitialValues}
            validationSchema={occupationalSchema}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Form.Field>
        <label>Entry Type</label>
        <Dropdown
          fluid
          selection
          options={entryTypeOptions}
          onChange={handleChange}
          value={entryType}
        />
      </Form.Field>
      <Divider />
      {entryForm()}
    </>
  );
};

export default AddEntryFormWrapper;
