const typeDefs = `
  type Query {
    getAddresses: [Address]
  }

  type Address {
    id: ID
    email: String
    createdAt: String
    domain: String
  }

  type Mutation {
    registerUser(primaryEmail: String!, password: String!): AuthPayload
    verifyEmail(token: String!): VerifyPayload
    loginUser(primaryEmail: String!, password: String!): LoginPayload
    generateAddress: Address
    refreshToken: AuthPayload
  }

  type VerifyPayload {
    success: Boolean
    message: String
  }

  type AuthPayload {
    success: Boolean
    message: String
    accesstoken: String
  }

  type LoginPayload {
    success: Boolean
    message: String
    accesstoken: String
  }
`;

module.exports = typeDefs;