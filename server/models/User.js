const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const UserSchema = new Schema({
  primaryEmail: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  emails: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Email',
    },
  ],
});

// set up pre-save middleware to create password
UserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

UserSchema.statics.findByCredentials = async function (primaryEmail, password) {
  const user = await this.findOne({ primaryEmail });
  if (!user) {
    throw new Error('User not found');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Incorrect password');
  }
  return user;
};

const User = model('User', UserSchema);

module.exports = User;