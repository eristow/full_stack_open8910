import React, { useState } from 'react';
import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Notify from './components/Notify';
import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm';
import { ALL_PERSONS, PERSON_ADDED } from './queries';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const result = useQuery(ALL_PERSONS);
  const client = useApolloClient();

  const updateCacheWith = addedPerson => {
    const includedIn = (set, object) => {
      set.map(p => p.id).includes(object.id);
    };

    const dataInStore = client.readQuery({ query: ALL_PERSONS });
    if (!includedIn(dataInStore.allPersons, addedPerson)) {
      client.writeQuery({
        query: ALL_PERSONS,
        data: { allPersons: dataInStore.allPersons.concat(addedPerson) },
      });
    }
  };

  useSubscription(PERSON_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedPerson = subscriptionData.data.personAdded;
      notify(`${addedPerson.name} added`);
      updateCacheWith(addedPerson);
    },
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const notify = message => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <Notify errorMessage={errorMessage} />
      <PersonForm setError={notify} updateCacheWith={updateCacheWith} />
      <PhoneForm setError={notify} />
      <Persons persons={result.data.allPersons} />
    </div>
  );
};

export default App;
