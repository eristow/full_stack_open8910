import React from 'react';
import * as yup from 'yup';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { globalStyles } from '../theme';
import useCreateReview from '../hooks/useCreateReview';
import { useHistory } from 'react-router-native';

const initialValues = {
  repositoryName: '',
  ownerName: '',
  rating: '',
  text: '',
};

const ratingMinMaxErrorText = 'Rating must be between 0 and 100.';

const validationSchema = yup.object().shape({
  repositoryName: yup.string().required('Repository name is required'),
  ownerName: yup.string().required('Repository owner name is required'),
  rating: yup
    .number()
    .min(0, ratingMinMaxErrorText)
    .max(100, ratingMinMaxErrorText)
    .required('Rating is required'),
  text: yup.string(),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={globalStyles.form}>
      <FormikTextInput
        name="ownerName"
        placeholder="Repository owner name"
        style={globalStyles.input}
      />
      <FormikTextInput
        name="repositoryName"
        placeholder="Repository name"
        style={globalStyles.input}
      />
      <FormikTextInput
        name="rating"
        placeholder="Rating between 0 and 100"
        style={globalStyles.input}
      />
      <FormikTextInput
        name="text"
        placeholder="Review"
        multiline
        style={globalStyles.input}
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

export const CreateReviewContainer = ({ onSubmit }) => {
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

const CreateReview = () => {
  const history = useHistory();
  const [createReview] = useCreateReview();

  const onSubmit = async values => {
    const { repositoryName, ownerName, rating, text } = values;
    const data = await createReview({
      repositoryName,
      ownerName,
      rating: parseInt(rating),
      text,
    });
    history.push(`/${data.createReview.repositoryId}`);
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;
