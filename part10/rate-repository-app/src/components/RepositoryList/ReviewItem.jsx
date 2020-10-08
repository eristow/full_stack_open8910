import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { format, parseISO } from 'date-fns';
import { useHistory } from 'react-router-native';

import Text from '../Text';
import theme from '../../theme';
import useDeleteReview from '../../hooks/useDeleteReview';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 10,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  ratingContainer: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 50 / 2,
    width: 50,
    height: 50,
    paddingVertical: 10,
    marginRight: 10,
  },
  detailsContainer: {
    // Have to do this or else it displays off-screen
    paddingRight: 60,
  },
  ratingText: {
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
});

const ReviewItem = ({ review, addButtons, refetch }) => {
  const history = useHistory();
  const [deleteReview] = useDeleteReview();

  const handleViewRepository = repositoryId => {
    history.push(`/${repositoryId}`);
  };

  const handleDeleteReview = id => {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteReview({ id });
            refetch();
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.ratingContainer}>
          <Text
            fontWeight="bold"
            fontSize="subheading"
            color="primary"
            style={styles.ratingText}
          >
            {review.rating}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text fontWeight="bold" fontSize="subheading">
            {addButtons ? review.repository.fullName : review.user.username}
          </Text>
          <Text color="textSecondary" fontSize="subheading2">
            {format(parseISO(review.createdAt), 'dd.MM.yyyy')}
          </Text>
          <Text fontSize="subheading2">{review.text}</Text>
        </View>
      </View>
      {addButtons && (
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            color="blue"
            onPress={() => handleViewRepository(review.repositoryId)}
          >
            View Repository
          </Button>
          <Button
            mode="contained"
            color="red"
            onPress={() => handleDeleteReview(review.id)}
          >
            Delete Review
          </Button>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
