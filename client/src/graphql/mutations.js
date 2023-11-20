import { gql, useMutation } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation registerUser($primaryEmail: String!, $password: String!) {
    registerUser(primaryEmail: $primaryEmail, password: $password) {
      success
      message
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation verifyEmail($token: String!) {
    verifyEmail(token: $token) {
      success
      message
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($primaryEmail: String!, $password: String!) {
    loginUser(primaryEmail: $primaryEmail, password: $password) {
      success
      message
      accesstoken
    }
  }
`;

export const GENERATE_ADDRESS = gql`
  mutation generateAddress {
    generateAddress {
      email
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation refreshToken {
    refreshToken {
      success
      message
      accesstoken
    }
  }
`;