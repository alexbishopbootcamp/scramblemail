const typeDefs = `
  type Query {
    placeholder: Boolean
  }

  type Mutation {
    registerUser(primaryEmail: String!, password: String!): AuthPayload
    verifyEmail(token: String!): VerifyPayload
    loginUser(primaryEmail: String!, password: String!): LoginPayload
  }

  type VerifyPayload {
    success: Boolean
    message: String
  }

  type AuthPayload {
    success: Boolean
    message: String
  }

  type LoginPayload {
    success: Boolean
    message: String
    accesstoken: String
    refreshtoken: String
  }
`;

module.exports = typeDefs;