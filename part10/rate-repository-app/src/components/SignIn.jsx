import React from 'react';
import * as yup from 'yup';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import { useHistory } from 'react-router-native';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { globalStyles } from '../theme';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(3, 'Password must be at least 3 characters long')
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={globalStyles.form}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        style={globalStyles.input}
        testID="usernameField"
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry
        style={globalStyles.input}
        testID="passwordField"
      />
      <View style={globalStyles.submitButton}>
        <TouchableWithoutFeedback onPress={onSubmit} testID="submitButton">
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

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async values => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
