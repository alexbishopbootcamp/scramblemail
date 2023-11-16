const { Schema, model } = require('mongoose');

const EmailSchema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
  }
});