import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PERSON } from '../queries';

const PersonForm = ({ setError, updateCacheWith }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');

  const [createPerson] = useMutation(CREATE_PERSON, {
    onError: err => {
      console.log(err);
      setError(err.graphQLErrors[0].message);
    },
    update: (store, response) => {
      // updateCacheWith(response.data.addPerson);
    },
  });

  const submit = e => {
    e.preventDefault();

    createPerson({
      variables: { name, street, city, phone: phone.length > 0 ? phone : null },
    });
    setName('');
    setPhone('');
    setStreet('');
    setCity('');
  };

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={submit}>
        <div>
          Name:{' '}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          Phone:{' '}
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          Street:{' '}
          <input
            value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          City:{' '}
          <input
            value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <button type="submit">Add!</button>
      </form>
    </div>
  );
};

export default PersonForm;
