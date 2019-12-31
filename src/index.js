import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { ApolloProvider } from "react-apollo"; //to pass in data to our app..
import { createHttpLink } from "apollo-link-http"; //this allow our client/user to connect with our endpoint which is /graphql
import { InMemoryCache } from "apollo-cache-inmemory"; //this will cache the data it fetches,to avoid request unnessarily..
import { ApolloClient, gql } from "apollo-boost";

import { store, persistor } from "./redux/store";

import "./index.css";
import App from "./App";

const httpLink = createHttpLink({
  uri: "https://crwn-clothing.com"
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink, //it will request to our uri,when user choose to request
  cache //cache:cache
});

/*
//testing get request to our endpoint in graphql
client
  .query({
    query: gql`
      {
        getCollectionsBytitle(title: "hats") {
          id
          title
          items {
            id
            name
            price
            imageUrl
          }
        }
      }
    `
  })
  .then(res => console.log(res));
  */

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
