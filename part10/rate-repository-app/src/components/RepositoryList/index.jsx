import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import RepositoryItem from './RepositoryItem';
import { GET_REPOSITORIES } from '../../graphql/queries';
import Text from '../Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({ item }) => <RepositoryItem item={item} />;

const RepositoryList = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{`Error! ${error.message}`}</Text>;
  }

  const repositoryNodes = data.repositories
    ? data.repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

export default RepositoryList;
