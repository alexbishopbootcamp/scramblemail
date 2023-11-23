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

export const DELETE_ADDRESS = gql`
  mutation deleteAddress($id: ID!) {
    deleteAddress(id: $id) {
      success
      message
    }
  }
`;

export const UPDATE_PRIMARY_ADDRESS = gql`
  mutation updatePrimaryAddress($primaryEmail: String!) {
    updatePrimaryAddress(primaryEmail: $primaryEmail) {
      success
      message
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($password: String!) {
    changePassword(password: $password) {
      success
      message
    }
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation deleteAccount {
    deleteAccount {
      success
      message
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser {
      success
      message
    }
  }
`;