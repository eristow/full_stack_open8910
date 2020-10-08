import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import { globalStyles } from '../theme';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const usernameLengthErrorMessage =
  'Username must be between 1 and 30 characters long';
const passwordLengthErrorMessage =
  'Password must be between 5 and 50 characters long';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, usernameLengthErrorMessage)
    .max(30, usernameLengthErrorMessage)
    .required('Username is required'),
  password: yup
    .string()
    .min(5, passwordLengthErrorMessage)
    .max(50, passwordLengthErrorMessage)
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'Password confirmation must match password',
    )
    .required('Password confirmation is required'),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={globalStyles.form}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        style={globalStyles.input}
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry
        style={globalStyles.input}
      />
      <FormikTextInput
        name="passwordConfirmation"
        placeholder="Password Confirmation"
        secureTextEntry
        style={globalStyles.input}
      />
      <View style={globalStyles.submitButton}>
        <TouchableWithoutFeedback onPress={onSubmit}>
          <Text
            color="white"
            fontWeight="bold"
            fontSize="subheading"
            style={globalStyles.buttonText}
          >
            Submit
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async values => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
