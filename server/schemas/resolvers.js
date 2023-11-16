const { User } = require('../models');
const { ApolloError } = require('apollo-server');
const { Email } = require('../util/email');
const JWT = require('jsonwebtoken');

const resolvers = {
  Mutation: {
    registerUser: async (_, { primaryEmail, password }, context) => {
      try {
        const user = await User.create({ primaryEmail, password });
        // Send verification email
        Email.sendVerification({ user });
        return { success: true, message: 'User registered' };
      } catch (err) {
        throw new ApolloError(err.message, 'BAD_USER_INPUT');
      }
    },
    verifyEmail: async (_, { token }, context) => {
      try {
        // decode token from base64
        token = Buffer.from(token, 'base64').toString('ascii');
        const data = JWT.verify(token, process.env.JWT_SECRET);
        // Set user to verified
        await User.findByIdAndUpdate(data._id, { verified: true });
        return { success: true, message: 'Email verified' };
      } catch (error) {
        // Throw an ApolloError
        throw new ApolloError('Invalid or expired link', 'TOKEN_INVALID');
      }
    },
    loginUser: async (_, { primaryEmail, password }, context) => {
      try {
        const user = await User.findByCredentials(primaryEmail, password);
        if (!user) {
          throw new Error('User not found');
        }
        const accesstoken = user.generateToken();
        const refreshtoken = user.generateRefreshToken();

        context.res.cookie('refreshToken', refreshtoken, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict'
        });

        return { success: true, message: 'User logged in', accesstoken };
      } catch (err) {
        throw new ApolloError(err.message, 'BAD_USER_INPUT');
      }
    },
  },

};

module.exports = resolvers;