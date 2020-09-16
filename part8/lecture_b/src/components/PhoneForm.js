import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_NUMBER } from '../queries';

const PhoneForm = ({ setError }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [changeNumber, result] = useMutation(EDIT_NUMBER);

  const submit = e => {
    e.preventDefault();

    changeNumber({ variables: { name, phone } });

    setName('');
    setPhone('');
  };

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError('Person not found');
    }
  }, [result.data]); // eslint-disable-line

  return (
    <div>
      <h2>Change Number</h2>
      <form onSubmit={submit}>
        <div>
          Name:{' '}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          Phone:{' '}
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <button type="submit">Change Number</button>
      </form>
    </div>
  );
};

export default PhoneForm;
