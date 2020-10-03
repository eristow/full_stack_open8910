import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import AppBarTab from './AppBarTab';

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <AppBarTab text="Repositories" url="/" />
        <AppBarTab text="Sign In" url="/signin" />
        <AppBarTab text="BMI" url="/bmi" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
