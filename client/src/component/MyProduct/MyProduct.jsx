import React, { useContext, useState } from "react";
import { useMutation, useQuery, gql } from '@apollo/client';
import {AuthContext} from '../../providers/AuthContext'
import { Link } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";

//Defining the mutation to delete product
const DELETE_PRODUCT = gql`
  mutation DeleteProduct($productId: Int!) {
    deleteProduct(productId: $productId) {
      id
    }
  }
`;

//Defining the mutation for getting all products of specific user
const GET_USER_PRODUCTS = gql`
  query GetUserProducts($userId: Int!) {
    products(userId: $userId) {
      id
      title
      category
      description
      purchasePrice
      rentPrice
      rentDurationType
      created_at
    }
  }
`;

//MyProduct function
const MyProduct = () => {
  const { userId } = useContext(AuthContext);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [fullDescriptions, setFullDescriptions] = useState({});
  
  // Fetching user's products using the GET_USER_PRODUCTS query
  const { loading, error, data } = useQuery(GET_USER_PRODUCTS, {
    variables: { userId: parseInt(userId) },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const products = data.products;


  //Delete product
  const handleDeleteProduct = async (productId) => {
    try {
      const { data } = await deleteProduct({
        variables: { productId },
      });
      console.log('Deleted product:', data.deleteProduct);
      // Handle successful deletion, like refetching the product list
    } catch (error) {
      console.error('Error deleting product:', error.message);
      // Handle error scenarios
    }
  };

  //Description showing handle
  const handleShowFullDescription = (productId, description) => {
    const updatedDescriptions = { ...fullDescriptions };
    updatedDescriptions[productId] = !updatedDescriptions[productId];
    setFullDescriptions(updatedDescriptions);
  };


  //converting String type to DateTime
  const formatDate = (rawDate) => {
    const date = new Date(parseInt(rawDate, 10));
    date.setDate(date.getDate() - 1);
    return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  };
  

  return (
    <div className="mx-auto w-4/5 justify-between items-center">
      <h2 className="text-center text-3xl font-bold mt-8">MY PRODUCTS</h2>
        {products.map((product) => (
          <Link key={product.id} to={`/editproduct/${product.id}`}>
            <div className="border border-gray-300 rounded p-4 my-4">
              <div className="flex justify-between items-center">
                <h2 className="font-bold">{product.title}</h2>
                <button
                  onClick={() => handleDeleteProduct(product.id)}>
                  <FaTrash className="text-black" />
                </button>
              </div>
              <p className="text-xs">
                Categories: {product.category.join(', ')}
              </p>
              <p className="text-xs pb-1">
                Price: ${product.purchasePrice} | Rent: ${product.rentPrice} {product.rentDurationType}
              </p>
              <p className="text-xs pb-1">
                Description: {fullDescriptions[product.id] || product.description.length <= 100 ? (
                  product.description
                ) : (
                  <>
                    {product.description}
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleShowFullDescription(product.id, product.description)}
                    >
                      Less Details
                    </span>
                  </>
                )}
              </p>
              <p className="text-xs">Date posted: {formatDate(product.created_at)}</p>
            </div>
          </Link>
        ))}
      <button className="bg-indigo-600 text-white px-4 py-2 rounded mt-4">
        <Link to="/addproduct">Add Product</Link>
      </button>
    </div>
  );
  
};


export default MyProduct;