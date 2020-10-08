import { useQuery } from '@apollo/react-hooks';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useGetAuthorizedUser = variables => {
  const { data, loading, fetchMore, ...result } = useQuery(
    GET_AUTHORIZED_USER,
    {
      variables,
      fetchPolicy: 'cache-and-network',
    },
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.authorizedUser.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_AUTHORIZED_USER,
      variables: {
        after: data.authorizedUser.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          authorizedUser: {
            ...fetchMoreResult.authorizedUser,
            reviews: {
              ...fetchMoreResult.authorizedUser.reviews,
              edges: [
                ...previousResult.authorizedUser.reviews.edges,
                ...fetchMoreResult.authorizedUser.reviews.edges,
              ],
            },
          },
        };

        return nextResult;
      },
    });
  };

  return {
    user: data ? data.authorizedUser : undefined,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useGetAuthorizedUser;
