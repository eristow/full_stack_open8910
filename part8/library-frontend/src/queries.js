import { gql } from '@apollo/client';

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
      born
      _id
    }
    published
    genres
    _id
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      _id
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const CHANGE_AUTHOR = gql`
  mutation changeAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      _id
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
      _id
    }
  }
`;

export const ALL_BOOKS_GENRE = gql`
  query allBooksByGenre($genre: String!) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;
