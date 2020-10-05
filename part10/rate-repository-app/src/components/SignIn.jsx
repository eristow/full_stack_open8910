import React from 'react';
import * as yup from 'yup';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import { useHistory } from 'react-router-native';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  form: {
    padding: 10,
  },
  input: {
    backgroundColor: theme.colors.white,
    marginVertical: 5,
    padding: 15,
    paddingHorizontal: 15,
    borderColor: theme.colors.gray,
    borderWidth: 2,
    borderRadius: 5,
    fontSize: theme.fontSizes.subheading,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: 20,
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#00000000',
    textAlign: 'center',
  },
  buttonText: {
    textAlign: 'center',
  },
});

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
    <View style={styles.form}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        style={styles.input}
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.submitButton}>
        <TouchableWithoutFeedback onPress={onSubmit}>
          <Text
            color="white"
            fontWeight="bold"
            fontSize="subheading"
            style={styles.buttonText}
          >
            Submit
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
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

export default SignIn;
