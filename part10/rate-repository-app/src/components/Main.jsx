import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch, Route, Redirect } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import RepositoryDetails from './RepositoryList/RepositoryDetails';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import UserReviews from './UserReviews';
// import BmiCalculator from './BMI';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.main,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        {/* <Route path="/bmi" exact>
          <BmiCalculator />
        </Route> */}
        <Route path="/userReviews" exact>
          <UserReviews />
        </Route>
        <Route path="/createReview" exact>
          <CreateReview />
        </Route>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/:id">
          <RepositoryDetails />
        </Route>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
