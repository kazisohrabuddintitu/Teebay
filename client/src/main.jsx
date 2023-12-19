import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';
import './index.css';
import Main from './layout/Main';
import Login from './component/Login/Login';
import Home from './component/Home/Home';
import Register from './component/Register/Register';
import MyProduct from './component/MyProduct/MyProduct';
import EditProduct from './component/Product/EditProduct'
import AddProduct from './component/Product/AddProduct'
import { AuthProvider } from './providers/AuthContext';
import PrivateRoute from './component/routes/PrivateRoute';

// Initializing the Apollo Client instance
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

// Defining the router structure
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Login></Login>,
      },
      {
        path: '/signup',
        element: <Register></Register>,
      },
      {
        path: '/myproducts',
        element: 
        <PrivateRoute>
            <MyProduct></MyProduct>
        </PrivateRoute>
        ,
      },
      {
        path: '/home',
        element: 
        <PrivateRoute>
          <Home></Home>,
        </PrivateRoute>
        
      },
      {
        path: '/addproduct',
        element: 
        <PrivateRoute>
          <AddProduct></AddProduct>,
        </PrivateRoute>
        
      },
      {
        path: '/editproduct/:id',
        element: 
        <PrivateRoute>
          <EditProduct></EditProduct>,
        </PrivateRoute>
        
      },
    ],
  },
]);

export default client;

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ApolloProvider client={client}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </ApolloProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
