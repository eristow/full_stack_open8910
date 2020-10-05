import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/react-hooks';

import theme from '../../theme';
import AppBarTab from './AppBarTab';
import SignOutTab from './SignOutTab';
import Text from '../Text';
import { GET_AUTHORIZED_USER } from '../../graphql/queries';

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
  const { data, error, loading } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>{`Error! ${error.message}`}</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <AppBarTab text="Repositories" url="/" />
        {data.authorizedUser === null ? (
          <AppBarTab text="Sign In" url="/signin" />
        ) : (
          <SignOutTab />
        )}
        {/* <AppBarTab text="BMI" url="/bmi" /> */}
      </ScrollView>
    </View>
  );
};

export default AppBar;
