const JWT = require('jsonwebtoken');
const { GraphQLError } = require('graphql');
require('dotenv').config();

const accessTokenDuration = '15m';
const refreshTokenDuration = '7d';
const emailConfirmationTokenDuration = '15m';

const Auth = {
  // Tokens. Use unique functions for each to ensure seperation.
  signAccessToken: function ({ primaryEmail, _id }) {
    const payload = { primaryEmail, _id, type: 'access' };

    return JWT.sign({ data: payload }, process.env.JWT_SECRET, { expiresIn: accessTokenDuration });
  },
  signRefreshToken: function ({ primaryEmail, _id }) {
    const payload = { primaryEmail, _id, type: 'refresh' };

    return JWT.sign({ data: payload }, process.env.JWT_SECRET, { expiresIn: refreshTokenDuration });
  },
  signEmailConfirmationToken: function ({ primaryEmail, _id }) {
    const payload = { primaryEmail, _id, type: 'email_verification' };

    return JWT.sign({ data: payload }, process.env.JWT_SECRET, { expiresIn: emailConfirmationTokenDuration });
  },

  verifyToken: function (token) {
    try {
      return JWT.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error('Token verification error:', error.message);
      throw new Error('Token verification failed');
    }
  },
  verifyAccessToken: function (token) {
    const payload = Auth.verifyToken(token);

    if (payload.data.type !== 'access') {
      throw new Error('Invalid token type');
    }

    return payload;
  },
  verifyRefreshToken: function (token) {
    const payload = Auth.verifyToken(token);

    if (payload.type !== 'refresh') {
      throw new Error('Invalid token type');
    }

    return payload;
  },
  verifyEmailConfirmationToken: function (token) {
    const payload = Auth.verifyToken(token);

    if (payload.data.type !== 'email_verification') {
      throw new Error('Invalid token type');
    }

    return payload;
  },


  // Middleware
  authMiddleware: function ({ req }) {
    // get token from request headers
    let token = req.headers.authorization;

    // separate "Bearer" from "<tokenvalue>"
    if (req.headers.authorization) {
      token = token
        .split(' ')
        .pop()
        .trim();
    }

    // if no token, return request object as is
    if (!token) {
      return req;
    }

    try {
      // decode and attach user data to request object
      const { data } = Auth.verifyAccessToken(token);
      req.user = data;
    } catch (error) {
      // Catch if wrong token type is used, indicates a security risk
      if(error.message === 'Invalid token type'){
        console.error(error);
      }
    }

    // return updated request object
    return req;
  },
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
}

module.exports = Auth;