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
      from: 'ScrambleMail <noreply@scramble.email>',
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
    const verificationLink = `https://scramble.email/verify/${base64token}`;
  
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; text-align: center; color: white; background: linear-gradient(to right, #3BAFDA, #2B8DD9); border-radius: 10px; padding: 20px; max-width: 600px; margin: auto;">
        <h1 style="font-size: 24px;">Verify Your Email Address</h1>
        <p style="font-size: 18px;">Thanks for signing up! Please confirm your email address by clicking the link below.</p>
        <a href="${verificationLink}" style="display: inline-block; background-color: #f3f4f6; color: #111827; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold; margin-top: 15px;">Verify Email</a>
        <p style="font-size: 16px; margin-top: 20px;">If you did not sign up for an account, you can safely ignore this email.</p>
      </div>
    `;
  
    console.log(`Your verification link is ${verificationLink}`);
  
    Email.send({
      user,
      from: 'noreply@scramble.email',
      subject: 'Verify your email address',
      tags: ['verification'],
      plain: `Your verification link is ${verificationLink}`,
      html: htmlContent,
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