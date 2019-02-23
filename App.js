import React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

import AppNavigator from './components/AppNavigator';
import DropdownAlert from './components/DropdownAlert';

const httpLink = createHttpLink({
  uri: process.env.BASE_URL,
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: process.env.JWT,
  },
}));

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default class App extends React.Component {
  state = {
    showAlert: false,
    options: {},
  }

  /**
   * Shows dropdown alert
   *
   * @returns {void}
   */
  showDropdownAlert = (showAlert, options) => {
    this.setState({
      showAlert,
      options,
    });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <AppNavigator screenProps={{ showDropdownAlert: this.showDropdownAlert }} />
        <DropdownAlert
          showAlert={this.state.showAlert}
          options={this.state.options}
        />
      </ApolloProvider>
    );
  }
}
