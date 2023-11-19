const { User } = require('../models');
const { ApolloError } = require('apollo-server');
const { Email } = require('../util/email');
const JWT = require('jsonwebtoken');
const {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  signEmailConfirmationToken,
  verifyEmailConfirmationToken
} = require('../util/auth');


const resolvers = {
  Mutation: {
    registerUser: async (_, { primaryEmail, password }, context) => {
      try {
        const user = await User.create({ primaryEmail, password });

        // Send verification email
        Email.sendVerification({ user });
        return { success: true, message: 'A confirmation link has been sent to your email address' };
      } catch (err) {
        throw new ApolloError(err.message, 'BAD_USER_INPUT');
      }
    },
    verifyEmail: async (_, { token }, context) => {
      try {
        // decode token from base64
        token = Buffer.from(token, 'base64').toString('ascii');

        const payload = verifyEmailConfirmationToken(token).data;
        // Set user to verified
        await User.findByIdAndUpdate(payload._id, { verified: true });
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

        if (!user.verified) {
          throw new Error('Please confirm your email address before logging in');
        }

        const accesstoken = signAccessToken(user);
        const refreshtoken = signRefreshToken(user);

        context.res.cookie('refreshToken', refreshtoken, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict'
        });

        return { success: true, message: 'Logged in successfully', accesstoken };
      } catch (err) {
        throw new ApolloError(err.message, 'BAD_USER_INPUT');
      }
    },
  },

};

module.exports = resolvers;