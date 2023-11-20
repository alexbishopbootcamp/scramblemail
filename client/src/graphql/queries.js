import { gql } from '@apollo/client';

export const GET_ADDRESSES = gql`
  query getAddresses {
    getAddresses {
      id
      email
      createdAt
      domain
    }
  }
`;