const { MessageClient } = require('cloudmailin');
const JWT = require('jsonwebtoken');
require('dotenv').config();

const verificationTimeout = '15m';

const Email = {
  sendVerification: async function ({ user }) {
    const payload = { email: user.email, type: 'email_verification', _id: user._id };
    const token = JWT.sign(payload, process.env.JWT_SECRET, { expiresIn: verificationTimeout });
    const base64token = Buffer.from(token).toString('base64');
    // TODO: Send email with verification link
    console.log( `Your verification link is http://localhost:3000/verify/${base64token}`);
  }
}

module.exports = { Email };