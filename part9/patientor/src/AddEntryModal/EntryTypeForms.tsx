import React from 'react';
import { Field } from 'formik';

import { NumberField, TextField } from '../AddPatientModal/FormField';
import { EntryTypes } from '../types';

interface Props {
  entryType: EntryTypes;
}

const EntryTypeForms: React.FC<Props> = ({ entryType }) => {
  switch (entryType) {
    case EntryTypes.HealthCheck:
      return (
        <Field
          label="Health Check Rating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
      );
    case EntryTypes.Hospital:
      return (
        <>
          <label>Discharge:</label>
          <Field
            label="Date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Criteria"
            placeholder="Criteria"
            name="discharge.criteria"
            component={TextField}
          />
        </>
      );
    case EntryTypes.OccupationalHealthcare:
      return (
        <>
          <Field
            label="Employer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
          />
          <label>Sick Leave:</label>
          <Field
            label="Start Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.startDate"
            component={TextField}
          />
          <Field
            label="End Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.endDate"
            component={TextField}
          />
        </>
      );
    default:
      return null;
  }
};

export default EntryTypeForms;
