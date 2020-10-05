import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Link } from 'react-router-native';

// import theme from '../../theme';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    // borderColor: theme.colors.white,
    // borderWidth: 2,
    // borderRadius: 3,
    padding: 5,
    marginRight: 20,
  },
});

const AppBarTab = ({ text, url }) => {
  return (
    <Link to={url} component={TouchableWithoutFeedback}>
      <View style={styles.container}>
        <Text fontWeight="bold" fontSize="subheading" color="white">
          {text}
        </Text>
      </View>
    </Link>
  );
};

export default AppBarTab;
