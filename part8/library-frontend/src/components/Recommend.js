import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { ME, ALL_BOOKS_GENRE } from '../queries';

const Recommend = ({ show, userGenre, setUserGenre }) => {
  const [getMe, resultMe] = useLazyQuery(ME);
  const [getBooks, resultBooks] = useLazyQuery(ALL_BOOKS_GENRE);
  // const [genre, setGenre] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getMe();
  }, [getMe]);

  useEffect(() => {
    if (resultMe.data) {
      setUserGenre(resultMe.data.me.favoriteGenre);
    }
  }, [resultMe]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getBooks({ variables: { genre: userGenre } });
  }, [userGenre]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (resultBooks.data) {
      setBooks(resultBooks.data.allBooks);
    }
  }, [resultBooks]);

  if (!show) {
    return null;
  }

  if (resultMe.loading || resultBooks.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{userGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(b => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
