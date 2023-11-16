import { gql } from '@apollo/client';

export const GET_RANDOM_EMAILS = gql`
  query getRandomEmails {
    getRandomEmails {
      id
      email
      createdAt
      domain
    }
  }
`;