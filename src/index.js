import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';

// const client = ...

// const client = new ApolloClient({
//   uri: 'http://localhost:4000',
//   cache: new InMemoryCache()
// });

// client
//   .query({
//     query: gql`
//       {
//   getHobby(id: 1) {
//     title
//     student {
//       firstName
//     }
//   }
// }
//     `
//   })
//   .then(result => console.log(result.data.getHobby.student.firstName));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
