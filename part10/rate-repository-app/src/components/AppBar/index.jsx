import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../../theme';
import AppBarTab from './AppBarTab';
import SignOutTab from './SignOutTab';
import useGetAuthorizedUser from '../../hooks/useGetAuthorizedUser';

const styles = StyleSheet.create({
  container: {
    paddingBottom: Constants.statusBarHeight * 0.5,
    paddingTop: Constants.statusBarHeight * 1.75,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.appBar,
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const { user } = useGetAuthorizedUser();

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <AppBarTab text="Repositories" url="/" />
        {user === null ? (
          <>
            <AppBarTab text="Sign In" url="/signin" />
            <AppBarTab text="Sign Up" url="/signup" />
          </>
        ) : (
          <>
            <AppBarTab text="Create A Review" url="/createReview" />
            <AppBarTab text="My Reviews" url="/userReviews" />
            <SignOutTab />
          </>
        )}
        {/* <AppBarTab text="BMI" url="/bmi" /> */}
      </ScrollView>
    </View>
  );
};

export default AppBar;
