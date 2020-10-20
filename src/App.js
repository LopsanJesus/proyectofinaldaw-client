import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from '@apollo/client';

import { useQuery, gql } from '@apollo/client';

import { ApolloClient, InMemoryCache } from '@apollo/client';
// import { gql } from '@apollo/client';

const client = new ApolloClient({
  //uri: 'http://localhost:4000',
  uri: 'https://treelang-api.herokuapp.com/graphql',
  cache: new InMemoryCache()
});

const ALL_STUDENTS = gql`
  {
    getAllStudents {
      id
      firstName
      email
      hobbies {
        title
      }
    }
  }
`;

function GetAllStudents() {
  const { loading, error, data } = useQuery(ALL_STUDENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.getAllStudents.map(({ id, firstName, email, hobbies }) => {
    var hobby = hobbies.map(h => <li>{h.title}</li>);
    return (
      <div key={id}>
        <p>
          {firstName}: {email} (id: {id})
        </p>
        <ul>
            {hobby}
        </ul>
      </div>
    );
  }
  
  
  
  );
}

function App() {
  // const [ users, setUsers ] = useState("");  

  // useEffect(() => {
  //   //fetch("https://treelang-api.herokuapp.com/users")
  //   fetch("http://localhost:4000/users")
  //     .then(res => res.text())
  //     .then(res => setUsers(res))
  //     .catch(() => console.log("Error en la API"))
  // });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1>Treelang</h1>
          <p>
            Users:
          </p>
          <GetAllStudents />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
