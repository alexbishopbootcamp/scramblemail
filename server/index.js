const express = require('express');
// const { ApolloServer } = require('@apollo/server');
// const { expressMiddleware } = require('@apollo/server/express4');
// const cors = require('cors');
// const dotenv = require('dotenv');

// const db = require('./config/connection');
// const { typeDefs, resolvers } = require('./schemas');

const app = express();
const PORT = process.env.PORT || 24582;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Route for /incoming
app.use('/incoming', require('./routes/incoming'));

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});