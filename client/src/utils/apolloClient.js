import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Auth from './auth';

const httpLink = createHttpLink({ uri: '/graphql' });

const authLink = setContext(async (_, { headers }) => {
  // Check if the refresh logic should be bypassed
  if (headers && headers['X-Skip-Auth']) {
    return { headers };
  }
  
  let token = Auth.getAccessToken();

  if (Auth.isTokenExpired(token)) {
    await Auth.refreshToken();
    token = Auth.getAccessToken(); // Get the new token
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
