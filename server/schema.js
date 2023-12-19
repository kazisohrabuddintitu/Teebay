import { ApolloServer, gql } from "apollo-server-express";

const typeDefs = gql`
    enum RentDurationType {
      PER_DAY
      PER_WEEK
      PER_MONTH
    }
    
    type User {
        id: Int
        firstName: String
        lastName: String
        address: String
        email: String
        phoneNumber: String
        password: String
    }

    type Product {
      id: Int
      title: String
      category: [String]
      description: String
      purchasePrice: Float
      rentPrice: Float
      rentDurationType: RentDurationType
      userId: Int
      created_at: String
      owner: User
    }
    
    type Query {
        users: [User]
        products(userId: Int!): [Product]
        product(id: Int!): Product
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
        
        addProduct(
          title: String!
          category: [String!]!
          description: String!
          purchasePrice: Float!
          rentPrice: Float!
          rentDurationType: RentDurationType!
          userId: Int!
        ): Product

        editProduct(
          id: Int!
          title: String
          category: [String]
          description: String
          purchasePrice: Float
          rentPrice: Float
          rentDurationType: RentDurationType
          userId: Int
        ): Product

        deleteProduct(id: Int!): Product
    }

`;

const resolvers = {
    Query: {
      users: async (_, __, { prisma }) => {
        try {
          // Fetching all users from the database
          const users = await prisma.user.findMany();
          return users; 
        } catch (error) {
          console.error(error);
          throw new Error('Failed to fetch users');
        }
      },

      products: async (_, { userId }, { prisma }) => {
        try {
          const products = await prisma.product.findMany({
            where: { userId: userId }, // Filtering products by userId
          });
          return products;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to fetch products');
        }
      },
      product: async (_, { id }, { prisma }) => {
        try {
          const product = await prisma.product.findUnique({
            where: { id }, // Fetching product by its unique ID
          });
      
          console.log('Retrieved product:', product);
          return [product]; // Ensure the product is wrapped in an array or similar iterable
        } catch (error) {
          console.error('Error fetching product:', error);
          throw new Error('Failed to fetch the product');
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

        addProduct: async (_, args, { prisma }) => {
          const {
            title,
            category,
            description,
            purchasePrice,
            rentPrice,
            rentDurationType,
            userId,
          } = args;
      
          try {
            // Creating a new product in the database
            const createdProduct = await prisma.product.create({
              data: {
                title,
                category,
                description,
                purchasePrice,
                rentPrice,
                rentDurationType,
                userId,
              },
            });
      
            return createdProduct;
          } catch (error) {
            console.error('Error creating product:', error);
            throw new Error('Failed to create product');
          }
        },
        
        editProduct: async (_, args, { prisma }) => {
          const {
            id,
            title,
            category,
            description,
            purchasePrice,
            rentPrice,
            rentDurationType,
            userId,
          } = args;
    
          try {
            // Fetch the existing product by ID from the database using Prisma
            const existingProduct = await prisma.product.findUnique({
              where: { id },
            });
    
            if (!existingProduct) {
              throw new Error('Product not found');
            }
    
            // Update the product with new values
            const updatedProduct = await prisma.product.update({
              where: { id },
              data: {
                title: title || existingProduct.title,
                category: category || existingProduct.category,
                description: description || existingProduct.description,
                purchasePrice: purchasePrice || existingProduct.purchasePrice,
                rentPrice: rentPrice || existingProduct.rentPrice,
                rentDurationType: rentDurationType || existingProduct.rentDurationType,
                userId: userId || existingProduct.userId,
              },
            });
    
            return updatedProduct;
          } catch (error) {
            console.error('Error updating product:', error);
            throw new Error('Failed to update product');
          }
        },
        
        deleteProduct: async (_, args, { prisma }) => {
          const { productId } = args;
    
          try {
            // Finding the product by ID in the database
            const existingProduct = await prisma.product.findUnique({
              where: { id: productId },
            });
    
            if (!existingProduct) {
              throw new Error('Product not found');
            }
    
            // Deleting the product
            await prisma.product.delete({
              where: { id: productId },
            });
    
            return `Product with ID ${productId} deleted successfully`;
          } catch (error) {
            console.error('Error deleting product:', error);
            throw new Error('Failed to delete product');
          }
        },
        
        
      },
       
  };

  export default {
    typeDefs,
    resolvers,
  };