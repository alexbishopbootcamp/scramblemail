import { jwtDecode } from 'jwt-decode';
import { client } from '../utils/apolloClient';
import { REFRESH_TOKEN } from '../graphql/mutations';

const Auth = {
  // get token from local storage
  getAccessToken: function () {
    return localStorage.getItem('accessToken');
  },
  // set token to local storage
  setAccessToken: function (token) {
    localStorage.setItem('accessToken', token);
  },
  // remove token from local storage
  removeAccessToken: function () {
    localStorage.removeItem('accessToken');
  },
  // decode token
  decodeToken: function (token) {
    return jwtDecode(token);
  },
  // check if token is expired
  isTokenExpired: function (token) {
    if (!token) {
      return true;
    }
    const decodedToken = Auth.decodeToken(token);
    return Date.now() >= decodedToken.exp * 1000;
  },
  // check if user is authenticated
  isAuthenticated: function () {
    const token = Auth.getAccessToken();
    return token && !Auth.isTokenExpired(token);
  },
  // refresh token
  refreshToken: async function () {
    try {
      const { data } = await client.mutate({
        mutation: REFRESH_TOKEN,
        context: {
          headers: {
            "X-Skip-Auth": true // Skip auth to prevent loop
          }
        }
      });
      Auth.setAccessToken(data.refreshToken.accesstoken);
    } catch (error) {
      console.error(error);
    }
  }
};

export default Auth;