const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const helmet = require('helmet');
const cors = require('cors');
// TODO: Rate limiting


const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');

const { authMiddleware } = require('./util/auth');

const PORT = process.env.PORT || 24582;
const app = express();

// Security middleware
app.use(cookieParser());
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://scramble.email' : 'http://localhost:3000',
  credentials: true
}));

// Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Use auth middleware while also passing the request and response objects into the context
  app.use('/graphql', expressMiddleware(server, {
    context: ({ req, res }) => {
      // Pass req through auth middleware
      const modifiedReq = authMiddleware({ req });
  
      // Return both the modified request and the response
      return {
        req: modifiedReq,
        res
      };
    }
  }));
  

  // Route for incoming emails
  app.use('/incoming', require('./routes/incoming'));

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
}

startApolloServer();