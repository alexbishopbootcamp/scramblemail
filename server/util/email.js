const { MessageClient } = require('cloudmailin');
const { signEmailConfirmationToken } = require('./auth');
require('dotenv').config();

const Email = {
  sendVerification: async function ({ user }) {
    const token = signEmailConfirmationToken(user.email, user._id);
    const base64token = Buffer.from(token).toString('base64');
    // TODO: Send email with verification link
    console.log( `Your verification link is http://localhost:3000/verify/${base64token}`);
  }
}

module.exports = { Email };