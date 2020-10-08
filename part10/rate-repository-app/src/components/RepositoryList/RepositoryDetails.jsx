import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import useRepository from '../../hooks/useRepository';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryDetailsContainer = ({ repository, onEndReach }) => {
  if (!repository) {
    return null;
  }

  return (
    <FlatList
      data={repository.reviews.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={({ node }) => node.id}
      ListHeaderComponent={() => (
        <RepositoryItem item={repository} detailsView />
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.2}
    />
  );
};

const RepositoryDetails = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository({ first: 4, id });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryDetailsContainer
      repository={repository}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryDetails;
