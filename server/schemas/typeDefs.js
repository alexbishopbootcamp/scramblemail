const typeDefs = `
  type Query {
    getAddresses: [Address]
    getProfile: Profile
  }

  type Profile {
    primaryEmail: String
  }

  type Address {
    id: ID
    email: String
    createdAt: String
    domain: String
  }

  type Mutation {
    registerUser(primaryEmail: String!, password: String!): AuthPayload
    verifyEmail(token: String!): GenericPayload
    loginUser(primaryEmail: String!, password: String!): AuthPayload
    generateAddress: Address
    refreshToken: AuthPayload
    deleteAddress(id: ID!): GenericPayload
    updatePrimaryAddress(primaryEmail: String!): GenericPayload
    changePassword(password: String!): GenericPayload
    deleteAccount: GenericPayload
  }


  type AuthPayload {
    success: Boolean
    message: String
    accesstoken: String
  }

  type GenericPayload {
    success: Boolean
    message: String
  }
`;

module.exports = typeDefs;