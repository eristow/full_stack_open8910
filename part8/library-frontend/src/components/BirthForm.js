import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, CHANGE_AUTHOR } from '../queries';

const BirthForm = () => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const result = useQuery(ALL_AUTHORS);

  const [changeAuthor] = useMutation(CHANGE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async e => {
    e.preventDefault();

    changeAuthor({ variables: { name, born: parseInt(born) } });

    setName('');
    setBorn('');
  };

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map(a => (
              <option value={a.name} key={a._id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthForm;
