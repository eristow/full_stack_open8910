import { gql } from 'apollo-boost';

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    ownerName
    name
    fullName
    ratingAverage
    reviewCount
    stargazersCount
    watchersCount
    forksCount
    openIssuesCount
    url
    ownerAvatarUrl
    description
    language
    reviews (first: $first, after: $after) {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
`;

export const CREATE_REVIEW_RESULTS = gql`
  fragment CreateReviewResults on Review {
    id
    user {
      id
      username
    }
    userId
    repositoryId
    rating
    createdAt
    text
  }
`;

export const CREATE_USER_RESULTS = gql`
  fragment CreateUserResults on User {
    id
    username
    createdAt
    reviews {
      edges {
        node {
          user {
            username
          }
          rating
          createdAt
          text
        }
      }
    }
    reviewCount
  }
`;

// export const REVIEW_DETAILS = gql`
//   fragment ReviewDetails on Review {
//     id
//     text
//     rating
//     createdAt
//     user {
//       id
//       username
//     }
//   }
// `;
