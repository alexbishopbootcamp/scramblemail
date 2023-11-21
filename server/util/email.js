const { MessageClient } = require('cloudmailin');
const { signEmailConfirmationToken } = require('./auth');
require('dotenv').config();

const Email = {
  send: async function ({ user, from, subject, tags, plain, html, inReplyTo, references }) {
    const client = new MessageClient({
      username: process.env.CLOUDMAILIN_USERNAME,
      apiKey: process.env.CLOUDMAILIN_API_KEY
    });

    const message = {
      to: user.primaryEmail,
      from: 'forward@scramble.email',
      subject,
      tags,
      //test_mode: true,
      plain,
      html,
    };

    console.log("Sending email")

    await client.sendMessage(message);
  },
  sendVerification: async function ({ user }) {
    const token = signEmailConfirmationToken(user);
    const base64token = Buffer.from(token).toString('base64');

    console.log( `Your verification link is http://localhost:3000/verify/${base64token}`);

    Email.send({
      user,
      from: 'noreply@scramble.email',
      subject: 'Verify your email address',
      tags: ['verification'],
      plain: `Your verification link is http://localhost:3000/verify/${base64token}`,
      html: `Your verification link is <a href="http://localhost:3000/verify/${base64token}">here</a>`,
    });
  },
  generate: function(domain){
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return `${result}@${domain}`;
  },
  isRegistered: function(address){

  }
}

module.exports = { Email };