import React, { useContext } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useApolloClient } from '@apollo/react-hooks';

import AuthStorageContext from '../../contexts/AuthStorageContext';
import Text from '../Text';

const SignOutTab = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const handlePress = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  const signOutStyles = StyleSheet.create({
    container: {
      padding: 5,
      marginRight: 20,
    },
  });

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={signOutStyles.container}>
        <Text fontWeight="bold" fontSize="subheading" color="white">
          Sign Out
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignOutTab;
