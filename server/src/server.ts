import express from 'express';
import db from './config/connection.js';
import cors from 'cors';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  try {
    await server.start();
    await db();

    const PORT = process.env.PORT || 3001;
    const app = express();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use(cors({ origin: 'http://localhost:3000' }));

    app.use('/graphql', expressMiddleware(server));

    //catch all for any request that doesn't match an existing route
    app.use((_req, res) => {
      res.status(404).send("404 Error!");
    });

    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startApolloServer();