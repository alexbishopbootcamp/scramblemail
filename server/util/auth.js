const JWT = require('jsonwebtoken');
const { GraphQLError } = require('graphql');

const expiresIn = '1h';

const Auth = {
  signToken: function ({ email, _id }) {
    const payload = { email, _id };

    return JWT.sign({ data: payload }, process.env.JWT_SECRET, { expiresIn });
  },
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

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
      const { data } = JWT.verify(token, process.env.JWT_SECRET, { maxAge: expiresIn });
      req.user = data;
    } catch {
      console.log('Invalid token');
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