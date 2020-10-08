import React from 'react';
import { FlatList } from 'react-native';

import useGetAuthorizedUser from '../hooks/useGetAuthorizedUser';
import { ItemSeparator } from './RepositoryList/RepositoryDetails';
import ReviewItem from './RepositoryList/ReviewItem';

const UserReviewsContainer = ({ user, onEndReach, refetch }) => {
  if (!user) {
    return null;
  }

  const reviews = user.reviews.edges;

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem review={item.node} addButtons refetch={refetch} />
      )}
      keyExtractor={({ node }) => node.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.2}
    />
  );
};

const UserReviews = () => {
  const { user, fetchMore, refetch } = useGetAuthorizedUser({
    first: 8,
    includeReviews: true,
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <UserReviewsContainer
      user={user}
      onEndReach={onEndReach}
      refetch={refetch}
    />
  );
};

export default UserReviews;
