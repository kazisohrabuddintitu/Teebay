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
      isAvailableForSale: Boolean
      isAvailableForRent: Boolean
      isSold: Boolean
      isRented: Boolean
      rentedById: Int
      rentStartDate: String 
      rentEndDate: String 
      created_at: String
      owner: User
      rentedBy: User 
      boughtBy: [User]
      soldBy: [User] 
    }

    
    type Query {
        users: [User]
        products(userId: Int!): [Product]
        allproducts: [Product]
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

        deleteProduct(id: Int!): DeletionResponse

        confirmRent(id: Int!, rentStartDate: String!, rentEndDate: String!, rentedById: Int!): Product

        confirmBuy(id: Int!): Product

    }

    type DeletionResponse {
      id: Int
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

      //Fetching products for specific user
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

      //Fetching all products for all user
      allproducts: async (_, __, { prisma }) => {
        try {
          const products = await prisma.product.findMany({
            where: {
              isSold: false,
            },
          });
          return products;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to fetch products');
        }
      },

      //Fetching single product by product id
      product: async (_, { id }, { prisma }) => {
        try {
          const product = await prisma.product.findUnique({
            where: { id }, // Fetching product by its unique ID
          });
          return product;
        } catch (error) {
          console.error('Error fetching product:', error);
          throw new Error('Failed to fetch the product');
        }
      },
      
    },  
    Mutation: {
        //New user creation 
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

        //User log in
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

        //Adding new product
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

        //updating product
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
        
        //deleting product from database
        deleteProduct: async (_, { id }, { prisma }) => {
          try {
            // Perform deletion
            const deletedProductId = await prisma.product.delete({
              where: { id: parseInt(id) }
            });

            return { id: deletedProductId };// Return the deleted product's ID
          } catch (error) {
            console.error('Error deleting product:', error);
            return null; // Deletion failed
          }
        },

        //Stroing rental data to database
        confirmRent: async (_, { id, fromDate, toDate, rentedById }, { prisma }) => {
          try {
            // Fetch the product by ID
            const existingProduct = await prisma.product.findUnique({
              where: { id: id },
            });
      
            if (!existingProduct) {
              throw new Error('Product not found');
            }
      
            // Update the product with rental details
            const updatedProduct = await prisma.product.update({
              where: { id: id },
              data: {
                rentStartDate: fromDate,
                rentEndDate: toDate,
                isRented: true, // Optionally set isRented flag to true
                isAvailableForRent: false,
                rentedById: rentedById,

              },
            });
      
            return updatedProduct;
          } catch (error) {
            console.error('Error confirming rent:', error);
            throw new Error('Failed to confirm rent');
          }
        },

        //Updating buy details
        confirmBuy: async (_, { id }, {prisma}) => {
          try {
            // Fetch the product by ID
            const existingProduct = await prisma.product.findUnique({
              where: { id: id },
            });
      
            if (!existingProduct) {
              throw new Error('Product not found');
            }
      
            const updatedProduct = await prisma.product.update({
              where: { id: id },
              data: {
                isAvailableForSale: false,
                isAvailableForRent: false,
                isSold: true,
              },
            });
      
            return updatedProduct;
          } catch (error) {
            console.error('Error confirming buy:', error);
            throw new Error('Failed to confirm buy');
          }
        },
        
    },
       
};

  export default {
    typeDefs,
    resolvers,
  };