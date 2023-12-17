import express from "express";
import { ApolloServer } from "apollo-server-express";
import prisma from  "./DB/db.config.js";
import schema from "./schema.js";


const app = express();

const server = new ApolloServer({ 
  typeDefs: schema.typeDefs, 
  resolvers: schema.resolvers,
  context: { prisma }, 
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}${server.graphqlPath}`);
    });
  }
  
  startServer().catch(err => {
    console.error(err);
    process.exit(1);
  });
