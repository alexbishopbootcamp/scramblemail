const express = require('express');
const { User, Email } = require('../models');
const { Email: EmailUtils } = require('../util/email');

const router = express.Router();

// This is where the app receives incoming emails from CloudMailIn
router.post('/', async (req, res) => {
  const destinationAddress = req.body.envelope.to;
  // Check if the email address is in the database
  const emailDoc = await Email.findOne({ address: destinationAddress });

  if(!emailDoc) {
    return res.status(404).json({ message: 'Email not found' });
  }

  const user = await User.findOne({ emails: emailDoc._id });
  if(!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Forward the email to the user.
  // TODO: Carry over attachments
  // TODO: Message ID
  // TODO: Investigate making emails appear less suspicious to avoid getting flagged as spam
  EmailUtils.send({
    user,
    from: req.body.headers.from,
    subject: req.body.headers.subject,
    tags: ['forwarded'],
    plain: req.body.plain,
    html: req.body.html,
  });

  res.status(200).json({ message: 'OK' });
});

router.get('/', (req, res) => {
  res.status(200).json({ message: 'OK' });
  console.log("GET");
});

module.exports = router;