import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form, FormikHelpers } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import { Diagnosis, NewEntry } from '../types';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { setDiagnoses, useStateValue } from '../state';
import EntryTypeForms from './EntryTypeForms';
import { apiBaseUrl } from '../constants';

interface Props {
  onSubmit: (values: NewEntry, actions: FormikHelpers<NewEntry>) => void;
  onCancel: () => void;
  initialValues: NewEntry;
  validationSchema: yup.ObjectSchema;
}

const AddEntryForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
  initialValues,
  validationSchema,
}) => {
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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      validationSchema={validationSchema}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <EntryTypeForms entryType={values.type} />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={() => onCancel()} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
