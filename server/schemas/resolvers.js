const { User, Email } = require('../models');
const { ApolloError } = require('apollo-server');
const { Email: EmailUtils } = require('../util/email');
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
        EmailUtils.sendVerification({ user });
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
    generateAddress: async (_, args, context) => {
      console.log("Generating address");
      if(!context.req.user) {
        throw new Error('Not logged in');
      }

      // Generate new emails and check if they are unique up to failsafe times.
      // If the failsafe is hit, abort and throw an error to prevent an infinite loop hitting database.
      const failsafe = 5;

      for(let runs = 0; runs < failsafe; runs++) {
        console.log(`Attempt ${runs}`);
        try{
          const address = EmailUtils.generate('scramble.email');
          console.log(`Using email ${address}`)
          const count = await Email.countDocuments({ address });
          console.log(`Count is ${count}`)
          if(count === 0) {
            const newEmail = new Email({ address });
            console.log(`Saving email ${address}`)
            const emailId = await newEmail.save();
            console.log(`Pushing email ${address} to user ${context.req.user._id}`)
            await User.findByIdAndUpdate(context.req.user._id, {
              $push: { emails: emailId }
            });
            console.log(`Returning email ${address}`)
            return { email: address };
          }
        } catch (err) {
          console.error('Error generating address:', err);
          // Throw an ApolloError
          throw new ApolloError('Failed to generate unique email address', 'BAD_USER_INPUT');
        }
      }

      console.error('Error generating address:', err);
      throw new Error('Failed to generate unique email address'); // Should only be reached if failsafe triggers
    },
  },
  Query: {
    getAddresses: async (_, args, context) => {
      if(!context.req.user) {
        throw new Error('Not logged in');
      }
      try {
        const user = await User.findById(context.req.user._id);
        return user.addresses;
      } catch (err) {
        throw new ApolloError(err.message, 'BAD_USER_INPUT');
      }
    },
  }

};

module.exports = resolvers;