# Project Technical Documentation

## Project Overview
The project is a web application designed for managing user product renting and
buying/selling.

## Tech Stack
- **Frontend:** React(Used Apollo as the GraphQL client)
- **Backend:** ExpressJS and GraphQL
- **ORM with migrations:** Prisma
- **Database:** Postgres


## Key Components and Functionalities

### User Authentication
- `loginUser` Mutation
- `createUser` Mutation

### Product Management
- `addProduct` Mutation: Adds a new product with details like title, category, description, prices, etc.
- `editProduct` Mutation: Edits an existing product's details.
- `deleteProduct` Mutation:  Deletes a product based on its ID.
- `confirmRent` Mutation: Confirms a product for rents.
- `confirmBuy` Mutation Confirms a product to buy.

### GraphQL Queries
- `products` Query: Fetches products for a specific user based on their ID.
- `allproducts` Query: Retrieves all products from the database those are not sold.
- `product` Query: Fetches products based on product ID.


## Frontend Components

In the product management application, several frontend components are used to facilitate different functionalities:

### MyProduct Component

The `MyProduct` component enables users to view, edit, or delete their products. It likely includes functionalities for managing individual products within the user's account.

### Navigation Bar

The navigation bar is a key UI element providing links to different sections of the application. It typically includes navigation options like Home, My Products, Add Product, etc.

### Product Management UI

This UI encompasses various elements for managing products:
- **Add Product Form:** Allows users to add new products to the system.
- **Edit Product Form:** Enables editing existing product details.
- **Product List View:** Displays a list of products, often with options for filtering or searching.
- **Product Card:** A concise view summarizing product details.

### Product Details

A detailed view of a single product, displaying comprehensive information about that specific product.

### Confirmation Modals

Pop-up modal components used to confirm critical actions like deleting a product. These help prevent accidental deletions.

### Error Handling Components

Components for displaying error messages or alerts when actions fail or data retrieval encounters issues. Ensures a smoother user experience by informing users about issues.

### Loading Indicators

Visual components like loading spinners or skeletons to indicate that data is being fetched or that a section of the app is loading.



### Enhancements and Error Handling
#### 1. Conditional Rendering
   - Implement conditional rendering in the UI based on the response from GraphQL mutations/queries. Show different UI components or messages for success and error states.
   - Use loading indicators to inform users about ongoing operations.

#### 2. Error Logging
   - Set up error logging to capture both client-side and server-side errors. Services like Sentry or logging libraries can help centralize error tracking.
   - Log detailed error messages, including stack traces and contextual information, for easier debugging.

#### 3. Reloading Page Logic
   - Implement logic to refresh certain parts of the UI or data after successful mutations. This can be particularly helpful when data needs to be refreshed after a mutation operation (e.g., after confirming a rent or buying a product).

#### 4. Error Handling Strategies
   - Gracefully handle network errors, timeouts, and other unexpected issues.
   - Utilize GraphQL error handling features like error codes or specific error messages to provide informative feedback to users.

#### 5. Optimistic UI Updates
   - Implement optimistic UI updates to instantly reflect changes in the UI while waiting for server confirmation. Roll back changes if the server operation fails.

#### 6. Input Validation
   - Perform input validation on the client-side to prevent invalid requests from reaching the server.
   - Leverage GraphQL schema validation for ensuring correct inputs at the server level.

#### 8.Performance
   - Optimize GraphQL queries and mutations to fetch only required data fields rather than fetching entire objects.

#### 9. UI/UX Improvements
   - Continuously refine the user interface and experience based on user feedback.
   - Provide helpful error messages to guide users in case of form submission errors.



## Corner Cases
- **GraphQL Errors**: Handling network issues, server-side errors, and incorrect input data.
- **Input Validation**: Couldn't solve the DateTime type problem for storing data from Frontend to Database using Prisma ORM.
- **Deletion Confirmation**: Managing confirmation dialogs to prevent accidental deletions.
- **All Products**: Users will only see not sold products in all products page.
- **Product Buy & Sell**: Couldn't solve the problem of renting a product once at a time due to time management.
- **Authentication Flow**: Implementing secure authentication and session management.
- **UI/UX Challenges**: Managing conditional rendering and responsiveness for various devices.



## Future Improvements
- Implement robust error handling and user feedback mechanisms.
- Enhance security measures (input validation, secure data storage).
- Implement pagination or infinite scroll for better UX.
- Include more user-specific features.



## Conclusion
The project is a full-stack application using React, Apollo Server with Prisma, and GraphQL. It provides users with a platform to manage their products efficiently, aiming to enhance security, user experience, and expand functionality in the future.
