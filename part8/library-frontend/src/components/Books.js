import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = props => {
  const [genre, setGenre] = useState('');
  const result = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;
  const genres = books.flatMap(b => b.genres);
  const uniqueGenres = genres.filter((g, index) => genres.indexOf(g) === index);

  return (
    <div>
      <h2>books</h2>
      {genre !== '' && (
        <p>
          in genre <strong>{genre}</strong>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {/* TODO: clean this conditional up */}
          {genre !== ''
            ? books.map(
                b =>
                  b.genres.includes(genre) && (
                    <tr key={b.title}>
                      <td>{b.title}</td>
                      <td>{b.author.name}</td>
                      <td>{b.published}</td>
                    </tr>
                  ),
              )
            : books.map(b => (
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {uniqueGenres.map(g => (
        <button key={g} type="button" onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
      <button type="button" onClick={() => setGenre('')}>
        all genres
      </button>
    </div>
  );
};

export default Books;
