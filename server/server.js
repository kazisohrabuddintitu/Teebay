// // const express = require("express");
// import express from "express";
// const app = express();
// import cors from "cors";
// import "dotenv/config";
// const port = process.env.PORT || 3000;
// import routes from "./routes/index.js";


// // middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.get("/", (req, res) => {
//     return res.send("Hi");
// });


// // Routes file
// app.use(routes);

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
//   });
  
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import prisma from  "./DB/db.config.js";

const app = express();

const typeDefs = gql`
    type User {
        id: Int
        firstName: String
        lastName: String
        address: String
        email: String
        phoneNumber: String
        password: String
    }
    
    type Query {
        users: [User]
    }
  
`;

const resolvers = {
    Query: {
      users: async (_, __, { prisma }) => {
        try {
          const users = await prisma.user.findMany(); // prisma.user.findMany() fetches users
  
          return users; 
        } catch (error) {
          console.error(error);
          throw new Error('Failed to fetch users');
        }
      },
    },
  };

  const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
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
