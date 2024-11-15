import express from 'express';
import db from './config/connection.js';
import cors from 'cors';
import type { Request, Response } from 'express';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';
import path from 'path';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  try {
    await db();

    const PORT = process.env.PORT || 3001;
    const app = express();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use(cors({ origin: 'http://localhost:3000' }));

    await server.start();

    app.use('/graphql', expressMiddleware(server));

  // Serve static files from the client dist folder in production
  if (process.env.NODE_ENV === 'production') {
    const clientBuildPath = path.join(process.cwd(), 'client', 'dist');
    app.use(express.static(clientBuildPath));

    // Fallback route for any request that doesn't match /graphql
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
  }
    app.listen(PORT, () => {
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startApolloServer();