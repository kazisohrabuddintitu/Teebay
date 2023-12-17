import { ApolloServer, gql } from "apollo-server-express";

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

    type Mutation {
        createUser(
            firstName: String!
            lastName: String!
            address: String!
            email: String!
            phoneNumber: String!
            password: String!
        ): User

        loginUser(email: String!, password: String!): User
    }

`;

const resolvers = {
    Query: {
      users: async (_, __, { prisma }) => {
        try {
          const users = await prisma.user.findMany();
  
          return users; 
        } catch (error) {
          console.error(error);
          throw new Error('Failed to fetch users');
        }
      },
    },
    Mutation: {
        createUser: async (_, args, { prisma }) => {
          const { firstName, lastName, address, email, phoneNumber, password } = args;
            
          try {
            const createdUser = await prisma.user.create({
              data: {
                firstName,
                lastName,
                address,
                email,
                phoneNumber,
                password,
              },
            });
            return createdUser;
          } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user');
          }
        },

        loginUser: async (_, { email, password }, { prisma }) => {
            try {
              const user = await prisma.user.findUnique({ where: { email } });
              if (!user) {
                throw new Error('User not found');
              }
              if (user.password !== password) {
                throw new Error('Incorrect password');
              }
              // construct the response to return only necessary user information
              const userData = {
                id: user.id,
              };
              return userData;
            } catch (error) {
              console.error(error);
              throw new Error('Login failed');
            }
          },
      },
       
  };

  export default {
    typeDefs,
    resolvers,
  };