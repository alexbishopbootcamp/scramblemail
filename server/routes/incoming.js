const express = require('express');
const { User, Email } = require('../models');
const { Email: EmailUtils } = require('../util/email');

const router = express.Router();

router.post('/', async (req, res) => {
  const destinationAddress = req.body.envelope.to;
  // Check if the email address is in the database
  console.log(`Checking email for ${destinationAddress}`);
  const emailDoc = await Email.findOne({ address: destinationAddress });
  console.log(`Email doc: ${emailDoc}`)

  if(!emailDoc) {
    console.log(`Email ${destinationAddress} not found`);
    return res.status(404).json({ message: 'Email not found' });
  }

  const user = await User.findOne({ emails: emailDoc._id });
  console.log(`User: ${user}`);
  if(!user) {
    console.log(`User not found`);
    return res.status(404).json({ message: 'User not found' });
  }

  console.log(`User found: ${user.primaryEmail}`);

  // Forward the email to the user
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