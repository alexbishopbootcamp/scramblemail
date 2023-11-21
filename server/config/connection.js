const mongoose = require('mongoose');

mongoose.connect(
  process.env.ORMONGO_RS_URL || 'mongodb://127.0.0.1:27017/scramblemail'
);

module.exports = mongoose.connection;
