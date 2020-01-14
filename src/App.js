import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import apolloClient from './services/apollo';

import AddTicket from './components/addTicket';
import ConsultTicket from './components/consultTicket';

function App() {
  return (
      <ApolloProvider client={apolloClient}>
        <AddTicket />
        <ConsultTicket />
      </ApolloProvider>
  );
}

export default App;
