import React from 'react';
import * as yup from 'yup';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Formik } from 'formik';

import FormikTextInput from './FormikTextInput';

const initialValues = {
  mass: '',
  height: '',
};

const getBMI = (mass, height) => {
  const val = Math.round(mass / Math.pow(height, 2));
  return val;
};

const validationSchema = yup.object().shape({
  mass: yup
    .number()
    .min(1, 'Weight must be greater than or equal to 1')
    .required('Weight is required'),
  height: yup
    .number()
    .min(0.5, 'Height must be greater than or equal to 0.5')
    .required('Height is required'),
});

const BmiForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="mass" placeholder="Weight (kg)" />
      <FormikTextInput name="height" placeholder="Height (m)" />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text>Calculate</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const BmiCalculator = () => {
  const onSubmit = values => {
    const mass = parseFloat(values.mass);
    const height = parseFloat(values.height);

    if (!isNaN(mass) && !isNaN(height) && height !== 0) {
      console.log(`Your BMI is: ${getBMI(mass, height)}`);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <BmiForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default BmiCalculator;
