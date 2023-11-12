const typeDefs = `
  type User {
    id: ID!
    username: String!
    primaryEmail: String!
    randomEmails: [RandomEmail!]!
  }

  type RandomEmail {
    id: ID!
    email: String!
    createdAt: String!
    domain: String
  }

  type Query {
    randomEmails(userId: ID!): [RandomEmail!]!
  }

  type Mutation {
    createUser(username: String!, primaryEmail: String!): User
    generateRandomEmail(userId: ID!): RandomEmail
    deleteRandomEmail(emailId: ID!): Boolean
  }
`;

module.exports = typeDefs;