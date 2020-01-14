import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';


const httpLink = new HttpLink({
    uri: 'https://api.graph.cool/simple/v1/ck547ilt23p620135pvqvo6t5',
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});



export default client;